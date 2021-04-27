export const clearLocalStorage = () => {
  localStorage.clear();
};

export const saveToLocalStorage = (debit) => {
  if (debit) {
    localStorage.setItem("debit", JSON.stringify(debit));
  }
};
const patterns = {
  fullName: /[A-Za-z s]{3,}/g,
  cardNumber: /[0-9]{16}/,
  mm: /^(0[1-9]|10|11|12)$/g,
  yy: /^202[0-9]$/g,
  cvv: /^[0-9]{3}$/g,
};

export const validate = (field, Regex) => {
  if (patterns[Regex].test(field)) return true;
  return false;
};

export const validateInput = (event) =>
  validate(event.target.value, event.target.attributes.name.value);
