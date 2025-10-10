import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { getIngridients } from '../../services/ingredients/ingredientsSlice';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const params = useParams();
  const ingredientData = useSelector(getIngridients).find(
    (item) => item._id === params.id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
