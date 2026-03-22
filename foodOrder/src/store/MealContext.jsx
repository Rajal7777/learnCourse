import { createContext, useEffect, useState } from "react";

export const MealContext = createContext({
  meals: [],
  isLoading: false,
  error: null,
});

export function MealProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMeals() {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3000/meals");

        if (!response.ok) {
          throw new Error("Failed to fetch meals.");
        }
        const data = await response.json();
        setMeals(data);
      } catch (error) {
        setError(error.message || "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchMeals();
  }, []);

// const contextValue = {meals,isLoading,error}

   async function addOrder(orderData) {
        try {
          const response = await fetch("http://localhost:3000/orders", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(orderData),
          });

          if (!response.ok) {
            throw new Error("Failed to add order.");
          }

        } catch (error) {
          setError(error.message || "Failed to add order.");
        }



      setMeals((prevMeals) => {
        return prevMeals.map((meal) => {
          if (meal.id === mealId) {
            return { ...meal, quantity: meal.quantity + 1 };
          }
          return meal;
        });
      });

    }

  return (
    <MealContext value={{
      meals,
      isLoading,
      error
    }}>
      {children}
    </MealContext>
  );
}
