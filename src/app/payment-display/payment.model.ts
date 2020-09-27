//payment model

export class PaymentDetail {
    constructor(
        public paymentId: number,
        public orderDate: string,
        public merchantId: number,
        public customerEmail: string,
        public amount: number,
        public paymentStatus: string,

    ) { }
}