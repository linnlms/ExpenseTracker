export const expenseReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_EXPENSES':
      return action.payload;

    case 'ADD_EXPENSE':
      return [action.payload, ...state];

    case 'DELETE_EXPENSE':
      return state.filter(
        (item: any) => item.id !== action.payload,
      );

    default:
      return state;
  }
};