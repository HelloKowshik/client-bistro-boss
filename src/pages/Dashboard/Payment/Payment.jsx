import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import {loadStripe} from '@stripe/stripe-js';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm.jsx';


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

const Payment = () => {
    return(
        <div>
            <SectionTitle heading='Payment' subHeading='Pay to Eat' />
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
