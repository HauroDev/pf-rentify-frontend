import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CreatePostUser } from '../../app/features/user/userSlice';
import Input from '../Input';
import validation from '../../utils/validation';

const FormUser = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    image: '',
    membership: '',
    status: '',
  });
  const [error, setError] = useState({
    name: '',
    email: '',
    phone: '',
    image: '',
    membership: '',
    status: '',
  })

  const handleChange = event => {

    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
    setError(
      validation({
        ...formData,
        [event.target.name]: event.target.value
      })
    );
  }
  const handleSumit = (event) => {
    event.preventDefault()
    console.log(formData)
    dispatch(CreatePostUser(
      formData
    ))
  }


  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gray-100  dark:bg-body_dark" >
      <div className="relative sm:max-w-sm w-full  dark:bg-body_dark">

        <form className="shadow-md rounded px-4 sm:px-10 pt-8 pb-4 sm:pt-16 sm:pb-8 mb-4" onSubmit={handleSumit}>

          <h1 className="block mt-3  text-gray-700 text-4xl text-center font-semibold mb-8  dark:text-white">
            Sign Up
          </h1>

          <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">
            Name:
          </label>
          <Input type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onchange={handleChange} />
          <div className=' text-red-700'>
            {error.name && <p>{error.name}</p>}
          </div>

          <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">
            Email:
          </label>
          <Input type="text"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onchange={handleChange} />
          <div className=' text-red-700'>
            {error.email && <p>{error.email}</p>}
          </div>

          <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">
            Phone:
          </label>
          <Input
            type="text"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onchange={handleChange}
          />
          <div className=' text-red-700'>
            {error.phone && <p>{error.phone}</p>}
          </div>

          <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">
            Image:
          </label>
          <Input
            type="text"
            name="image"
            placeholder="Enter the image URL"
            value={formData.image}
            onchange={handleChange}
          />
          <div className=' text-red-700'>
            {error.image && <p>{error.image}</p>}
          </div>

          <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">
            Membership:
          </label>
          <Input
            type="text"
            name="membership"
            placeholder="Enter your membership"
            value={formData.membership}
            onchange={handleChange}
          />
 

          <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">
            Status:
          </label>
          <Input
            type="text"
            name="status"
            placeholder="Enter your status"
            value={formData.status}
            onchange={handleChange}
          />


          <div className="flex mt-7 justify-center w-full">
            <button
              type="submit"
              className="bg-blue-700 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
              Sing up
            </button>
          </div>

          <div className="bg-gray-300 w-full my-4 py-[1px] rounded-md "></div>

          <label className="block font-medium text-sm text-gray-600 w-full">
            Or Sing up with
          </label>

          <div className="flex mt-7 justify-center w-full">
            <button className="bg-red-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
              Google
            </button>
          </div>

          <div className="mt-7">
            <div className="flex justify-center items-center">
              <label className="mr-2">¿Do you have account?</label>
              <a href="#" className="text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                Login In
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}


export default FormUser