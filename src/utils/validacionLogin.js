const validationLogin = (login) => {
    let errors = {};
  
    if (!login.email) {
      errors.email = 'Please enter an email';
      //^(?!\.)[a-zA-Z0-9._%+-]+@(?!-)(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?<!\.)$ alta comple
    } else if (!/\S+@\S+\.\S+/.test(login.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!password) {
      errors.password= 'Please enter a password';
    } else if (login.password.length <6) {
      errors.password ='Password must be at least 6 characters long';
    } else if (!/[A-Z]/.test(login.password)) {
      errors.password ='Password must contain at least one uppercase letter';
    } else if (!/[0-9]/.test(login.password)) {
      errors.password ='Password must contain at least one number';
    } 
    return errors;
  };
  
  
  export default validationLogin;

