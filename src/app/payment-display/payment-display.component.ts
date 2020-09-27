//handles the display of Payment information page

import { Component, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PaymentDataService } from './payment-data.service';

import { PaymentDetail } from './payment.model'

@Component({
  selector: 'app-payment-display',
  templateUrl: './payment-display.component.html',
  styleUrls: ['./payment-display.component.css']
})
export class PaymentDisplayComponent implements OnInit, OnDestroy {

  // varibale declaration
  start: number = 0;              //index of first display paymnet on page
  paymentNumbers: number;         //Number of total payments
  noOfResults: number = 10;       //no of results per page
  end: number;                    //last index of display payment on page
  pageNumber = 1;                 //current page number
  editPayment: number[] = [];     //array of indexs of selected payments for delete or edit 

  //used for sorting ..
  ascending={
    'paymentId': true,
    'orderDate': true,
    'merchantId': true,
    'customerEmail': true,
    'amount': true,
    'paymentStatus': true,
  }

  paymentData: PaymentDetail[] = [];          //Array of Payment Data displayed on screen
  completePaymentData: PaymentDetail[] = [];  //Array of complete Payment Data

  paySubscription: Subscription;  

  constructor(private paymentService:PaymentDataService,
              private router: Router) { }

  ngOnInit(): void {

    this.paySubscription = this.paymentService.paymentDataChanged
                        .subscribe((paymentDataSub: PaymentDetail[])=>{
      // callback from PaymentService when data is changed
      this.paymentData = [];
      this.completePaymentData = paymentDataSub;
      this.paymentNumbers = this.completePaymentData.length;
      this.start=0;
      this.pageNumber = 1;
      this.end = this.noOfResults;
      this.paymentData = this.completePaymentData.slice(this.start, this.end);
    });
    
    //Initialization of Data at first data.. getting values from PaymentService
    this.completePaymentData = this.paymentService.getPaymentData();
    this.paymentNumbers = this.completePaymentData.length;
    this.end = this.noOfResults;
    this.paymentData = this.completePaymentData.slice(this.start, this.end);
  }

  onSubmit(pageForm: NgForm){
    
    //Change number of Results per Page
    this.noOfResults = pageForm.value.noOfResults;
    console.log(this.noOfResults);
    
    this.paymentNumbers = this.completePaymentData.length;
    
    //Reset values for start and end 
    this.start = 0;
    this.pageNumber = 1;
    this.end = this.noOfResults;
    this.showFirstPage();
  }

  //method to go on first Page
  showFirstPage(){
    this.start = 0;
    this.end = this.noOfResults;
    this.paymentData = this.completePaymentData.slice(this.start, this.end);
    this.pageNumber = (this.start/this.noOfResults) + 1 ;
    
  }
  
  //method to show previous page 
  showPreviousPage(){
    this.start = this.start - this.noOfResults;
    this.end = this.start + this.noOfResults;
    this.paymentData = this.completePaymentData.slice(this.start, this.end);
    this.pageNumber = (this.start/this.noOfResults) + 1 ;
    
  }
  
  //method to show next page 
  showNextPage(){
    this.start = this.end;
    this.end = this.start + this.noOfResults;
    this.paymentData = this.completePaymentData.slice(this.start, this.end);
    this.pageNumber = (this.start/this.noOfResults) + 1 ;
  }

  //method to show last page 
  showLastPage(){
    this.start = (this.paymentNumbers % this.noOfResults === 0) 
                  ? (this.paymentNumbers - this.noOfResults) : this.paymentNumbers - ( this.paymentNumbers % this.noOfResults );
    
    this.pageNumber = (this.start/this.noOfResults) + 1 ;
    this.end = this.paymentNumbers;
    console.log(this.start, this.end, this.pageNumber);
    this.paymentData = this.completePaymentData.slice(this.start, this.end);
  }

  //this method is call every time a user check the box next to payment
  //the payment index will be added to the editPayment array
  onCheckBoxChange(payment: number){

    const exist = this.editPayment.indexOf(payment);  //it will check if index is alredy in the array
    
    //index will be removed if box is unchecked otherwise will be added
    if(exist !== -1){
      this.editPayment.splice(exist, 1);
    }else{
      this.editPayment.push(payment);
    }

    console.log(this.editPayment);
  }

  //this function is called if only one checkbox is selected and user will be redirected
  //to the edit payment route 
  editPaymentMethod(){
    let paymentId = this.editPayment[0];
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "paymentId": JSON.stringify(paymentId)
      }
    };

    this.router.navigate(["editPayment"],  navigationExtras);
  }

  //delete the selected 
  deletePaymentMethod(){
    this.paymentService.deletePayment(this.editPayment);
  
    this.editPayment = [];
  }

  ngOnDestroy(){
    this.paySubscription.unsubscribe();
  }

  //Sort by ascending and Decending
  sortMethod(colName:string){
    this.ascending[colName] = !this.ascending[colName]; //change the short method of asc
    let arr: PaymentDetail[] = this.completePaymentData;
    let col = colName;
    let asc = this.ascending[colName];
    let len = arr.length;
    let i;
    let j;
  
    if(asc === true){
      for (i=0; i < len; i++){
        for (j=0 ; j < len-1; j++){
          if (arr[j][col] > arr[j+1][col]){
            let temp = arr[j];
            arr[j] = arr[j+1];
            arr[j+1] = temp;
          }
        }
    }
    }else
      for (i=0; i < len; i++){
        for (j=0; j < len-1; j++){
          if (arr[j][col] < arr[j+1][col]){
            let temp = arr[j];
            arr[j] = arr[j+1];
            arr[j+1] = temp;
          }
        }
      }

      this.completePaymentData = arr;
      this.paymentService.updateSortSearchArray(arr);
  }

  //search method
  onSearch(searchForm: NgForm){

    this.pageNumber = 1;
    const value = searchForm.value.searchBar;
    let array = this.completePaymentData;
    let temp_array = [];
    for (let index = 0; index < array.length; index++) {
      for (let key in array[index]){
        if(value === array[index][key].toString()){
          temp_array.push(array[index]);
        }
      }
    }
    this.completePaymentData = temp_array;
    this.paymentService.updateSortSearchArray(temp_array);
  }

  //filter on input Data
  onFilter(filterForm: NgForm){
    this.pageNumber = 1;
    const value = filterForm.value.Filter;
    const startDate:Date = new Date(Date.parse(filterForm.value.StartDate));
    const endDate:Date = new Date(Date.parse(filterForm.value.EndDate));
    let array = this.completePaymentData;
    let temp_array = [];
    for (let index = 0; index < array.length; index++) {
        if(value === array[index].paymentStatus.toString()){
          const OrderDate:Date = new Date(Date.parse(array[index].orderDate));
          if(OrderDate <= endDate && OrderDate >=startDate){
            console.log("true");
            temp_array.push(array[index]);
          }
          
        }
    }

    this.completePaymentData = temp_array;
    this.paymentService.updateSortSearchArray(temp_array);
  }

}
