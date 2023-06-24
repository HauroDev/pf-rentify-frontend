const validation = (formData) => {
    let errors = {};
  
  
  
    if (!formData.email) {
      errors.email = 'Please enter an email';
      //^(?!\.)[a-zA-Z0-9._%+-]+@(?!-)(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?<!\.)$ alta comple
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!password) {
      errors.password= 'Please enter a password';
    } else if (formData.password.length <6) {
      errors.password ='Password must be at least 6 characters long';
    } else if (!/[A-Z]/.test(formData.password)) {
      errors.password ='Password must contain at least one uppercase letter';
    } else if (!/[0-9]/.test(formData.password)) {
      errors.password ='Password must contain at least one number';
    } 




    if (!confirmPassword) {
      errors.confirmPassword= 'Please enter a confirmPassword';
    } else if (formData.confirmPassword.length < 6) {
      errors.confirmPassword ='Password must be at least 6 characters long';
    } else if (!/[A-Z]/.test(formData.confirmPassword)) {
      errors.confirmPassword ='Password must contain at least one uppercase letter';
    } else if (!/[0-9]/.test(formData.confirmPassword)) {
      errors.confirmPassword ='Password must contain at least one number';
    } else if(formData.confirmPassword !== formData.password ){
      errors.confirmPassword ='Password not equal ';
    } 
     
    return errors;
  };
  
  export default validation;






  // throw new Error('auth/account-exists-with-different-credential');

  // // Ejemplo de error: credencial ya en uso
  // throw new Error('auth/credential-already-in-use');

  // // Ejemplo de error: operación no permitida
  // throw new Error('auth/operation-not-allowed');

  // // Ejemplo de error: ventana emergente bloqueada
  // throw new Error('auth/popup-blocked');

  // // Ejemplo de error: ventana emergente cerrada por el usuario
  // throw new Error('auth/popup-closed-by-user');