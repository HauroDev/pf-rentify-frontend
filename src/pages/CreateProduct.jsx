import { useDispatch } from "react-redux";
import { useState } from "react";

const CreateProduct = () => {
	const userId = '3ce1d6d0-506e-479a-ad4a-22535b6290de';

	const dispatch = useDispatch();

	//name
	
	const [nameInput, setNameInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [imageInput, setImageInput] = useState('');
    const [priceInput, setPriceInput] = useState(0);
    const [locationInput, setLocationInput] = useState('');
    const [isFeaturedInput, setIsFeaturedInput] = useState(false);
    const [categoryInput, setCategoryInput] = useState('books and entertainment');

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
			<label >
				Name:
				<input type= "text" name="name"></input>
			</label>

			<label >
				Description:
				<input type= "text" name="description"></input>
			</label>

			<label >
				Image URL:
				<input type= "text" name="image"></input>
			</label>

			<label >
				Price:
				<input type= "number" name="price"></input>
			</label>

			<label >
				Location:
				<input type= "text" name="location"></input>
			</label>

			<label>
				{/* cambiar */}
				Is featured?:
				<input
				type="checkbox"
				onClick={()=>{}}
				/>
			</label>

			<label>
				Categoría:
				<select name="" id="">
					<option value="books and entertainment" valueid="2">books and entertainment</option>
				</select>
			</label>




		</form>
	</div>)
}

export default CreateProduct
