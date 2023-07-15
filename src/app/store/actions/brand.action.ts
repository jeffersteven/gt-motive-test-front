import { createAction, props } from '@ngrx/store';

export const loadVehicleBrands = createAction('[Vehicle] Load Brands');
export const loadVehicleBrandsSuccess = createAction('[Vehicle] Load Brands Success', props<{ brands: any[] }>());
export const loadVehicleBrandsFailure = createAction('[Vehicle] Load Brands Failure', props<{ error: any }>());

export const loadVehicleTypes = createAction('[Vehicle] Load Types', props<{ brandId: string }>());
export const loadVehicleTypesSuccess = createAction('[Vehicle] Load Types Success', props<{ types: any[] }>());
export const loadVehicleTypesFailure = createAction('[Vehicle] Load Types Failure', props<{ error: any }>());

export const loadVehicleModels = createAction('[Vehicle] Load Models', props<{ brandId: string }>());
export const loadVehicleModelsSuccess = createAction('[Vehicle] Load Models Success', props<{ models: any[] }>());
export const loadVehicleModelsFailure = createAction('[Vehicle] Load Models Failure', props<{ error: any }>());
