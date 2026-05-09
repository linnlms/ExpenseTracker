import React, {
  useContext,
  useState,
} from 'react';

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { ExpenseContext } from '../context/ExpenseContext';
import ExpenseItem from '../component/ExpenseItem';
import BudgetWarning from '../component/BudgetWarning';
import SearchBar from '../component/SearchBar';
import CategoryFilter from '../component/CategoryFilter';
import { deleteExpense } from '../db/database';
import { exportCSV } from '../utils/exportCSV';

export default function HomeScreen({
  navigation,
}: any) {
  const {
    expenses,
    dispatch,
  } = useContext(ExpenseContext);

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState('All');

  const total = expenses.reduce(
    (sum: number, item: any) =>
      sum + Number(item.amount),
    0,
  );

  const filteredExpenses = expenses.filter(
    (item: any) => {
      const matchSearch = item.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        selectedCategory === 'All' ||
        item.category === selectedCategory;

      return matchSearch && matchCategory;
    },
  );

  const handleDelete = async (id: string) => {
    await deleteExpense(id);

    dispatch({
      type: 'DELETE_EXPENSE',
      payload: id,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>
          Total Expenses
        </Text>

        <Text style={styles.summaryAmount}>
          RM {total.toFixed(2)}
        </Text>
      </View>

      <BudgetWarning total={total} />

      <SearchBar
        value={search}
        onChange={setSearch}
      />

      <CategoryFilter
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <TouchableOpacity
        style={styles.exportBtn}
        onPress={() => exportCSV(expenses)}
      >
        <Text style={styles.exportText}>
          Export CSV
        </Text>
      </TouchableOpacity>

      {filteredExpenses.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>
            No expenses found
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredExpenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ExpenseItem
              item={item}
              onDelete={handleDelete}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() =>
          navigation.navigate('AddExpense')
        }
      >
        <Text style={styles.addText}>
          + Add Expense
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  summaryCard: {
    backgroundColor: '#2E7D32',
    padding: 22,
    borderRadius: 18,
    marginBottom: 20,
  },
  summaryLabel: {
    color: '#DDEFE0',
  },
  summaryAmount: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginTop: 8,
  },
  exportBtn: {
    backgroundColor: '#1565C0',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 14,
  },
  exportText: {
    color: '#fff',
    fontWeight: '700',
  },
  emptyBox: {
    marginTop: 80,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
  addBtn: {
    backgroundColor: '#2E7D32',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  addText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});