import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PaymentDisplayComponent } from './payment-display/payment-display.component';
import { PaymentEditComponent } from './payment-display/payment-edit/payment-edit.component';
import { PaymentAddComponent } from './payment-display/payment-add/payment-add.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PaymentDisplayComponent,
    PaymentEditComponent,
    PaymentAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
