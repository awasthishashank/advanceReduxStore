import { useSelector ,useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { Fragment, useEffect } from "react";
import { uiActions } from "./store/ui-Slice";
import Notification from "./components/UI/Notification";
let intialState = true

function App() {
  const dispatch = useDispatch()
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state)=> state.ui.notification)

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(uiActions.showNotification({
        status : 'pending',
        title :"Sending",
        message:"Sending Cart data"
      }));
      const response = await fetch(
        "https://advancereduxstore-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if(!response.ok){
        throw new Error("Sending Cart Data Failed")
      }
      const responseData = await response.json();

      dispatch(uiActions.showNotification({
        status : 'success',
        title :"success!",
        message:"Sending Cart data successfully"
      }));
    };
    if (intialState){
      intialState =false
      return
    }
    sendCartData().catch((error)=> {
      dispatch(uiActions.showNotification({
        status : 'error',
        title :"Error!",
        message:"Sending Cart data failed"
      }));
       
    })
  }, [cart,dispatch]);
  return (
    <Fragment>
      {notification && <Notification status={notification.status} title ={notification.title} message ={notification.message}/>}
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
    </Fragment>
  );
}

export default App;
