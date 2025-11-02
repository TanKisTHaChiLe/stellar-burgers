import { expect, test, describe, jest } from '@jest/globals';
import {
  reducer,
  addIngridient,
  removeIngridient,
  moveIngredient
} from './burgerConstructorSlice';
import { configureStore } from '@reduxjs/toolkit';
import { EnhancedStore } from '@reduxjs/toolkit';

const mockIngredient = {
  _id: '643d69a5c3f7b9001cfa0944',
  id: '3',
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
};

const mockIngredients = [
  {
    _id: '643d69a5c3f7b9001cfa0941',
    id: '1',
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
    id: '2',
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
    id: '3',
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

const sortIngredients = [
  {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    id: '2',
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
    _id: '643d69a5c3f7b9001cfa0941',
    id: '1',
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
    _id: '643d69a5c3f7b9001cfa0944',
    id: '3',
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

describe('Тестирование burgerConstructorSlice', () => {
  let constructorStore: EnhancedStore;

  const initialState = {
    burgerConstructor: {
      constructorIngridients: mockIngredients,
      bun: null
    }
  };

  beforeEach(() => {
    constructorStore = configureStore({
      reducer: {
        burgerConstructor: reducer
      },
      preloadedState: initialState
    });
  });
  it('Тест addIngridient, который добавляет ингредиент в массив', () => {
    constructorStore.dispatch(addIngridient(mockIngredient));
    const state = constructorStore.getState();

    expect(state.burgerConstructor.constructorIngridients.length).toBe(4);
  });

  it('Тест removeIngridient, который удаляет элемент', () => {
    constructorStore.dispatch(removeIngridient(mockIngredient.id));
    const state = constructorStore.getState();

    expect(state.burgerConstructor.constructorIngridients.length).toBe(2);
  });

  it('Тест moveIngredient, который меняет ингредиенты местами', () => {
    constructorStore.dispatch(moveIngredient({ from: 0, to: 1 }));
    const state = constructorStore.getState();

    expect(state.burgerConstructor.constructorIngridients).toEqual(
      sortIngredients
    );
  });
});
