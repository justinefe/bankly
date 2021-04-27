import { saveToLocalStorage } from "../utils/";

export const debitPending = () => ({
  type: "DEBIT_PENDING",
  payload: {
    isCompleted: false,
    error: null,
  },
});

export const debitError = (error) => ({
  type: "DEBIT_ERROR",
  payload: {
    error,
    isCompleted: false,
  },
});

export const debitSuccess = (cardDetails) => ({
  type: "DEBIT_SUCCESS",
  payload: {
    error: null,
    isCompleted: true,
    debit: cardDetails,
  },
});

export const cleanUp = () => ({
  type: "CLEAN_UP",
  payload: {
    error: null,
    isCompleted: false,
  },
});

export const debitAction = (values) => async (dispatch) => {
  dispatch(cleanUp());
  await dispatch(debitPending());
  try {
    dispatch(debitSuccess(values));
    saveToLocalStorage(values);
  } catch (error) {
    dispatch(debitError("Network Error. Please try again"));
  }
};
