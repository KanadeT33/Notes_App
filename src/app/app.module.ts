import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from "@angular/common/http"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoteComponent } from './components/note/note.component';
import { HomeComponent } from './pages/home/home.component';
import {ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateModalComponent } from './components/create-modal/create-modal.component';
import { CommonModule } from '@angular/common';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { RouterModule } from '@angular/router';
import { ArchivedComponent } from './pages/archived/archived.component';
import { LoginComponent } from './pages/login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    NoteComponent,
    HomeComponent,
    CreateModalComponent,
    ArchivedComponent,
    LoginComponent,
    DeleteModalComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    ScrollingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['example.com'],
        disallowedRoutes: ['http://example.com/examplebadroute/'],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
