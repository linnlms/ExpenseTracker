import React, {
  createContext,
  useReducer,
  useEffect,
  useState,
} from 'react';

import { expenseReducer } from './ExpenseReducer';
import { getExpenses, insertExpense } from '../db/database';

export const ExpenseContext = createContext<any>(null);

export const ExpenseProvider = ({ children }: any) => {
  const [expenses, dispatch] = useReducer(
    expenseReducer,
    [],
  );

  const [loading, setLoading] = useState(true);

  const loadExpenses = async () => {
    try {
      setLoading(true);
      const data = await getExpenses();

      dispatch({
        type: 'SET_EXPENSES',
        payload: data,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expense: any) => {
    try {
      await insertExpense(expense);
      dispatch({
        type: 'ADD_EXPENSE',
        payload: expense,
      });
    } catch (error) {
      console.log('Error adding expense:', error);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        dispatch,
        loadExpenses,
        loading,
        addExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
