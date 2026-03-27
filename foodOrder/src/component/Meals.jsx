import useHttp from "../hooks/useHttp.js";
import MealItem from "./MealItem.jsx";
import Error from './UI/Error.jsx'

const requestConfig = {};


export default function Meals() {
  const  {data: loadedMeals, isLoading, error} = useHttp('http://localhost:3000/meals', requestConfig, []);


  if(isLoading) {
    return <p className="center">Fetching data...</p>
  }

  if(error) {
    return <Error title="Failed to fetch Meals" message={error} />
  }

  // useEffect(() => {
  //   async function fetchMeals() {
  //     const response = await fetch("http://localhost:3000/meals");

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch meals");
  //     }

  //     const meals =  await response.json();
  //     setLoadedMeals(meals);
  //   }

  //   fetchMeals();
  // }, []);
  // console.log("meal", loadedMeals)

  return (
    <>
      <ul id="meals">
        {loadedMeals.map((meal) => (
          <MealItem meal={meal} key={meal.id} />
        ))}
      </ul>
    </>
  );
}
