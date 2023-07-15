import * as BrandReducer from './app.reducer';

export interface AppState {
    brands: BrandReducer.BrandState;
}

export const reducers = {
    brands: BrandReducer.brandReducer
};
