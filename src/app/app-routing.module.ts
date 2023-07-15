import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandListComponent } from './brand-list/brand-list.component';
import { BrandDetailsComponent } from './brand-details/brand-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/brands', pathMatch: 'full' },
  { path: 'brands', component: BrandListComponent },
  { path: 'brands/:id', component: BrandDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
