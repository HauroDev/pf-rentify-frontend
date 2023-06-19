import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchGetAllCategoriesAsync } from "../app/features/categories/categoriesSlice";
import Input from "../components/Input";
import { fetchGetAllCountriessAsync } from "../app/features/countries/countriesSlice";
import { fetchPostProductAsync } from "../app/features/products/productsSlice";
import validationProducts from "../utils/validationProducts";


const CreateProduct = () => {
	const userId = '3ce1d6d0-506e-479a-ad4a-22535b6290de';
	const countryId = 1;
	const categoriesInfo = useSelector(state=>state.categories);
	const {countries} = useSelector(state=>state.countries);
	console.log(categoriesInfo);
	console.log(countries);

	const dispatch = useDispatch();

	//
	useEffect(()=>{
		dispatch(fetchGetAllCategoriesAsync())
		dispatch(fetchGetAllCountriessAsync())
	},[])

	//estado de input
	const [input,setInput] = useState({
		name : "",
		description: "",
		image: "",
		price: 0,
		location: "",
		state: "",
		isFeatured: false,
		
	})
	//error
	const [errors,setErrors] = useState({
		name : "",
		description: "",
		image: "",
		price: 0,
		location: "",
		state: "",
		isFeatured: false,
		
	})
	//category:
	const [categoriesChecked,setCategoriesChecked] = useState({
		'electronics': false,
		'books and entertainment': false,
		'sports and fitness / health and wellness': false,
		'fashion and accessories': false,
		'home and decoration':false,
		'cars and motorcycles': false,
		'toys and kids':false,
		'personal care':false,
		'arts and crafts':false
	})
	

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;

		if (name === "category") {
			
			setCategoriesChecked((prevInput)=>({
				...prevInput,
				[value]: checked
			}))
			
		} else if (name === "isFeatured") {
			setInput((prevInput) => ({
				...prevInput,
				isFeatured: checked,
			}));

			// setErrors((prevInput) => (validationProducts({
			// 	...prevInput,
			// 	isFeatured: checked,
			// },countries)))

		} else if(name === "price"){
			setInput((prevInput) => ({ ...prevInput, [name]: parseFloat(value) }));
			// setErrors((prevInput) => (validationProducts({ ...prevInput, [name]: parseFloat(value)},countries)));
		} else{
			setInput((prevInput) => ({ ...prevInput, [name]: value }));
			// setErrors((prevInput) => (validationProducts({ ...prevInput, [name]: value },countries)));
		}
	};
	
	console.log(input);
	console.log(categoriesChecked);
	console.log(errors)
	const handleSubmit = (e)=>{
		e.preventDefault();

		let  categories = []
		
		for (const categoryChecked of Object.keys(categoriesChecked)) {
			if (categoriesChecked[categoryChecked]) {
				const category = categoriesInfo.categories.find(
				(cat) => cat.name === categoryChecked
				);
				if (category) {
					const {idCategory,name} = category
					categories = [...categories,{idCategory,name}];
				}
			}
		}

		const product = {
			"name": input.name,
			"description": input.description,
			"image": input.image,
			"price": input.price,
			"location": input.location,
			"state": input.state,
			"isFeatured":input.isFeatured,
			"categories": categories,
			"idUser": userId,
			"idCountry": countryId,
		}

		console.log(product);

		dispatch(fetchPostProductAsync(product));
	}
	
	return (<div className="flex justify-center items-center ">
		<form onSubmit={handleSubmit} className="bg-gray_medium shadow-md rounded-md h-600 w-700 p-8">
			
			<Input 
				type="text"
				name="name"
				value={input.name}
				placeholder="Name..."
				onchange={handleChange}
				label="Name: "
			/>

			<Input 
				type="text"
				name="description"
				value={input.description}
				placeholder="Description..."
				onchange={handleChange}
				label="Description: "
			/>
			

			<Input 
				type="text"
				name="image"
				value={input.image}
				placeholder="Image URL..."
				onchange={handleChange}
				label="Image URL: "
			/>

			<Input 
				type="number"
				name="price"
				value={input.price}
				placeholder="Price..."
				onchange={handleChange}
				label="Price: "
			/>
			
            <Input 
				type="text"
				name="location"
				value={input.location}
				placeholder="Location..."
				onchange={handleChange}
				label="Location: (por ahora solo location: Argentina)"
			/>

			<Input 
				type="text"
				name="state"
				value={input.state}
				placeholder="State..."
				onchange={handleChange}
				label="State: "
			/>
			
			<div className='w-full'>
				<label htmlFor="isFeatured" className="block mb-2">Is featured:</label>
				<input
					type="checkbox"
					name="isFeatured"
					id="isFeatured"
					checked={input.isFeatured}
					className="mr-2"
					onChange={handleChange}
				/>
			</div>

			
			{	
				categoriesInfo.categories.length && categoriesInfo.status==='success'
				?
				<div className="flex flex-col">
					<p>Categoría</p>
					{
						categoriesInfo.categories.map(category => (
							<label key={category.idCategory} className="flex items-center">
								<span className="capitalize	">{category.name}</span>
								<input
									className="ml-auto mr-2"
									type="checkbox"
									name="category"
									id={category.idCategory}
									value={category.name}
									checked={categoriesChecked[`${category.name}`]}
									onChange={handleChange}
								/>
							</label>

						))
					}
				</div>
				:
				<p>Loading...</p>
			}
			{/* // ! aun no funciona el "reciclaje de este" */}
			{/* <SelectCategoryFilter/> */}

			<button type="submit" className='bg-dark_purple text-white text-xl py-2 px-6 rounded-md '>Submit Product</button>

		</form>
	</div>)
}

export default CreateProduct
