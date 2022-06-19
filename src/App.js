import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartContainer from "./components/CartContainer";
import Modal from "./components/Modal";
import NavBar from "./components/NavBar";
import { calculateTotal, getCartItems } from "./features/cart/cartSlice";

function App() {

  const { cartItems,isLoading } = useSelector(state => state.cart)
  const { isOpen } = useSelector(state => state.modal)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(calculateTotal())

  }, [cartItems, dispatch])
useEffect(()=>{
  dispatch(getCartItems())
  
  
},[dispatch])

if(isLoading){
  return(<div className="loading">
    <h4>loading...</h4>
  </div>)
}

  return (
    <main>
      {isOpen && <Modal />}
      <NavBar />
      <CartContainer />
    </main>
  );
}
export default App;
