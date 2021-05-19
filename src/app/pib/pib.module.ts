import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryComponent } from './componentes/country/country.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { CountryFormComponent } from './componentes/country-form/country-form.component';
import { CountryDetailsComponent } from './componentes/country-details/country-details.component';
import { AppRoutingModule } from '../app-routing.module';
import { NotFoundComponent } from './componentes/not-found/not-found.component';




@NgModule({
  declarations: [CountryComponent, CountryFormComponent, CountryDetailsComponent, NotFoundComponent],
  imports: [CommonModule, NgxPaginationModule, FormsModule, AppRoutingModule],
  exports: [CountryComponent, CountryFormComponent, CountryDetailsComponent, NotFoundComponent]
})
export class PibModule { }
