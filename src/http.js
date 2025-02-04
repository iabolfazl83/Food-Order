export async function fetchMeals() {
  const meals = await fetch("http://localhost:3000/meals");
  const resData = await meals.json();

  if (!meals.ok) {
    throw new Error('Failed to fetch meals.');
  }
  return resData;
}