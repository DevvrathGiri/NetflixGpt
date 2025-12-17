export const checkValidData = (email: string, password: string) => {
  const isEmailValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const isPasswordValid = password.length >= 6;

  if (!isEmailValid) return "Email is not valid";
  if (!isPasswordValid) return "Password must be at least 6 characters";

  return null;
};
