import { useEffect } from "react"
import FormUser from "../components/formRegister/form.User"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { routesName } from "../utils/routes_name"

const SignUp = () => {
	const userState=useSelector(state=>state.user)
	const navigate=useNavigate()
	useEffect(()=>{
		if(userState.login===true){
			navigate(routesName.home)
		}},[userState.login])
	
	
	return (
		<FormUser></FormUser>
)

}

export default SignUp
