import React, { useEffect, useState } from 'react';
import { pizzaService } from '../service/service';
import View from './view';
import Card from '../components/card';
import Button from '../components/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { Franchise, Menu, Pizza, Store } from '../service/pizzaService';

export default function Menu() {
  const [order, setOrder] = useState(useLocation().state?.order || { items: [] });
  const [menu, setMenu] = useState<Menu>([]);
  const [storeMap, setStoreMap] = useState<{ [key: string]: { store: Store; franchise: Franchise } }>({});
  const [selectedStore, setSelectedStore] = useState(order.storeId || '');
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const menu = await pizzaService.getMenu();
      setMenu(menu);
      const franchises = await pizzaService.getFranchises();
      const newStoreMap: { [key: string]: { store: Store; franchise: Franchise } } = {};
      franchises.forEach((franchise) => franchise.stores.forEach((store) => (newStoreMap[store.id] = { store, franchise })));
      setStoreMap(newStoreMap);
    })();
  }, []);

  function selectPizza(pizza: Pizza) {
    setOrder({ items: [...order.items, { menuId: pizza.id, description: pizza.title, price: pizza.price }] });
  }

  function checkout(event: React.FormEvent) {
    event.preventDefault();
    if (selectedStore && order.items.length > 0) {
      order.storeId = selectedStore;
      order.franchiseId = storeMap[selectedStore].franchise.id;
      navigate('/payment', { state: { order: order } });
    }
  }

  return (
    <View title="Awesome is a click away">
      <form onSubmit={checkout}>
        <div className="flow flow-col text-center justify-center text-neutral-100  py-8 px-4 sm:px-6 lg:px-8">
          <div className="my-2 sm:my-4">Pick your store and pizzas from below. Remember to order extra for a midnight party.</div>

          <div className="text-neutral-800 py-3">
            <select
              className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-orange-500 focus:ring-orange-500 "
              value={selectedStore}
              required
              onChange={(e) => setSelectedStore(e.target.value)}>
              <option value="">choose store</option>
              {Object.values(storeMap).map((store) => (
                <option key={store.store.id} value={store.store.id}>
                  {store.store.name}
                </option>
              ))}
            </select>
          </div>

          <div className="text-yellow-200">
            {order.items.length > 0 ? 'Selected pizzas: ' + order.items.length : 'What are you waiting for? Pick a store and then add some pizzas!'}
          </div>
          <Button
            title="Checkout"
            submit
            disabled={!selectedStore || order.items.length <= 0}
            className="disabled:bg-neutral-500 disabled:text-neutral-700"
            onPress={() => {}}
          />

          <div className="m-4 grid gap-x-8 gap-y-4 sm:gird-cols-1 md:grid-cols-2 lg:grid-cols-4 xlg:grid-cols-5">
            {menu.map((pizza) => (
              <button
                key={pizza.title}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.add('animate-wobble');
                  selectPizza(pizza);
                }}
                onAnimationEnd={(e) => {
                  e.currentTarget.classList.remove('animate-wobble');
                }}>
                <Card title={pizza.title} description={pizza.description} image={pizza.image} />
              </button>
            ))}
          </div>
        </div>
      </form>
    </View>
  );
}
