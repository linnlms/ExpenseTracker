import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function BudgetWarning({
  total,
}: any) {
  const budgetLimit = 1000;

  if (total <= budgetLimit) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        ⚠ Budget Warning
      </Text>

      <Text style={styles.text}>
        Monthly Budget: RM {budgetLimit}
      </Text>

      <Text style={styles.text}>
        Current Spending: RM {total.toFixed(2)}
      </Text>

      <Text style={styles.text}>
        Exceeded by RM {(total - budgetLimit).toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF3E0',
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    color: '#E65100',
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
  },
});