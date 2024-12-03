const validateEmail = (emailAddress) => {
  const regex = /^(?!.*\.\.)[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+(?!.*\.\.)\.[a-zA-Z]{2,4}$/;
  return regex.test(emailAddress);
};
export default validateEmail;