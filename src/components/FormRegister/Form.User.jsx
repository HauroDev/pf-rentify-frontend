import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CreatePostUser } from '../../app/features/user/userSlice';

const FormUser=()=>{
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        image: '',
        membership: '',
        status: '',
      });

      const handleChange=event=>{
   
        setFormData({
            ...formData,
            [event.target.name]:event.target.value
        })
      }
      const handleSumit=(event)=>{
        event.preventDefault()
        console.log(formData)
        dispatch(CreatePostUser(
            formData
        ))
      }

    return(
        <div className="min-h-screen flex items-center justify-center">
        <form className="shadow-md rounded px-10 pt-6 pb-8 mb-4" onSubmit={handleSumit}>
            <label className="block text-gray-700 text-sm font-bold mb-2" >
                Name:
            </label>
            <input   type="text" name="name" placeholder="Enter your name"  value={formData.name} onChange={handleChange}  />

            <label className="block text-gray-700 text-sm font-bold mb-2" >
                Email:
            </label>
            <input   type="text" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange}/>

            <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone:
            </label>
            <input  type="text" name="phone" placeholder="Enter your phone number"  value={formData.phone} onChange={handleChange}/>

            <label className="block text-gray-700 text-sm font-bold mb-2">
                Image:
            </label>
            <input   type="text" name="image" placeholder="Enter the image URL"  value={formData.image}  onChange={handleChange}/>

            <label className="block text-gray-700 text-sm font-bold mb-2" >
                Membership:
            </label>
            <input  type="text" name="membership" placeholder="Enter your membership" value={formData.membership} onChange={handleChange}/>

            <label className="block text-gray-700 text-sm font-bold mb-2" >
                Status:
            </label>
            <input   type="text" name="status" placeholder="Enter your status"   value={formData.status} onChange={handleChange}/>

            <div className="flex items-center justify-between">
                <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
                    Submit
                </button>
            </div>
        </form>
    </div>
    )
}


export default FormUser