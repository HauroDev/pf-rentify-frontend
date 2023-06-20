const validation = (formData) => {
    let errors = {};
  
    if (!formData.name) {
      errors.name = 'Please enter a name ';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      errors.name = 'Name can only contain letters';
    }
  
    if (!formData.email) {
      errors.email = 'Please enter an email';
      //^(?!\.)[a-zA-Z0-9._%+-]+@(?!-)(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?<!\.)$ alta comple
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
  
    if (!formData.phone) {
      errors.phone = 'Please enter a phone number';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
  
    // if (!formData.image) {
    //   errors.image = 'Please enter an image URL';
    // } else if (!/\.(jpg|jpeg|png|gif)$/i.test(formData.image)) {
    //   errors.image = 'Please enter a valid image URL';
    // }
    return errors;
  };
  
  export default validation;