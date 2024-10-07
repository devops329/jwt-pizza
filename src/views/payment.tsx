import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import View from './view';
import Button from '../components/button';
import { pizzaService } from '../service/service';
import { Order, OrderItem } from '../service/pizzaService';

export default function Payment() {
  const [errMessage, setErrorMessage] = React.useState('');
  const location = useLocation();
  const order: Order = location.state?.order || { items: [] };
  const navigate = useNavigate();

  React.useEffect(() => {
    (async () => {
      const user = await pizzaService.getUser();
      if (!user) {
        const loginPath = location.pathname + '/login';
        navigate(loginPath, { state: location.state });
      }
    })();
  }, []);

  async function processPayment() {
    try {
      const confirmation = await pizzaService.order(order);
      navigate('/delivery', { state: { order: confirmation.order, jwt: confirmation.jwt } });
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  }

  function cancel() {
    navigate('/menu', { state: { order: order } });
  }

  return (
    <View title="So worth it">
      <div className="flex flex-col justify-center items-center py-8 px-4 sm:px-6 lg:px-8">
        {errMessage && <div className="text-orange-700 bg-yellow-100 p-2 rounded-md">⚠️ {errMessage}</div>}
        {!errMessage && order.items.length === 1 && <div className="text-neutral-100  p-2 rounded-md">Send me that pizza right now!</div>}
        {!errMessage && order.items.length > 1 && (
          <div className="text-neutral-100 p-2 rounded-md">Send me those {order.items.length} pizzas right now!</div>
        )}
        <div>
          <Button title="Pay now" onPress={processPayment} />
          <Button title="Cancel" onPress={cancel} className="bg-transparent border-neutral-300" />
        </div>
        <div className="bg-neutral-100 overflow-clip my-4">
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="text-neutral-100 bg-slate-400 border-b-2 border-gray-500">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-start text-xs sm:text-sm font-medium">
                          Pie
                        </th>
                        <th scope="col" className="px-6 py-3 text-start text-xs sm:text-sm font-medium">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {order.items.map((item: OrderItem, index: number) => (
                        <tr key={index} className="hover:bg-gray-100">
                          <td className="px-6 py-4 whitespace-nowrap text-start text-xs sm:text-sm font-medium text-gray-800">{item.description}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-start text-xs sm:text-sm text-gray-800">{item.price.toLocaleString()} ₿</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-orange-200 border-t-2 border-red-500">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {order.items.length} pie{order.items.length > 1 ? 's' : ''}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {order.items.reduce((a: any, c: any) => a + c.price, 0).toLocaleString()} ₿
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </View>
  );
}
