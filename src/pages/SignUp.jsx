import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { routesName } from "../utils/routes_name"
import FormUser from "../components/FormRegister/Form.User"

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
