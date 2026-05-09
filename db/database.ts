import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const db = SQLite.openDatabase({
  name: 'ExpenseDB',
  location: 'default',
});

export const initDB = async () => {
  const database = await db;

  await database.executeSql(`
    CREATE TABLE IF NOT EXISTS expenses (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT,
      amount REAL,
      category TEXT,
      date TEXT
    );
  `);
};

export const insertExpense = async (expense: any) => {
  const database = await db;

  return database.executeSql(
    `INSERT INTO expenses 
    (id, title, amount, category, date)
    VALUES (?, ?, ?, ?, ?)`,
    [
      expense.id,
      expense.title,
      expense.amount,
      expense.category,
      expense.date,
    ],
  );
};

export const getExpenses = async () => {
  const database = await db;

  const result = await database.executeSql(
    `SELECT * FROM expenses ORDER BY date DESC`,
  );

  const rows = result[0].rows;
  const expenses = [];

  for (let i = 0; i < rows.length; i++) {
    expenses.push(rows.item(i));
  }

  return expenses;
};

export const deleteExpense = async (id: string) => {
  const database = await db;

  return database.executeSql(
    `DELETE FROM expenses WHERE id = ?`,
    [id],
  );
};