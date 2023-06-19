import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchGetAllCategoriesAsync } from "../app/features/categories/categoriesSlice";
import Input from "../components/Input";
import SelectCategoryFilter from "../components/Selects/SelectCategoryFilter";
import { fetchPostProductAsync } from "../app/features/products/productsSlice";

const CreateProduct = () => {
	const userId = '3ce1d6d0-506e-479a-ad4a-22535b6290de';
	const countryId = 1;
	const categoriesInfo = useSelector(state=>state.categories);
	console.log(categoriesInfo);

	const dispatch = useDispatch();

	//
	useEffect(()=>{
		dispatch(fetchGetAllCategoriesAsync())

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
		category: []
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
		category: []
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
		} else if(name === "price"){
			setInput((prevInput) => ({ ...prevInput, [name]: parseFloat(value) }));
		} else{
			setInput((prevInput) => ({ ...prevInput, [name]: value }));
		}
	};
	
	console.log(input);
	console.log(categoriesChecked);
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
	
	return (<div>
		<form onSubmit={handleSubmit}>
			
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
				label="Location: "
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
				<label htmlFor="isFeatured">Is featured:</label>
				<input
					type="checkbox"
					name="isFeatured"
					id="isFeatured"
					checked={input.isFeatured}
					className='w-full py-1 px-2 text-lg rounded-md border-[1px] border-gray_dark outline-none focus:outline-2 focus:outline-medium_fuchsia bg-white dark:bg-body_dark'
					onChange={handleChange}
				/>
			</div>

			
			{	
				categoriesInfo.categories.length && categoriesInfo.status==='success'
				?
				<div>
					<p>Categoría</p>
					{
						categoriesInfo.categories.map(category => (
							<label key={category.idCategory}>
								{category.name}
								<input
									className='w-full py-1 px-2 text-lg rounded-md border-[1px] border-gray_dark outline-none focus:outline-2 focus:outline-medium_fuchsia bg-white dark:bg-body_dark'
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

			<button type="submit">Submit Product</button>

		</form>
	</div>)
}

export default CreateProduct
