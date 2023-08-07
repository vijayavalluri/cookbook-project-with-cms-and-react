import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useContentful from './useContentful';

const RecipeDetail = () => {
  let { id } = useParams();
  const { getFoodById } = useContentful();
  const [food, setFood] = useState(null);

  useEffect(() => {
    getFoodById(id)
      .then((res) => {
        setFood(res);
      })
      .catch((error) => console.log(error));
  }, [id]);

  if (!food) {
    return <p>Loading...</p>;
  }

  return (
    <div className="recipe-detail">
      <h2>{food.title}</h2>
      <img src={food.img} alt={food.title} />
      <p>{food.description}</p>
    </div>
  )
}

export default RecipeDetail;