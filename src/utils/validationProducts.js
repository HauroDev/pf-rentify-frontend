const validationProducts = (inputName, inputValue) => {
    

    switch (inputName) {
        case 'name':
            if(!inputValue){
                return "Please enter a product name";
            } else if (!/^[a-zA-Z\s]+$/.test(inputValue)) {
                return 'Product name can only contain letters';
            } else if(inputValue.length > 40 || inputValue.length<3){
                return 'Product name must be between 3 and 40 characters';
            } else{
                return "";
            }
        
        case 'description':
            if(!inputValue){
                return 'Please enter a description';
            } else if(inputValue.length > 300){
                // ! esto se puede cambiar
                return 'Description can have a maximum of 300 characters'
            } else{
                return ""
            }

        case 'image':
            const fileSizeLimit = 0.5; // Tamaño límite en MB
            const allowedFileTypes = ['image/jpeg', 'image/png'];
            if(!inputValue){
                return 'Please enter a file'
            }else if (inputValue?.size > 0.5 * 1024 * 1024) {
                return 'The file exceeds the maximum size allowed';
            }else if (!allowedFileTypes.includes(inputValue.type)) {
                    return 'The file is not of an allowed type';
            }else{
                return null;
            }
        
        case 'price':
            if(inputValue == 0){
                return "Product price cannot be zero"
            } else if (inputValue<0){
                return 'Please enter a valid price, negative values are invalid'
            } else{
                return ""
            }

        case 'country':
            if(!inputValue){
                return 'Please enter a country'
            }else{
                return '';
            }

        case 'location':
            if(!inputValue){
                return 'Please enter a location'
            }else{
                return '';
            }

        case 'state':
            if(!inputValue){
                return 'Please enter a state'
            }else{
                return '';
            }
        
        case 'category':
            if (Object.values(inputValue).every((value) => value === false)) {
                return 'Please select a category';
            }else{
                return '';
            }
    
        default:
            return "";
    }

    
    // // más validaciones de  imagen
    // if(!input.image){
    //     errors.image = 'Please enter a image URL'
    // }


}



export default validationProducts;