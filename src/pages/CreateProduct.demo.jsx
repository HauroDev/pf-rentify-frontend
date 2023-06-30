import { useForm } from "react-hook-form";

import { useContext, useState, useEffect } from "react";
import { useSelector,useDispatch} from "react-redux";
import { useNavigate   } from "react-router-dom";
import { ToastContext } from "../context/ToastContext";
import { fetchGetAllCategoriesAsync } from "../app/features/categories/categoriesSlice";
import { fetchGetAllCountriessAsync } from "../app/features/countries/countriesSlice";
import { fetchPostProductAsync } from "../app/features/products/productsSlice"; 
import { saveAndGetImage } from "../services/imageFirebaseService";
import { getCountryStates } from "../services/locationService";



const CreateProductDemo = () => {
    const { register, handleSubmit, watch,setValue, formState: { errors }, trigger} = useForm();


    const categoriesInfo = useSelector((state) => state.categories);
	const countriesInfo = useSelector((state) => state.countries);
	const userinfo = useSelector((state) => state.user);

    const { addToast } = useContext(ToastContext);
	const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userId, setUserId] = useState('');

    const [countryApiId, setCountryApiId] = useState(null);
    const [dataStates, setDataStates] = useState([]);

    const [stateApiId, setStateApiId] = useState(null);
	const [dataLocations, setDataLocations] = useState([]);

    const [isLoading,setIsLoading] = useState(false);

    const getDataState = async (id) => {
		try {
			const data = await getCountryStates(id)
            
			setDataStates(data)
		} catch (error) {
			console.log(error)
		}
	}
    
    const getDataLocation = async (id) => {
		try {
			const data = await getCountryStates(id)
			setDataLocations(data)
		} catch (error) {
			console.log(error)
		}
	}

    useEffect(()=>{
        if (userinfo.status === 'success') {
			setUserId(userinfo.user.idUser)
		}
        if (!categoriesInfo.categories.length) {
			dispatch(fetchGetAllCategoriesAsync());
		}
        if (!countriesInfo.countries.length) {
			dispatch(fetchGetAllCountriessAsync())
		}
        if (countryApiId) {
			setDataStates([])
			getDataState(countryApiId)
		}
		if (stateApiId) {
            setDataLocations([])
			getDataLocation(stateApiId)
		}
        
    },[countryApiId,stateApiId,userinfo])

    

    const handleCountrySelect = (e) => {
        trigger("country")
        const selectedOption = e.target.options[e.target.selectedIndex].getAttribute('data-geonameid');
        setCountryApiId(selectedOption);
        setValue("state","")
    }
    console.log(watch("country"));
    console.log(watch("state"));
    console.log(watch("location"));
    
    const handleStateSelect = (e) => {
        trigger("state")
        const selectedOption = e.target.options[e.target.selectedIndex].getAttribute('data-geonameid');
        setValue("location","")
        setStateApiId(selectedOption)
    }

    const handleLocationSelect = (e) => {
        trigger("location")
    }

    const validateFileSize = (file) => {
        const sizeInMB = 0.5;
        const maxSizeInBytes = sizeInMB * 1024 * 1024;
        
        if (file[0].size <= maxSizeInBytes) {
            return true;
        } else {
            return 'El tamaño del archivo debe ser menor o igual a 0.5MB';
        }
    };
    
    const validateFileType = (file) => {
        const allowedTypes = ['image/jpeg', 'image/png'];
    
        if (allowedTypes.includes(file[0].type)) {
            return true; 
        } else {
            return 'El archivo debe ser de tipo JPEG o PNG';
        }
    };


    const onSubmit = async (data) => {
        setIsLoading(true)
        console.log(data)
        const filteredCategories = [...categoriesInfo.categories].filter((category) =>
            data.categories.includes(String(category.idCategory))
        ).map((category) => ({ idCategory: category.idCategory, name: category.name }));
        const product = {
			name: data.name,
			description: data.description,
			image: "",
			price: parseFloat(data.price),
			location: data.location,
			state: data.state,
			isFeatured: data.isFeatured,
			categories: filteredCategories,
			idUser: userId,
			idCountry: parseFloat(data.country)   ,
		}

        console.log(product);
        try {
            const imgURL = await saveAndGetImage(data.image[0], 'products')
			console.log(imgURL);
            if(!imgURL){
                throw Error("Firebase Error")
            }
            const updatedProduct = { ...product, image: imgURL }
            console.log(updatedProduct)
            const response = await dispatch(fetchPostProductAsync(updatedProduct));
			
			if(!response.payload){
				throw Error(`Api error`)
			}
			setIsLoading(false);
			addToast({
				title: 'Success',
				description: `${product.name} was added successfully`,
				type: 'success',
			})

        } catch (error) {
            setIsLoading(false)
            addToast({
				title: `${error.message}`,
				description: `${product.name} couldn't be added`,
				type: 'danger',
			})
        }
    }
    return(
        <div>
            <h2>Post a product</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/*  name */}
                <div>
                    <label htmlFor="name">Name:</label>
                    <input 
                        type="text"
                        id="name"
                        {...register("name",{required:true,maxLength:40,minLength:3,pattern:/^[\wñÑ\s\d]+$/u,onChange:()=>{trigger("name")}})}
                        aria-invalid={errors.name ? "true":"false"}
                    />
                    {errors.name && errors.name.type === "required" && (
                        <p role="alert">Name is required</p>
                    )}
                    {errors.name && errors.name.type === "maxLength" && (
                        <p role="alert">Product name must be less than 40 characters</p>
                    )}
                    {errors.name && errors.name.type === "minLength" && (
                        <p role="alert">Product name have more than 3 characters</p>
                    )}
                    {errors.name && errors.name.type === "pattern" && (
                        <p role="alert">Product name can only contain letters and numbers</p>
                    )}
                </div>
                
                {/* description */}
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea  
                        id="description"
                        {...register("description",{required:true,maxLength:1200,onChange:()=>{trigger("description")}})}
                        aria-invalid={errors.description ? "true":"false"}
                    />
                    {errors.description && errors.description.type === "required" &&(
                        <p role="alert">Description is required</p>
                    )}
                </div>

                {/* image */}
                <div>
                    <label htmlFor="image">Suba una imagen:</label>
                    <input 
                        type="file"
                        id="image"
                        {...register("image",{required:true,validate:{validateFileType,validateFileSize},onChange:()=>{trigger("image")}})}
                        aria-invalid={errors.image ? "true":"false"}
                    />
                    {errors.image && errors.image.type === "required" && (
                        <p role="alert">Image is required</p>
                    )}
                    {errors.image && errors.image.type === "validateFileType" && (
                        <p role="alert">{errors.image.message}</p>
                    )}
                    {errors.image && errors.image.type === "validateFileSize" && (
                        <p role="alert">{errors.image.message}</p>
                    )}
                </div>

                {/* price */}
                <div>
                    <label htmlFor="price">Price:</label>
                    <input 
                        type="number"
                        id="price"
                        {...register("price",{required:true,min:0,onChange:()=>{trigger("price")}})}
                        aria-invalid={errors.price ? "true":"false"}
                    />
                    {errors.price && errors.price.type === "required" && (
                        <p role="alert">Price is required</p>
                    )}
                    {errors.price && errors.price.type === "min" && (
                        <p role="alert">Please enter a valid price, negative values are invalid</p>
                    )}
                </div>


                {/* country */}
                <div>
                    <label htmlFor="country">Select Country:</label>
                    {
                        countriesInfo.countries.length
                        ?
                        <select id='country'
                            {...register("country",{required:true,onChange:handleCountrySelect})}
                            aria-invalid={errors.country ? "true":"false"}
                            
                            >
                                <option value="" disabled>Countries</option>
                            {
                                countriesInfo.countries.map(country => (
                                    <option 
                                        key={country.idCountry} 
                                        value={country.idCountry}
                                        data-geonameid={country.geonameId}
                                        >
                                        {country.name}
                                    </option>
                                ))
                            }
                        </select>
                        :
                        <select>
                            <option value="">Loading Countries...</option>
                        </select>
                    }
                    { errors.country && errors.country.type === "required" && (
                        <p role="alert">Country is required</p>
                    )}
                </div>
                
                {/* state */}
                <div>
                    <label htmlFor="state">Select State:</label>
                    {
                        dataStates.length
                        ?
                        <select id='state' 
                            {...register("state",{required:true,onChange:handleStateSelect})}
                            aria-invalid={errors.state ? "true":"false"}
                            >
                                <option value="" disabled>States</option>
                            {
                                dataStates.map(state => (
                                    <option 
                                        key={state.geonameId} 
                                        value={state.name}
                                        data-geonameid={state.geonameId}>
                                        {state.name}
                                    </option>
                                ))
                            }
                        </select>
                        :
                        <select>
                            <option value="">Loading States...</option>
                        </select>
                    }
                    { errors.state && errors.state.type === "required" && (
                        <p role="alert">State is required</p>
                    )}
                </div>
                
                {/* location */}
                <div>
                    <label htmlFor="location">Select Location:</label>
                    {
                        dataLocations.length
                        ?
                        <select id='location' 
                            {...register("location",{required:true,onChange:handleLocationSelect})}
                            aria-invalid={errors.location ? "true":"false"}

                            >
                                <option value="" disabled>Locations</option>
                            {
                                dataLocations.map(location => (
                                    <option 
                                        key={location.geonameId} 
                                        value={location.name}
                                        data-geonameid={location.geonameId}>
                                        {location.name}
                                    </option>
                                ))
                            }
                        </select>
                        :
                        <select>
                            <option value="">Loading States...</option>
                        </select>
                    }
                    {errors.location && errors.location.type === "required" && (
                        <p role="alert">Location is required    </p>
                    )}
                </div>
                
                {/* categories */}
                <div>
                    <label htmlFor="categories">Select categories:</label>
                    {
                        categoriesInfo.categories.length
                        ?
                        categoriesInfo.categories.map(category=>(
                            <div key={category.idCategory}>
                                <input 
                                    type="checkbox"
                                    id={category.idCategory}
                                    {...register("categories",{required:true,onChange:()=>{trigger('categories')}})}
                                    value={category.idCategory}
                                    aria-invalid={errors.categories ? "true":"false"}
                                />
                                <label htmlFor={category.idCategory}>{category.name}</label>
                            </div>
                        ))
                        :
                        <select>
                            <option value="">Loading categories...</option>
                        </select>
                    }
                    {errors.categories && errors.categories.type === "required" && (
                        <p role="alert">Please select a category</p>
                    )}
                </div>

                <div>
                    <label htmlFor="isFeatured">Do you want to sponsor this product?</label>
                    <input 
                        type="checkbox"
                        id="isFeatured"
                        {...register('isFeatured')}
                        />
                </div>
                
                <input type="submit" value="Submit Product"/>
            </form>
            {
                isLoading && <p>Loading...</p>
            }
        </div>
    )
}

export default CreateProductDemo