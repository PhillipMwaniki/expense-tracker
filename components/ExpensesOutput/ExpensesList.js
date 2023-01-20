import { StyleSheet, FlatList, Text, View } from "react-native";
import React from "react";
import ExpenseItem from "./ExpenseItem";

const renderItem = (itemData) => {
  return (
    <ExpenseItem
      id={itemData.item.id}
      description={itemData.item.description}
      amount={itemData.item.amount}
      date={itemData.item.date}
    />
  );
};

const ExpensesList = ({ expenses }) => {
  return (
    <View>
      <FlatList
        keyExtractor={(item) => item.id}
        data={expenses}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ExpensesList;

const styles = StyleSheet.create({});
