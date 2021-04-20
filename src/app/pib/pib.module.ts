import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryComponent } from './componentes/country/country.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { CountryFormComponent } from './componentes/country-form/country-form.component';
import { CountryDetailsComponent } from './componentes/country-details/country-details.component';
import { AppRoutingModule } from '../app-routing.module';




@NgModule({
  declarations: [CountryComponent, CountryFormComponent, CountryDetailsComponent],
  imports: [CommonModule, NgxPaginationModule, FormsModule, AppRoutingModule],
  exports: [CountryComponent, CountryFormComponent, CountryDetailsComponent]
})
export class PibModule { }
