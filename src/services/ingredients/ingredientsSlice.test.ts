import { expect, describe, jest } from '@jest/globals';
import {
  getIngridients,
  isLoadingIngredients,
  getState
} from './ingredientsSlice';
import { fetchIngredients } from './actions';
import * as api from '@api';
import store from '../store';

const mockIngredients = [
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa0944',
    name: 'Соус традиционный галактический',
    type: 'sauce',
    proteins: 42,
    fat: 24,
    carbohydrates: 42,
    calories: 99,
    price: 15,
    image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
    __v: 0
  }
];

describe('Тестирование экшена fetchIngredients', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Если экшен в состоянии pending, то isloading: true', () => {
    const getIngredients = jest
      .spyOn(api, 'getIngredientsApi')
      .mockReturnValue(new Promise(() => {}));

    store.dispatch(fetchIngredients());

    const isloading = isLoadingIngredients(store.getState());

    expect(isloading).toBe(true);
  });

  it('Если экшен в состоянии rejected, ошибка зписывается в стор и isloading: false', async () => {
    const errorMessage = 'error';
    const getIngredients = jest
      .spyOn(api, 'getIngredientsApi')
      .mockRejectedValue(errorMessage);

    await store.dispatch(fetchIngredients());

    const error = getState(store.getState()).error;
    const isLoading = isLoadingIngredients(store.getState());

    expect(error).toBe(errorMessage);
    expect(isLoading).toBe(false);
  });

  it('Если экшен в состоянии fulfilled, то isLoading: false и данные записываются в стор', async () => {
    const getIngredients = jest
      .spyOn(api, 'getIngredientsApi')
      .mockResolvedValue(mockIngredients);

    await store.dispatch(fetchIngredients());

    const ingredients = getIngridients(store.getState());
    const isLoading = isLoadingIngredients(store.getState());
    expect(isLoading).toBe(false);
    expect(ingredients).toEqual(mockIngredients);
  });
});
