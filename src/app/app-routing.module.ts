import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryFormComponent } from './pib/componentes/country-form/country-form.component';
import { CountryComponent } from './pib/componentes/country/country.component';
import { CountryDetailsComponent } from './pib/componentes/country-details/country-details.component';
import { NotFoundComponent } from './pib/componentes/not-found/not-found.component';

const routes: Routes = [
  {path: "", component: CountryComponent},
  {path: "edit/:code", component: CountryFormComponent},
  {path: "countries/:code", component: CountryDetailsComponent},
  {path: "**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
