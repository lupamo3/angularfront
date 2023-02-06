import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";

import { UserPostComponent } from "./user/user-post/user-post.component";
import { ProfileComponent } from "./user/profile/profile.component";

import { ToastrModule } from 'ngx-toastr';
import { NoSanitizePipe } from "./Authentication/shared/no-sanitize.pipe";

@NgModule({
  declarations: [
    AppComponent,
    UserPostComponent,
    ProfileComponent,
    NoSanitizePipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
