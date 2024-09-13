import MealItem from "./Mealitem";
import ErrorPage from "./ErrorPage";
import useHttp from "../hooks/useHttp";

const requestConfig = {};

export default function Meals() {
  const {
    data: meals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {
    return (
      <ErrorPage
        title="Failed to fetch meals check your network and try again"
        message={error}
      />
    );
  }

  // if (!meals) {
  //   return <p className="center">No meals found.</p>;
  // }

  return (
    <ul id="meals">
      {meals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
