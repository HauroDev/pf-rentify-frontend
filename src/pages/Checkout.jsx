import { useSelector } from "react-redux"
import Card from "../components/Home/Card"
import { initMercadoPago } from '@mercadopago/sdk-react';
import { MERCADOPAGO_PUBLIC_KEY } from "../mercadopacgo.config";
initMercadoPago(MERCADOPAGO_PUBLIC_KEY);
import { Wallet } from '@mercadopago/sdk-react';
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { routesName } from "../utils/routes_name";
import { postOrdenPago } from "../services/MercadoService";

const Checkout = () => {

    const cartState = useSelector(state => state.cart)
    const [isReady, setIsReady]=useState(false) 
    const [preferenceId, setpreferenceId]=useState(null) 

    const url='https://api-rentify.onrender.com/api-rentify/payments/order'
    // if(cartState.cart.items.length<1){
    //     return <Navigate to={routesName.home}/>
    // }
    const handleOnReady = () => {
        setIsReady(true)
      }
    
      const renderCheckoutButton = (preferenceId) => {
        if (!preferenceId) return null
    
        return (
          <Wallet
            initialization={{ preferenceId: preferenceId, redirectMode: 'self' }}
            onReady={handleOnReady}
          />
        )
      }

      const handleCheckout= async ()=>{
            const arrayItems=cartState.cart.items.map(item=>({
                title:item.name,
                unit_price:item.price,//number
                quantity:item.quantity//number
            }))
            console.log(arrayItems)
            try {
                  const data=await postOrdenPago({items:arrayItems})   
                    setpreferenceId(data.preferenceId)
                    console.log(data)
            } catch (error) {
                console.log(error)
            }
      }

    return (
        <div>
        {cartState.cart.items.map(product=>(
            
         <div key={product.idProd}>
            <h3>{product.name}</h3>
            <h3>{product.price} {cartState.cart.currency}</h3>
            <h3>quantity:{product.quantity}</h3> <hr />

         </div>

        ))}   
        <p>total:{cartState.cart.total}</p>
        <button onClick={handleCheckout}>checkout</button>
        {renderCheckoutButton(preferenceId)}
        </div>
    )

}

export default Checkout