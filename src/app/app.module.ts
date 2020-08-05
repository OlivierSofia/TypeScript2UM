import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UmlComponent } from './uml/uml.component';
import {Routes, RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ClassAttributeComponent } from './class-attribute/class-attribute.component';
import { ClassMethodComponent } from './class-method/class-method.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'uml', component: UmlComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UmlComponent,
    ClassAttributeComponent,
    ClassMethodComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
