import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import App from "../../components/App";

const mockTransactions = [
  {
    id: "1",
    date: "2019-12-01",
    description: "Paycheck from Bob's Burgers",
    category: "Income",
    amount: 1000,
  },
  {
    id: "3",
    date: "2019-12-06",
    description: "Chipotle",
    category: "Food",
    amount: -17.59,
  },
];

describe("Add Transactions", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("adds a new transaction to the frontend and sends a POST request (base case)", async () => {
    const user = userEvent.setup();
    const createdTransaction = {
      id: "4",
      date: "2025-01-15",
      description: "Coffee at Artcaffe",
      category: "Food",
      amount: "-5.50",
    };

    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockTransactions),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: () => Promise.resolve(createdTransaction),
      });

    const { container } = render(<App />);
    await screen.findByText("Chipotle");

    const dateInput = container.querySelector('input[name="date"]');
    const descriptionInput = screen.getByPlaceholderText("Description");
    const categoryInput = screen.getByPlaceholderText("Category");
    const amountInput = screen.getByPlaceholderText("Amount");

    fireEvent.change(dateInput, { target: { value: "2025-01-15" } });
    await user.type(descriptionInput, "Coffee at Artcaffe");
    await user.type(categoryInput, "Food");
    await user.type(amountInput, "-5.50");

    fireEvent.submit(container.querySelector("form"));

    expect(await screen.findByText("Coffee at Artcaffe")).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenLastCalledWith(
      "http://localhost:6001/transactions",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: "2025-01-15",
          description: "Coffee at Artcaffe",
          category: "Food",
          amount: "-5.5",
        }),
      })
    );
  });

  it("handles decimal amounts properly when adding a transaction (edge case)", async () => {
    const user = userEvent.setup();
    const refundTransaction = {
      id: "5",
      date: "2025-02-01",
      description: "Store Refund",
      category: "Shopping",
      amount: "0.01",
    };

    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve([]),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: () => Promise.resolve(refundTransaction),
      });

    const { container } = render(<App />);

    await user.type(screen.getByPlaceholderText("Description"), "Store Refund");
    await user.type(screen.getByPlaceholderText("Category"), "Shopping");
    await user.type(screen.getByPlaceholderText("Amount"), "0.01");
    fireEvent.submit(container.querySelector("form"));

    expect(await screen.findByText("Store Refund")).toBeInTheDocument();
    expect(screen.getByText("0.01")).toBeInTheDocument();
  });

  it("does not append a transaction to the DOM if the POST request fails (failure case)", async () => {
    const user = userEvent.setup();
    const consoleSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockTransactions),
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: () => Promise.resolve({}),
      });

    const { container } = render(<App />);
    await screen.findByText("Chipotle");

    await user.type(
      screen.getByPlaceholderText("Description"),
      "Failed Payment"
    );
    await user.type(screen.getByPlaceholderText("Category"), "Bills");
    await user.type(screen.getByPlaceholderText("Amount"), "-100");
    fireEvent.submit(container.querySelector("form"));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });
    expect(screen.queryByText("Failed Payment")).not.toBeInTheDocument();
  });
});
