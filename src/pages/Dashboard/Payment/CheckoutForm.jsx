import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';
import useAxios from '../../../hooks/useAxios';
import useCart from '../../../hooks/useCart';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [error, setError] = useState('');
    const [isPaid, setIsPaid] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const navigate = useNavigate();
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const axiosInstance = useAxios();

    useEffect(() => {
        if(totalPrice > 0){
            axiosInstance.post('/create-payment-intent', {price: totalPrice})
            .then(res => {
                setClientSecret(res.data.clientSecret);
                // console.log(res.data.clientSecret);
            })
        }
    }, [axiosInstance, totalPrice]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!stripe || !elements){
            return;
        }
        const card = elements.getElement(CardElement);
        if(card === null){
            return;
        }
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
        if(error){
            setError(error.message);
            console.log('Payment Error:', error);
        }
        else{
            setError('');
            // console.log('Payment Method:', paymentMethod);
        }
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method:{
                card: card,
                billing_details:{
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });
        if(confirmError) console.log('confirmError:', confirmError);
        else{
            console.log('paymentIntent:', paymentIntent);
            if(paymentIntent.status === 'succeeded'){
                // console.log('Payment Success:', paymentIntent.id);
                setTransactionId(paymentIntent.id);
                const paymentInfo = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuId),
                    status: 'pending'
                };
                const res = await axiosInstance.post('/payments', paymentInfo);
                // console.log('Payment Success Data:', res.data);
                refetch();
                setIsPaid(true);
                if(res.data?.paymentResult?.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Payment Success!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/paymentHistory');
                }
            }
        }
    };

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                  options={{
                   style: {
                    base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                            color: '#aab7c4',
                        },
                    },
                    invalid: {
                        color: '#9e2146',
                        },
                    },
                }}
                />
                <button className='btn btn-sm btn-primary my-4' type="submit" disabled={!stripe || !clientSecret || isPaid}>
                    Pay
                </button>
                <p className='text-red-600'>{error}</p>
                {transactionId && <p className='text-green-600'>Success! Your Transaction ID: {transactionId}</p>}
            </form>
        </div>
    );
};

export default CheckoutForm;
