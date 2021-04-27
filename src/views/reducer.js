const initState = {
  error: null,
  isCompleted: false,
  debit: {},
};
const debitReducer = (state = initState, action) => {
  switch (action.type) {
    case "DEBIT_PENDING":
      return {
        ...state,
        ...action.payload,
      };
    case "DEBIT_SUCCESS":
      return {
        ...state,
        ...action.payload,
      };
    case "DEBIT_ERROR":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default debitReducer;
