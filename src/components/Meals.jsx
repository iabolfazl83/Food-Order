import {fetchMeals} from "../http.js";
import {useEffect, useState} from "react";

export default function Meals() {
  const [meals, setMeals] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {

    async function fetchData() {
      setIsFetching(true);
      try {
        debugger
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
          <div key={meal.id} className="meal-item">
            <div>
              <img src={`http://localhost:3000/${meal.image}`} alt={meal.name}/>
            </div>
            <div className="article">
              <h1>{meals.name}</h1>
              <div className="meal-item-description">
                {meal.description}
              </div>
              <div className="meal-item-price">{meal.price}</div>
            </div>
          </div>
        ))
      }
    </div>
  )
}