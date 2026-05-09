import React, { useContext } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';

import { ExpenseContext } from '../context/ExpenseContext';
import SummaryCard from '../component/SummaryCard';
import {
  calculateTotal,
  calculateByCategory,
  getMonthlyExpenses,
  formatCurrency,
} from '../utils/helper';

export default function ReportScreen() {
  const { expenses } = useContext(ExpenseContext);

  const total = calculateTotal(expenses);
  const food = calculateByCategory(expenses, 'Food');
  const transport = calculateByCategory(expenses, 'Transport');
  const monthly = calculateTotal(getMonthlyExpenses(expenses));

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Expense Report</Text>

      <SummaryCard title="Total Expenses" value={formatCurrency(total)} />
      <SummaryCard title="This Month" value={formatCurrency(monthly)} color="#28a745" />
      <SummaryCard title="Food" value={formatCurrency(food)} color="#ff9800" />
      <SummaryCard title="Transport" value={formatCurrency(transport)} color="#2196f3" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f4f6f8',
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 15,
  },
});