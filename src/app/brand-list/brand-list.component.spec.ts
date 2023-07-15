import { ComponentFixture } from '@angular/core/testing';
import { BrandListComponent } from './brand-list.component';
import { Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { loadVehicleBrands } from '../store';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

describe('BrandListComponent', () => {
  let component: BrandListComponent;
  let fixture: ComponentFixture<BrandListComponent>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrandListComponent],
      imports: [
        StoreModule.forRoot({}), // Importa el módulo del store de NgRx
        RouterTestingModule,
        MatFormFieldModule,
        ScrollingModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        MatListModule,
        MatTabsModule,
        HttpClientModule, // Aquí puedes proporcionar los reducers y el estado inicial si es necesario
        EffectsModule.forRoot([]), // Aquí puedes proporcionar los efectos si es necesario
        StoreDevtoolsModule.instrument(),
        MatInputModule,
        MatIconModule,
        MatButtonModule, // Importa el módulo de pruebas para el enrutador
      ],
      providers: [
        /* Proveedores necesarios, incluyendo ActivatedRoute */
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ brandId: 440 }),
          },
        },
      ],
    }).compileComponents();

    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // Prueba que la acción loadVehicleBrands se despacha
  it('despacha_la_accion_loadVehicleBrands', () => {
    const storeSpy = spyOn(TestBed.inject(Store), 'dispatch');
    component.ngOnInit();
    expect(storeSpy).toHaveBeenCalledWith(loadVehicleBrands());
  });

  // Prueba que la navegación a la página de detalles de la marca funcione correctamente
  it('navega_a_la_pagina_de_detalles_de_la_marca', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');

    component.navigateToBrandDetails(1);

    expect(spy).toHaveBeenCalledWith(['brands', 1]);
  });

  // Prueba que el array filteredBrands esté vacío cuando el array de marcas esté vacío
  it('array_marcas_vacio', () => {
    component.brands$ = of([]);
    component.ngOnInit();
    expect(component.filteredBrands).toEqual([]);
  });

  // Prueba que el array filteredBrands esté vacío cuando el searchText sea indefinido
  it('texto_busqueda_indefinido', () => {
    component.filterBrands("");
    expect(component.filteredBrands).toEqual([]);
  });
});
