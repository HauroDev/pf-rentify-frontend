import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CreatePostUser } from '../../app/features/user/userSlice';
import Input from '../Input';

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

    const handleChange = event => {

        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
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

      <label className="block mt-3 text-sm text-gray-700 text-center font-semibold mb-8">
        Sign Up
      </label>
      
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Name:
      </label>
      <Input type="text"
        name="name"
        placeholder="Enter your name"
        value={formData.name}
        onchange={handleChange} />
      {/* <input
        type="text"
        name="name"
        placeholder="Enter your name"
        value={formData.name}
        onChange={handleChange}
        className="w-full py-2 px-4 text-lg rounded-md border-[1px] border-gray-400 outline-none focus:outline-medium_fuchsia bg-white dark:bg-body_dark"
      /> */}

      <label className="block text-gray-700 text-sm font-bold mb-2">
        Email:
      </label>
      <input
        type="text"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        className="w-full py-2 px-4 text-lg rounded-md border-[1px] border-gray-400 outline-none focus:outline-medium_fuchsia bg-white dark:bg-body_dark"
      />

      <label className="block text-gray-700 text-sm font-bold mb-2">
        Phone:
      </label>
      <input
        type="text"
        name="phone"
        placeholder="Enter your phone number"
        value={formData.phone}
        onChange={handleChange}
        className="w-full py-2 px-4 text-lg rounded-md border-[1px] border-gray-400 outline-none focus:outline-medium_fuchsia bg-white dark:bg-body_dark"
      />

      <label className="block text-gray-700 text-sm font-bold mb-2">
        Image:
      </label>
      <input
        type="text"
        name="image"
        placeholder="Enter the image URL"
        value={formData.image}
        onChange={handleChange}
        className="w-full py-2 px-4 text-lg rounded-md border-[1px] border-gray-400 outline-none focus:outline-medium_fuchsia bg-white dark:bg-body_dark"
      />

      <label className="block text-gray-700 text-sm font-bold mb-2">
        Membership:
      </label>
      <input
        type="text"
        name="membership"
        placeholder="Enter your membership"
        value={formData.membership}
        onChange={handleChange}
        className="w-full py-2 px-4 text-lg rounded-md border-[1px] border-gray-400 outline-none focus:outline-medium_fuchsia bg-white dark:bg-body_dark"
      />

      <label className="block text-gray-700 text-sm font-bold mb-2">
        Status:
      </label>
      <input
        type="text"
        name="status"
        placeholder="Enter your status"
        value={formData.status}
        onChange={handleChange}
        className="w-full py-2 px-4 text-lg rounded-md border-[1px] border-gray-400 outline-none focus:outline-medium_fuchsia bg-white dark:bg-body_dark"
      />

      <div className="flex mt-7 justify-center w-full">
        <button
          type="submit"
          className="bg-blue-700 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
          Sing up
        </button>
      </div>
      
      <div className="bg-gray-300  w-full py-[1px] rounded-md "></div> 

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