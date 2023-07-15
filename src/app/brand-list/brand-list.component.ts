import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { loadVehicleBrands } from '../store/actions/brand.action';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, take } from 'rxjs/operators';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { FormControl, FormGroup } from '@angular/forms';

interface Brand {
  Make_ID: number;
  Make_Name: string;
}

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.sass']
})
export class BrandListComponent implements OnInit {
  brands$: Observable<Brand[]>;
  searchText = '';
  filteredBrands: Brand[] = [];
  searchTextChanged = new Subject<string>();
  vehicleBrands: Brand[] = [];
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;
  itemSize = 50;
  form: FormGroup = new FormGroup({
    searchText: new FormControl(),
  });

  constructor(
    private store: Store<any>,
    private router: Router
  ) {
    this.brands$ = this.store.pipe(select((state: any) => state.brands.brands));
  }

  // Método ngOnInit
  ngOnInit() {
    this.store.dispatch(loadVehicleBrands());

    this.brands$?.pipe(
      filter(brands => !!brands) // Filtra los valores falsy (undefined, null, etc.)
    ).subscribe((brands: Brand[]) => {
      this.vehicleBrands = brands; // Asigna los datos de las marcas a la propiedad vehicleBrands
      this.filterBrands(this.searchText);
    });

    this.searchTextChanged.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((searchText: string) => {
      this.filterBrands(searchText);
    });
  }
  // Método para filtrar marcas
  filterBrands(searchText: string) {
    console.log("prueba1");
    this.brands$?.pipe(
      take(1)
    ).subscribe((brands: Brand[]) => {
      console.log("prueba2");
      if (!brands) {
        this.filteredBrands = [];
      } else if (!searchText) {
        this.filteredBrands = [...brands];
      } else {
        this.filteredBrands = brands.filter(brand =>
          brand.Make_Name.toLowerCase().includes(searchText.toLowerCase())
        );
      }
      this.viewport?.scrollToIndex(0); // Vuelve a la posición inicial
    });
  }

  // Método para manejar cambios en el campo de búsqueda
  onSearchChange(event: any) {
    const searchText = event.target.value;
    this.filterBrands(searchText);
  }

  navigateToBrandDetails(brandId: number) {
    this.router.navigate(['brands', brandId]);
  }
}
