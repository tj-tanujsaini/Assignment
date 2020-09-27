import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { PaymentDetail } from './payment.model'

@Injectable({providedIn: 'root'})
export class PaymentDataService{
    
    paymentDataChanged = new Subject<PaymentDetail[]>();
    rerender = new Subject<PaymentDetail[]>();
    paymentData: PaymentDetail[] = [];

    //Get payment data from app.component.ts on app init
    getPaymentData(){
        return this.paymentData;
    }

    //update the paymnet data
    setPaymentData(paymentDataArray:PaymentDetail[]){
        this.paymentData = paymentDataArray;
        this.paymentDataChanged.next(this.paymentData);
    }

    //add new payment data
    addNewPayment(newPaymnet: PaymentDetail){
        this.paymentData.push(newPaymnet);
        this.paymentDataChanged.next(this.paymentData);

        this.saveToLocalData();
    }

    //update a payment
    updatePayment(payId: number, updatePayment:PaymentDetail){
        const index = this.paymentData.findIndex(x => x.paymentId === payId);
        this.paymentData[index] = updatePayment;
        this.paymentDataChanged.next(this.paymentData);

        this.saveToLocalData();
    }

    //delete payments multiple or single
    deletePayment(paymentId: number[]){
        
        for(let payId of paymentId){
            let index = this.paymentData.findIndex(x => x.paymentId === payId);
            this.paymentData.splice(index, 1);
        }
        this.paymentDataChanged.next(this.paymentData);

        this.saveToLocalData();
    }

    //get a single payment by its paymnetId
    getPaymentById(payId: number): PaymentDetail {
        return this.paymentData.find(payment => payment.paymentId === payId);
    }

    //update data after sorting
    updateSortSearchArray(paymentDataArray:PaymentDetail[]){
        this.paymentDataChanged.next(paymentDataArray);
    }

    //save data to local storage after update
    saveToLocalData(){
        window.localStorage.clear();
        window.localStorage.setItem('localPaymentArray', JSON.stringify(this.paymentData));
    }
}