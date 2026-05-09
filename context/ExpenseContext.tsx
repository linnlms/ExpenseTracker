import React, {
  createContext,
  useReducer,
  useEffect,
  useState,
} from 'react';

import { expenseReducer } from './expenseReducer';
import { getExpenses } from '../db/database';

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
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};