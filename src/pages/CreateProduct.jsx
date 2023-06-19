import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchGetAllCategoriesAsync } from "../app/features/categories/categoriesSlice";
import Input from "../components/Input";
import SelectCategoryFilter from "../components/Selects/SelectCategoryFilter";

const CreateProduct = () => {
	const userId = '3ce1d6d0-506e-479a-ad4a-22535b6290de';
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
		isFeatured: false,
		category: []
	})
	//category:
	

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
	  
		if (name === "category") {
			//!aun no funciona
		//   const categoryExists = categoriesInfo.categories.some((c) => c.idCategory === value);
	  
		//   if (checked && !categoryExists) {
		// 	setInput((prevInput) => [
		// 	  ...prevInput,
		// 	  { idCategory: value, name: categoriesInfo.categories.find(cat=>cat.idCategory===parseInt(value))?.name },
		// 	]);
		//   } else if (!checked && categoryExists) {
		// 	setInput((prevInput) =>
		// 	prevInput.filter((category) => category.idCategory !== value)
		// 	);
		//   }
		} else if (name === "isFeatured") {
		  setInput((prevInput) => ({
			...prevInput,
			isFeatured: checked,
		  }));
		} else {
		  setInput((prevInput) => ({ ...prevInput, [name]: value }));
		}
	};
	
	  console.log(input)
	const handleSubmit = (e)=>{
		e.preventDefault()
		console.log();
	}
	// ! ejemplo de bd
	// {
	// 	"name": "Space Marines: The Omnibus",
	// 	"description": "Mighty anthology of Space Marine short stories",
	// 	"image": "https://m.media-amazon.com/images/I/51EE75n+6YL._SX326_BO1,204,203,200_.jpg",
	// 	"price": 79,
	// 	"location": "USA",
	// 	"isFeatured":false,
	// 	"categories": [
	// 	  {
	// 		"idCategory": 2,
	// 		"name": "books and entertainment"
	// 	  }
	// 	],
	// 	"idUser": "3ce1d6d0-506e-479a-ad4a-22535b6290de"
	//   }
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
								<input
          							type="checkbox"
          							name="category"
          							value={category.idCategory}
          							onChange={handleChange}
        						/>
								{category.name}
							</label>
							
						))
					}
				</div>
				:
				<p>Loading...</p>
			}
			// ! aun no funciona el "reciclaje de este"
			<SelectCategoryFilter/>



		</form>
	</div>)
}

export default CreateProduct
