//edit a single payment

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentDataService } from '../payment-data.service';
import { PaymentDetail } from '../payment.model';

@Component({
  selector: 'app-payment-edit',
  templateUrl: './payment-edit.component.html',
  styleUrls: ['./payment-edit.component.css']
})
export class PaymentEditComponent implements OnInit {

  updatePayment: PaymentDetail;
  completePaymentData: PaymentDetail[] = [];
  payIndex;
  orderDate: Date;  

  constructor(private paymnetDataService: PaymentDataService,
              private activatedRoute: ActivatedRoute,
              private router:Router ) { }

  ngOnInit(): void {
    //Import data from paymentservice by paymnetId
    this.activatedRoute.queryParams.subscribe(params =>{
      this.payIndex = JSON.parse(params["paymentId"]);
    });
    this.updatePayment = this.paymnetDataService.getPaymentById(this.payIndex);
    this.orderDate = new Date(Date.parse(this.updatePayment.orderDate));
  }

  //submit after editing the values
  onSubmit(payForm: NgForm){
    const value = payForm.value;

    this.updatePayment = new PaymentDetail( value.PaymentId, 
                                         value.OrderDate,
                                         value.MerchantId,
                                         value.CustomerEmail,
                                         value.Amount,
                                         value.PaymentStatus);

    this.paymnetDataService.updatePayment(this.payIndex, this.updatePayment);

    this.router.navigate(['payments']);
  }

}
