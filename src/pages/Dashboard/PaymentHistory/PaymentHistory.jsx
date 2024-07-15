import useAxios from '../../../hooks/useAxios';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();
    const {data: payments=[]} = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async() => {
            const res = await axiosInstance.get(`/payments/${user.email}`);
            return res.data;
        }
    });
    return(
        <div>
            <h2 className='text-4xl'>Total Payments: {payments.length}</h2>
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr className="bg-base-200">
                    <th>#</th>
                    <th>Email</th>
                    <th>Price</th>
                    <th>Transaction ID</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                {
                    payments.map((payment, i)=> <tr key={payment._id}>
                    <th>{i + 1}</th>
                    <td>{payment.email}</td>
                    <td>${payment.price}</td>
                    <td>{payment.transactionId}</td>
                    <td>{payment.date}</td>
                    <td>{payment.status}</td>
                  </tr>)
                }
                </tbody>
              </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
