import { useSelector } from "react-redux";
import classes from "./Cart.module.css";

const Cart = () => {
  const profilesInCart = useSelector((state) => state.cart.profilesInCart);

  return (
    <div className={classes.cart}>
      {profilesInCart.map((profile) => (
        <li key={profile.profileId}>{profile.profileName}</li>
      ))}
    </div>
  );
};

export default Cart;
