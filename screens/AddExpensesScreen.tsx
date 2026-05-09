import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

import { ExpenseContext } from '../context/ExpenseContext';
import { categories } from '../constant/categories';

export default function AddExpenseScreen({ navigation }: any) {
  const { addExpense } = useContext(ExpenseContext);

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

  const handleAddExpense = () => {
    if (!title.trim()) {
      Alert.alert('Validation', 'Please enter a title');
      return;
    }

    if (!amount || isNaN(Number(amount))) {
      Alert.alert('Validation', 'Please enter a valid amount');
      return;
    }

    const newExpense = {
      id: Date.now().toString(),
      title: title.trim(),
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString(),
    };

    addExpense(newExpense);

    // reset fields
    setTitle('');
    setAmount('');
    setCategory('Food');

    // optional navigation back
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.header}>Add New Expense</Text>

        {/* Title Input */}
        <TextInput
          placeholder="Expense Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />

        {/* Amount Input */}
        <TextInput
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          style={styles.input}
        />

        {/* Category Selector */}
        <Text style={styles.label}>Category</Text>
        <View style={styles.categoryContainer}>
          {categories.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => setCategory(item)}
              style={[
                styles.categoryBtn,
                category === item && styles.categoryBtnActive,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  category === item && styles.categoryTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Add Button */}
        <TouchableOpacity style={styles.button} onPress={handleAddExpense}>
          <Text style={styles.buttonText}>Add Expense</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },
  inner: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  label: {
    marginBottom: 8,
    fontWeight: '600',
    color: '#444',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  categoryBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryBtnActive: {
    backgroundColor: '#4a90e2',
  },
  categoryText: {
    color: '#333',
  },
  categoryTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});