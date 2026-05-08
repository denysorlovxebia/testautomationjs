export type PaymentDetails = {
    cardNumber: string;
    expirationDate: string;
    cvv: string;
    cardholderName: string;
};

export const DEFAULT_PAYMENT_CARD_NUMBER = '1111-1111-1111-1111';
export const DEFAULT_PAYMENT_CVV = '111';
export const DEFAULT_PAYMENT_CARDHOLDER = 'John Doe';
