import {currencyFormatter} from "../util/formatting.js";
import Button from "./UI/Button.jsx";
import {useAppContext} from "../context/AppContext.jsx";

export default function MealItem({meal}) {
  const {addToCart} = useAppContext();

  return (
    <div key={meal.id} className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name}/>
        <div className="article">
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
          <p className="meal-item-description">
            {meal.description}
          </p>
          <p className="meal-item-actions">
            <Button onClick={() => {
              addToCart(meal)
            }}>Add to Cart
            </Button>
          </p>
        </div>
      </article>
    </div>
  )
}