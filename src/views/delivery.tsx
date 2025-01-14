import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/button';
import View from './view';
import { pizzaService } from '../service/service';
import { CloseIcon } from '../icons';
import { HSOverlay } from 'preline';
import { JWTPayload, Order } from '../service/pizzaService';

export default function Delivery() {
  const navigate = useNavigate();
  const location = useLocation();
  const order: Order = location.state?.order || { pizzas: [] };
  const jwt: string = location.state?.jwt || 'error';
  const [jwtPayload, setJwtPayload] = React.useState<JWTPayload>({ message: 'invalid', payload: "{ error: 'invalid JWT' }" });

  async function verify() {
    try {
      const r = await pizzaService.verifyOrder(jwt);
      setJwtPayload(r);
    } catch (e: any) {
      setJwtPayload({ ...e, payload: { error: 'invalid JWT. Looks like you have a bad pizza!' } });
    }
    HSOverlay.open(document.getElementById('hs-jwt-modal')!);
  }

  return (
    <View title="Here is your JWT Pizza!">
      <div className="my-4 flex max-w-xl justify-center items-center flex-col  py-8 px-4 sm:px-6 lg:px-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth=".25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-64 h-64 text-yellow-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
        </svg>

        <div>
          <Button className="bg-transparent border-white" title="Verify" onPress={() => verify()} />
          <Button title="Order more" onPress={() => navigate('/menu')} />
        </div>

        <div className="my-4 text-lg text-orange-200 text-start grid grid-cols-5 gap-2">
          <div className="font-semibold text-orange-400">order ID:</div> <div className="col-span-4">{order.id}</div>
          <div className="font-semibold text-orange-400">pie count:</div> <div className="col-span-4">{order.items?.length}</div>
          <div className="font-semibold text-orange-400">total:</div>{' '}
          <div className="col-span-4">{order.items?.reduce((a: number, c: any) => a + c.price, 0).toLocaleString()} ₿</div>
        </div>

        <div
          className={`font-thin break-all font-mono text-xs bg-slate-100 p-2 ${jwtPayload.message === 'valid' ? 'text-green-500' : 'text-red-500'}`}>
          {jwt}
        </div>
      </div>

      <div id="hs-jwt-modal" className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none">
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
          <div className="w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto   ">
            <div className="flex justify-between items-center py-3 px-4 border-b bg-slate-200 rounded-t-xl ">
              <h3 className="font-bold text-gray-800">
                JWT Pizza - <span className={jwtPayload.message === 'valid' ? 'text-green-800' : 'text-red-800'}>{jwtPayload.message}</span>
              </h3>
              <button
                type="button"
                className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none  "
                data-hs-overlay="#hs-jwt-modal">
                <CloseIcon className="" />
              </button>
            </div>
            <div className="p-4 overflow-y-scroll max-h-52">
              <pre className="text-gray-800 text-xs">{JSON.stringify(jwtPayload.payload, null, 2)}</pre>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t  bg-slate-200 rounded-b-xl">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none    "
                data-hs-overlay="#hs-jwt-modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </View>
  );
}
