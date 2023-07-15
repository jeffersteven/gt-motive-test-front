import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-brand-details',
  templateUrl: './brand-details.component.html',
  styleUrls: ['./brand-details.component.sass']
})
export class BrandDetailsComponent implements OnInit {
  brandId: any;
  vehicleTypes: any[] = [];
  vehicleModels: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private router: Router
    ) { }

  ngOnInit() {
    this.brandId = this.route.snapshot.paramMap.get('id');
    this.vehicleService.getVehicleTypes(this.brandId).subscribe((response: any) => {
      this.vehicleTypes = response.Results;
    });
    this.vehicleService.getVehicleModels(this.brandId).subscribe((response: any) => {
      this.vehicleModels = response.Results;
    });
  }

  goHome() {
    this.router.navigate(['brands']);
  }
}
