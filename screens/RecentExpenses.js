import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";

const RecentExpenses = () => {
  const context = useContext(ExpensesContext);
  const recentExpenses = context.expenses.filter((expense) => {
    const today = new Date();
    const date7daysAgo = getDateMinusDays(today, 7);
    return expense.date > date7daysAgo && expense.date <= today;
  });
  return (
    <ExpensesOutput
      periodName="Last 7 days"
      expenses={recentExpenses}
      fallback="No expenses within the last 7 days"
    />
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({});
