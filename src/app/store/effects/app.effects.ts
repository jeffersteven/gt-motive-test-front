import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { VehicleService } from '../../services/vehicle.service';
import { loadVehicleBrands, loadVehicleBrandsSuccess, loadVehicleBrandsFailure } from '../actions/brand.action';

@Injectable()
export class BrandEffects {
  loadVehicleBrands$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadVehicleBrands),
      mergeMap(() =>
        this.vehicleService.getVehicleBrands().pipe(
          map((response: any) => {
            return loadVehicleBrandsSuccess({ brands: response.Results });
          }),
          catchError((error: any) => of(loadVehicleBrandsFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private vehicleService: VehicleService) {}
}
