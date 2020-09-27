//Routes for the app are Defined here

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentAddComponent } from './payment-display/payment-add/payment-add.component';
import { PaymentDisplayComponent } from './payment-display/payment-display.component';
import { PaymentEditComponent } from './payment-display/payment-edit/payment-edit.component';

const appRoutes: Routes = 
[
    {path: '', redirectTo: '/payments' , pathMatch: 'full'},
    {path: 'payments', component: PaymentDisplayComponent},
    {path: 'addPayment', component: PaymentAddComponent},
    {path: 'editPayment', component: PaymentEditComponent},
]

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports:[RouterModule]
})
export class AppRoutingModule{

}