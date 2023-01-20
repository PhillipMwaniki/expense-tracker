import { Children, createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    description: "Inhaler",
    amount: 84.11,
    date: new Date("2021-12-19"),
  },
  {
    id: "e3",
    description: "Betapyn",
    amount: 101.34,
    date: new Date("2023-02-01"),
  },
  {
    id: "e4",
    description: "House Shopping",
    amount: 1033.0,
    date: new Date("2021-09-04"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [...action.payload, ...state];
    case "UPDATE":
      const itemIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const item = state[itemIndex];
      const itemUpdated = { ...item, ...action.payload.data };
      const updatedState = [...state];
      updatedState[itemIndex] = itemUpdated;
      return updatedState;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);
  const addExpense = (expenseData) => {
    dispatch({ type: "ADD", payload: expenseData });
  };
  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };
  const updateExpense = (id, expenseData) => {
    dispatch({ type: "UPATE", payload: { id: id, data: expenseData } });
  };
  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
