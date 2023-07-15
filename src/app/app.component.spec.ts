import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
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

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
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
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
