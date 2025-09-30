import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

interface burgerIngredients {
  constructorIngridients: TConstructorIngredient[];
  bun: TConstructorIngredient | null;
}

const initialState: burgerIngredients = {
  constructorIngridients: [],
  bun: null
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBun: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.bun = action.payload;
      },
      prepare: (ingredient) => ({ payload: { ...ingredient, id: nanoid() } })
    },
    addIngridient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient[]>) => {
        state.constructorIngridients.push(...action.payload);
      },
      prepare: (ingridient: TIngredient, count: number = 1) => {
        const ingredients = Array.from({ length: count }, () => ({
          ...ingridient,
          id: nanoid()
        }));

        return { payload: ingredients };
      }
    },
    removeIngridient: (state, action: PayloadAction<string>) => {
      state.constructorIngridients = state.constructorIngridients.filter(
        (ingridient) => ingridient.id !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;
      const [movedIngredient] = state.constructorIngridients.splice(from, 1);
      state.constructorIngridients.splice(to, 0, movedIngredient);
    },
    clearConstructorItems: (state) => {
      state.bun = null;
      state.constructorIngridients = [];
    }
  },
  selectors: {
    getState: (state) => state,
    getPrice: (state) => ({
      totalPrice: state.constructorIngridients.reduce(
        (acc, item) => (acc += item.price),
        0
      )
    }),
    getBun: (state) => state.bun
  }
});

export const {
  addIngridient,
  removeIngridient,
  addBun,
  moveIngredient,
  clearConstructorItems
} = burgerConstructorSlice.actions;
export const { getState, getPrice, getBun } = burgerConstructorSlice.selectors;
export default burgerConstructorSlice;
