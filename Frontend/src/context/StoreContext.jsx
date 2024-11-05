import { createContext, useEffect, useState } from "react";
import axios from "axios";


export const StoreContext = createContext(null)

const StoreContextProvider = (props)=>
{
   const [cartItems,setCartItems]= useState({});
   const [food_list,setFoodList] = useState([])
   const [loading, setLoading] = useState(false); 
   const url = "https://foodie-backend-405e.onrender.com";
   const[token, setToken] = useState("");

   const addToCart =async (itemId)=>
   {
       if(!cartItems[itemId]){
                setCartItems((prev=>({...prev,[itemId]:1}))
       )}
       else{
         setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
       }
       await axios.post(url + "/api/cart/add", { itemId }, { 
        headers: { token },
        withCredentials: true
    });
}
    
const removeFromCart = async (itemId) =>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    if(token){
        await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}}, {withCredentials: true} )
    }
}

   const getTotalCartAmount = ()=>
   {
      let totalAmoumt=0;
      for(const item in cartItems)
      {
         if(cartItems[item]>0){
            let itemInfo= food_list.find((product)=>product._id===item)
            totalAmoumt+= itemInfo.price* cartItems[item];
         }
         
      }
      return totalAmoumt;
   }
   const fetchFoodList = async () => {
      setLoading(true); 
      try {
          const response = await axios.get(url + "/api/food/list", { withCredentials: true });
          setFoodList(response.data.data);
      } catch (error) {
          console.error("Failed to fetch food list:", error);
      } finally {
          setLoading(false); 
      }
  }
  const loadCartData = async (token) =>{
    const response = await axios.post(url+"/api/cart/get",{},{headers:{token}}, {withCredentials: true});
    setCartItems(response.data.cartData);
}
  useEffect(()=>{
   async function loadData() {
       await fetchFoodList()
       if (localStorage.getItem("token")) {
           setToken(localStorage.getItem("token"));
           await loadCartData(localStorage.getItem("token")); 
       }
   }
   loadData();
},[])
     
     const contextValue = {
        food_list ,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount ,
        url,
        token,
        setToken
     }
      
     return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
     )
}

export default StoreContextProvider;
