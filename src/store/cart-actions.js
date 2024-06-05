// store/cart-actions.js
import { uiActions } from "./ui-Slice";
import { cartActions } from "./cart-Slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch("https://advancereduxstore-default-rtdb.firebaseio.com/cart.json");
      if (!response.ok) {
        throw new Error("Fetching data failed.....");
      }
      const data = await response.json();
      return data;
    };
    
    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart({
        items:cartData.items || [],
        totalQuantity : cartData.totalQuantity
      }));
    } catch (error) {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: "Error!",
        message: "Fetching Cart data failed",
      }));
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(uiActions.showNotification({
      status: 'pending',
      title: "Sending",
      message: "Sending Cart data",
    }));

    const sendRequest = async () => {
      const response = await fetch("https://advancereduxstore-default-rtdb.firebaseio.com/cart.json", {
        method: "PUT",
        body: JSON.stringify(cart),
      });
      if (!response.ok) {
        throw new Error("Sending Cart Data Failed");
      }
    };

    try {
      await sendRequest();
      dispatch(uiActions.showNotification({
        status: 'success',
        title: "Success!",
        message: "Sending Cart data successfully",
      }));
    } catch (error) {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: "Error!",
        message: "Sending Cart data failed",
      }));
    }
  };
};
