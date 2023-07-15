import { createReducer, on } from '@ngrx/store';
import { loadVehicleBrands, loadVehicleBrandsSuccess, loadVehicleBrandsFailure } from '../actions/brand.action';

export interface BrandState {
  brands: any[];
  loading: boolean;
  error: any;
}

export const initialState: BrandState = {
  brands: [],
  loading: false,
  error: null
};

export const brandReducer = createReducer(
  initialState,
  on(loadVehicleBrands, (state) => ({
    ...state,
    loading: true
  })),
  on(loadVehicleBrandsSuccess, (state, { brands }) => {
    return {
      ...state,
      brands,
      loading: false,
      error: null
    };
  }),
  on(loadVehicleBrandsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

export const getCustomers = (state: BrandState) => state.brands;
