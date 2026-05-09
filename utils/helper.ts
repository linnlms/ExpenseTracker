export const calculateTotal = (expenses: any[]) => {
  return expenses.reduce((sum, item) => sum + item.amount, 0);
};

export const calculateByCategory = (expenses: any[], category: string) => {
  return expenses
    .filter(item => item.category === category)
    .reduce((sum, item) => sum + item.amount, 0);
};

export const formatCurrency = (value: number) => {
  return `RM ${value.toFixed(2)}`;
};

export const getMonthlyExpenses = (expenses: any[]) => {
  const currentMonth = new Date().getMonth();

  return expenses.filter(item => {
    const itemMonth = new Date(item.date).getMonth();
    return itemMonth === currentMonth;
  });
};