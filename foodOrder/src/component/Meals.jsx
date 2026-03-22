import { useContext } from "react";

import { MealContext } from "../store/MealContext";
import MealItem from "./MealItem";

export default function Meals() {
  const { meals, isLoading, error } = useContext(MealContext);

  if (isLoading) {
    return <p>Loading meals...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div id="meals">
        {meals.map((meal) => (
          <MealItem meal={meal} key={meal.id} />
        ))}
      </div>
    </>
  );
}
