import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HomeComponent } from './Unauthenticated/home/home.component';

import { CrudService } from './Unauthenticated/shared/crud.service';
import { UserPostComponent } from './user/user-post/user-post.component';
import { ProfileComponent } from './user/profile/profile.component';

import { LoadingSpinnerComponent } from './spinner/loading-spinner/loading-spinner.component';
import { ToastrModule } from 'ngx-toastr';
import { NoSanitizePipe } from './Authentication/shared/no-sanitize.pipe';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserPostComponent,
    ProfileComponent,
    LoadingSpinnerComponent,
    NoSanitizePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()

  ],
  providers: [CrudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
