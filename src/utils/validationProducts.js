const validationProducts = (input, countries) => {
    let errors={};

    if(!input.name){
        errors.name = "Please enter a product name";
    } else if (!/^[a-zA-Z\s]+$/.test(input.name)) {
        errors.name = 'Product name can only contain letters';
    } else if(input.name.length > 35){
        errors.name = 'Product name can have a maximum of 35 characters';
    }

    if(!input.description){
        errors.description = 'Please enter a description';
    } else if(input.description.length > 50){
        errors.description = 'Description can have a maximum of 50 characters'
    }

    // más validaciones de  imagen
    if(!input.image){
        errors.image = 'Please enter a image URL'
    }

    if(input.price == 0){
        errors.price = "Product price cannot be zero"
    } else if (input.price<0){
        errors.price = 'Please enter a valid price, negative values are invalid'
    }

    if(!input.location){
        errors.location = 'Please enter a location'
    } else if(countries?.length){
        if(!countries?.some(country=>country.name === input.location)){
        errors.location = 'Location not valid'
        }
    }

    if(!input.state){
        errors.state = "Please enter a state";
    } else if (!/^[a-zA-Z\s]+$/.test(input.state)) {
        errors.state = 'State can only contain letters';
    } else if(input.state.length > 30){
        errors.state = 'State can have a maximum of 30 characters';
    }

    

    return errors;
}

export default validationProducts;