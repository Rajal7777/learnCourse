import Button from "./Button";

export default function MealItem({ meal }) {
   const price = new Intl.NumberFormat("en-us",{
    style: "currency",
    currency: "USD"
   })

    return (
        <div className="meal-item" key={meal.id}>

            <article >
                <img src={`http://localhost:3000/${meal.image}`} alt="menu food image" />
                <h3>{meal.name}</h3>
                <span className="meal-item-price"> {price.format(meal.price)}</span>
                <p className="meal-item-description">
                    {meal.description}
                </p>
                <Button className="btn">Add To Cart</Button>
            </article>
        </div>
    );
}