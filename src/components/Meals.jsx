import MealItem from "./MealItem.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";

const requestOptions = {}

export default function Meals() {
  const {
    data: meals,
    error
  } = useHttp('http://localhost:3000/meals', requestOptions, []);

  return (
    <div id="meals">
      {
        error
          ? <Error title="Failed to fetch meals" message={error}/>
          : meals.map(meal => (
            <MealItem key={meal.id} meal={meal}/>
          ))
      }
    </div>
  )
}