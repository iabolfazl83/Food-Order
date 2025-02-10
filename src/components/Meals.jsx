import {fetchMeals} from "../http.js";
import {useEffect, useState} from "react";
import {useAppContext} from "../context/AppContext.jsx";
import MealItem from "./MealItem.jsx";

export default function Meals() {
  const [meals, setMeals] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const meals = await fetchMeals();
        setMeals(meals);
      } catch (error) {
        setError({message: error.message || 'Failed to fetch data.'});
        setIsFetching(false);
      }
      setIsFetching(false);
    }

    fetchData();
  }, []);

  return (
    <div id="meals">
      {
        isFetching && <div>Fetching Meals...</div>
      }
      {
        !error && meals.map(meal => (
          <MealItem key={meal.id} meal={meal}/>
        ))
      }
    </div>
  )
}