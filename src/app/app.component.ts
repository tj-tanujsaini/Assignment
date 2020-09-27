//Main App Module handles the starting of the web app

import { Component, OnInit } from '@angular/core';
import { PaymentDataService } from './payment-display/payment-data.service';
import { PaymentDetail } from './payment-display/payment.model';
import { SampleDataService } from './payment-display/sample-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'FreightFoxAssignment';

  constructor(private paymentService: PaymentDataService,
              private sampleDataService: SampleDataService){}

  ngOnInit(): void{
    //try to fetch payment data from local Storage
    let paymentData: PaymentDetail[] = JSON.parse(window.localStorage.getItem('localPaymentArray'));
    
    if(!paymentData){
      //If paymentData not found on localstorage.. Data will be fetch from SampleDataService()  
      paymentData = this.sampleDataService.getSampleData();
    }

    //Sending the paymentData to PaymentDataService() to be used througout the web app
    this.paymentService.setPaymentData(paymentData);

  }

}

