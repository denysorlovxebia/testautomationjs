export type BillingAddress = {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
};

export const DEFAULT_BILLING_ADDRESS: BillingAddress = {
    firstName: 'John',
    lastName: 'Doe',
    address: '98 Test street',
    city: 'Vienna',
    state: 'Vienna',
    postalCode: '1010',
    country: 'Austria',
};
