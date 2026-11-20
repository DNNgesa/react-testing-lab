import { render, screen, waitFor } from "@testing-library/react";
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
    id: "2",
    date: "2019-12-04",
    description: "Sunglasses, Urban Outfitters",
    category: "Fashion",
    amount: -24.99,
  },
  {
    id: "3",
    date: "2019-12-06",
    description: "Chipotle",
    category: "Food",
    amount: -17.59,
  },
];

describe("Display Transactions", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("displays fetched transactions on startup (base case)", async () => {
    global.setFetchResponse(mockTransactions);
    render(<App />);

    expect(
      await screen.findByText("Paycheck from Bob's Burgers")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Sunglasses, Urban Outfitters")
    ).toBeInTheDocument();
    expect(screen.getByText("Chipotle")).toBeInTheDocument();
  });

  it("renders only the table header row when the API returns an empty list (edge case)", async () => {
    global.setFetchResponse([]);
    render(<App />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:6001/transactions"
      );
    });

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(1);
  });

  it("handles a failed GET fetch gracefully without crashing (failure case)", async () => {
    const consoleSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    global.fetch = vi.fn(() => Promise.reject(new Error("Network error")));

    render(<App />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });

    expect(
      screen.getByText("The Royal Bank of Flatiron")
    ).toBeInTheDocument();
  });
});
