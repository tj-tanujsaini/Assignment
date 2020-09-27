import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaymentDataService } from '../payment-data.service';
import { PaymentDetail } from '../payment.model';

@Component({
  selector: 'app-payment-add',
  templateUrl: './payment-add.component.html',
  styleUrls: ['./payment-add.component.css']
})
export class PaymentAddComponent implements OnInit {

  @ViewChild('payForm', {static: false}) payForm: NgForm; 

  newPayment: PaymentDetail;
  completePaymentData: PaymentDetail[] = [];

  constructor(private paymnetDataService: PaymentDataService) { }

  ngOnInit(): void {
  }

  onSubmit(payForm: NgForm){
    const value = payForm.value;

    this.newPayment = new PaymentDetail( value.PaymentId, 
                                         value.OrderDate,
                                         value.MerchantId,
                                         value.CustomerEmail,
                                         value.Amount,
                                         value.PaymentStatus);

    this.paymnetDataService.addNewPayment(this.newPayment);

    this.completePaymentData = this.paymnetDataService.getPaymentData();
    console.log(this.completePaymentData);

    this.clearForm();
  }

  clearForm(){
    this.payForm.reset();
  }

}
