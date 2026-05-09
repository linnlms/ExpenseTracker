import React, { useContext, useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';

import { PieChart, BarChart } from 'react-native-chart-kit';

import { ExpenseContext } from '../context/ExpenseContext';
import ExpenseItem from '../component/ExpenseItem';
import BudgetWarning from '../component/BudgetWarning';
import SearchBar from '../component/SearchBar';
import CategoryFilter from '../component/CategoryFilter';
import { deleteExpense } from '../db/database';
import { exportCSV } from '../utils/exportCSV';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen({ navigation }: any) {
  const { expenses, dispatch } = useContext(ExpenseContext);

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const fadeAnim = useRef(new Animated.Value(0)).current;

useEffect(() => {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true,
  }).start();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [search, selectedCategory, expenses]);

  const total = expenses.reduce(
    (sum: number, item: any) => sum + Number(item.amount),
    0,
  );

  const filteredExpenses = expenses.filter((item: any) => {
    const matchSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      selectedCategory === 'All' ||
      item.category === selectedCategory;

    return matchSearch && matchCategory;
  });

  const handleDelete = async (id: string) => {
    await deleteExpense(id);

    dispatch({
      type: 'DELETE_EXPENSE',
      payload: id,
    });
  };

  const categoryMap: Record<string, number> = {};

  filteredExpenses.forEach((item: any) => {
    if (!categoryMap[item.category]) {
      categoryMap[item.category] = 0;
    }
    categoryMap[item.category] += Number(item.amount);
  });

  const pieData = Object.keys(categoryMap).map((key, index) => ({
    name: key,
    amount: categoryMap[key],
    color: getColor(index),
    legendFontColor: '#333',
    legendFontSize: 12,
  }));

  const barData = {
    labels: Object.keys(categoryMap),
    datasets: [
      {
        data: Object.values(categoryMap),
      },
    ],
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Total Expenses</Text>
        <Text style={styles.summaryAmount}>
          RM {total.toFixed(2)}
        </Text>
      </View>

      <BudgetWarning total={total} />

      <SearchBar value={search} onChange={setSearch} />

      <CategoryFilter
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <TouchableOpacity
        style={styles.exportBtn}
        onPress={() => exportCSV(expenses)}
      >
        <Text style={styles.exportText}>Export CSV</Text>
      </TouchableOpacity>

      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.chartTitle}>Expense Breakdown</Text>

        {pieData.length > 0 && (
          <PieChart
            data={pieData}
            width={screenWidth - 40}
            height={200}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        )}

        <Text style={styles.chartTitle}>Category Comparison</Text>

        {barData.labels.length > 0 && (
          <BarChart
            data={barData}
            width={screenWidth - 40}
            height={220}
            fromZero
            showValuesOnTopOfBars
            chartConfig={{
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              color: () => '#4a90e2',
            }}
            style={styles.barStyle}
          />
        )}
      </Animated.View>

      {filteredExpenses.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text>No expenses found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredExpenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ExpenseItem item={item} onDelete={handleDelete} />
          )}
        />
      )}

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate('AddExpense')}
      >
        <Text style={styles.addText}>+ Add Expense</Text>
      </TouchableOpacity>

    </Animated.View>
  );
}

function getColor(index: number) {
  const colors = ['#4a90e2', '#ff9800', '#28a745', '#e91e63', '#9c27b0'];
  return colors[index % colors.length];
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
  barStyle: {
    borderRadius: 12,
  },
  exportText: {
    color: '#fff',
    fontWeight: '700',
  },
  emptyBox: {
    marginTop: 80,
    alignItems: 'center',
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
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
  },
});