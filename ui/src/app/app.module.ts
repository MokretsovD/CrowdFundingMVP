import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectListComponent } from './projects/project-list.components';
import { RegistrationComponent } from './registration/registration.component';
import { HeaderComponent } from './header.component';
import { FormsModule } from '@angular/forms';
import { ProjectDetailsComponent } from './projects/project-details.components';
import { CustomMinDirective } from './directives/custom-min-validator.directive';
import { CustomMaxDirective } from './directives/custom-max-validator.directive';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    RegistrationComponent,
    HeaderComponent,
    ProjectDetailsComponent,
    CustomMinDirective,
    CustomMaxDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxUiLoaderModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
