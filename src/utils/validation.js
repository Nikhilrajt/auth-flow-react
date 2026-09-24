export const validateUsername = (username) => {
  if (!username.trim()) {
    return "Username is required";
  }

  if (username.length < 3 || username.length > 20) {
    return "Username must be 3–20 characters";
  }

  return "";
};
export const validateEmail = (email) => {
  if (!email.trim()) {
    return "Email is required";
  }

  if (!email.includes("@") || !email.includes(".")) {
    return "Enter a valid email";
  }

  return "";
};
export const validatePassword = (password) => {
  if (!password.trim()) {
    return "Password is required";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  return "";
};
export const validateFullName = (fullName) =>{
    if(!fullName.trim()){
        return "Full name is required";
    }
    if(fullName.length < 2){
        return "Full name must be at least 2 characters";
    }
    return "";
}