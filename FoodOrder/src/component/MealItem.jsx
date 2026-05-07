import { useContext } from "react";
import CartContext from "../store/CartContext";

import Button from "./UI/Button";


const price = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
});

export default function MealItem({ meal }) {
    const orderedPrice = price.format(meal.price);
   
    const cartCtx = useContext(CartContext);

    function handleAddMealToCart(){
        cartCtx.addItem(meal);
    }


    return (
        <li className="meal-item">
            <article>
                <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">{orderedPrice}</p>
                    <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className="meal-item-actions">
                    <Button onClick={handleAddMealToCart}>Add to Cart</Button>
                </p>
            </article>
        </li>
    );
}
