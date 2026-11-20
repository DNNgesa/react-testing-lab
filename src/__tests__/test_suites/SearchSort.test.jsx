import { render, screen } from "@testing-library/react";
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

describe("Search and Sort Transactions", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("filters transactions dynamically when the search input changes (base case)", async () => {
    const user = userEvent.setup();
    global.setFetchResponse(mockTransactions);
    render(<App />);

    await screen.findByText("Chipotle");

    const searchInput = screen.getByPlaceholderText(
      "Search your Recent Transactions"
    );
    await user.type(searchInput, "Chipotle");

    expect(screen.getByText("Chipotle")).toBeInTheDocument();
    expect(
      screen.queryByText("Paycheck from Bob's Burgers")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Sunglasses, Urban Outfitters")
    ).not.toBeInTheDocument();
  });

  it("matches search queries case-insensitively and restores all items when cleared (edge case)", async () => {
    const user = userEvent.setup();
    global.setFetchResponse(mockTransactions);
    render(<App />);

    await screen.findByText("Chipotle");

    const searchInput = screen.getByPlaceholderText(
      "Search your Recent Transactions"
    );
    await user.type(searchInput, "fAsHiOn");

    expect(
      screen.getByText("Sunglasses, Urban Outfitters")
    ).toBeInTheDocument();
    expect(screen.queryByText("Chipotle")).not.toBeInTheDocument();

    await user.clear(searchInput);
    expect(screen.getByText("Chipotle")).toBeInTheDocument();
    expect(
      screen.getByText("Paycheck from Bob's Burgers")
    ).toBeInTheDocument();
  });

  it("displays only the header row when a search query matches zero transactions (failure/no-match case)", async () => {
    const user = userEvent.setup();
    global.setFetchResponse(mockTransactions);
    render(<App />);

    await screen.findByText("Chipotle");

    const searchInput = screen.getByPlaceholderText(
      "Search your Recent Transactions"
    );
    await user.type(searchInput, "NonExistentMerchantXYZ");

    expect(screen.queryByText("Chipotle")).not.toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(1);
  });

  it("sorts transactions alphabetically when Sort dropdown changes", async () => {
    const user = userEvent.setup();
    global.setFetchResponse(mockTransactions);
    render(<App />);

    await screen.findByText("Chipotle");

    const sortSelect = screen.getByRole("combobox");
    await user.selectOptions(sortSelect, "category");

    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("Fashion");
    expect(rows[2]).toHaveTextContent("Food");
    expect(rows[3]).toHaveTextContent("Income");

  });
});
