import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import classes from "./Cart.module.css";
import { cartActions } from "./cartSlice";
import { useDispatch } from "react-redux";

const Cart = () => {
  const profilesInCart = useSelector((state) => state.cart.profilesInCart);
  
  const dispatch = useDispatch();

  return (
    <div className={classes.cart}>
      {profilesInCart.map((profile) => (
        <li key={profile.profileId}>
          {profile.profileName}
          <Button variant="outlined"
            onClick={() => {
              dispatch(
                cartActions.removeProfileFromCart(profile.id));
            }}
          >
            remove from cart
          </Button>
        </li>
      ))}
    </div>
  );
};

export default Cart;
