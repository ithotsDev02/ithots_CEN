import actions from "./actions";
// import products from "../../demoData/cart.json";
import successNotification from "../../components/notification/successNotification";

const {
  cartDataBegin,
  cartDataSuccess,
  cartDataErr,

  cartUpdateBegin,
  cartUpdateSuccess,
  cartUpdateErr,

  cartDeleteBegin,
  cartDeleteSuccess,
  cartDeleteErr,
} = actions;

// const cartGetData = () => {
//   return async (dispatch) => {
//     try {
//       dispatch(cartDataBegin());
//       dispatch(cartDataSuccess(products));
//     } catch (err) {
//       dispatch(cartDataErr(err));
//     }
//   };
// };

const cartUpdateQuantity = (data) => {
  return async (dispatch) => {
    try {
      dispatch(cartUpdateBegin());
      // const data = cartData.map((item) => {
      //   if (item.id === id) item.quantity = quantity;
      //   return item;
      // });
      dispatch(cartUpdateSuccess(data));
      // successNotification("Course added to cart!");
    } catch (err) {
      dispatch(cartUpdateErr(err));
    }
  };
};
const emptyCart = () => {
  return async (dispatch) => {
    try {
      dispatch(cartDeleteBegin());
      // const data = chartData.filter((item) => item.id !== id);
      setTimeout(() => {
        dispatch(cartUpdateSuccess([]));
      }, 500);
    } catch (err) {
      dispatch(cartDeleteErr(err));
    }
  };
};
const cartDelete = (data) => {
  return async (dispatch) => {
    try {
      dispatch(cartDeleteBegin());
      // const data = chartData.filter((item) => item.id !== id);
      setTimeout(() => {
        dispatch(cartDeleteSuccess(data));
        window.location = "/home";

        setTimeout(() => {
          successNotification("Course removed from your cart!");
        }, 1500);

      }, 500);
    } catch (err) {
      dispatch(cartDeleteErr(err));
    }
  };
};

export { cartUpdateQuantity, cartDelete, emptyCart };
