import paypal from '@paypal/checkout-server-sdk';

const { PAYPAL_CLIENT_ID: clientId, PAYPAL_SECRET: clientSecret } = process.env;

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

export { client };
