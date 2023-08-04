import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchivedComponent } from './pages/archived/archived.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'archived',component:ArchivedComponent},
  {path:'login',component:LoginComponent},
  {path:'**',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
