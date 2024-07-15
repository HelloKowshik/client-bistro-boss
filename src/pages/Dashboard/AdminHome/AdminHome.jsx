import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { FaDollarSign, FaUserLarge } from "react-icons/fa6";
import { MdFoodBank } from "react-icons/md";
import { RiCaravanLine } from "react-icons/ri";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, ResponsiveContainer, Legend } from 'recharts'

const AdminHome = () => {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
    const RADIAN = Math.PI / 180;
    const { user } = useAuth();
    const axiosInstance = useAxios();
    const { data: stats=[] } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosInstance.get('/admin-stats');
            return res.data;
        }
    });
    const { data: orderData=[] } = useQuery({
        queryKey: ['order-stats'],
        queryFn: async () => {
            const res = await axiosInstance.get('/order-stats');
            return res.data;
        }
    });
    const getPath = (x, y, width, height) => {
            return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
          y + height / 3
        } 
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
          x + width
        }, ${y + height}
        Z`;
    };
    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;
        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);
            return (
                <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                  {`${(percent * 100).toFixed(0)}%`}
                </text>);
    };
    const pieChartData = orderData.map(order => {
        return {name: order.category, value: order.revenue};
    });

    return(
        <div>
            <h2 className='text-3xl'>
                <span>Hi, Welcome </span>
                {user?.displayName ? user.displayName : 'Back'}
            </h2>
            <div>
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <FaDollarSign className='text-3xl' />
                        </div>
                        <div className="stat-title">Revenue</div>
                        <div className="stat-value">${stats?.revenue}</div>
                        <div className="stat-desc">Jan 1st - Feb 1st</div>
                    </div>
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <FaUserLarge className='text-3xl' />
                        </div>
                        <div className="stat-title">Customers</div>
                        <div className="stat-value">{stats?.users}</div>
                        <div className="stat-desc">↗︎ 400 (22%)</div>
                    </div>
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <MdFoodBank className='text-3xl' />
                        </div>
                        <div className="stat-title">Total Items</div>
                        <div className="stat-value">{stats?.menuItems}</div>
                        <div className="stat-desc">↘︎ 90 (14%)</div>
                    </div>
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <RiCaravanLine className='text-3xl' />
                        </div>
                        <div className="stat-title">Orders</div>
                        <div className="stat-value">{stats?.orders}</div>
                        <div className="stat-desc">↘︎ 90 (14%)</div>
                    </div>
                </div>
            </div>
            <div className='flex my-4'>
                <div className='w-1/2'>
                    <BarChart
                        width={500}
                        height={300}
                        data={orderData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {orderData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % 6]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
                <div className='w-1/2'>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width='100%' height='100%'>
                            <Pie
                              data={pieChartData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={renderCustomizedLabel}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
