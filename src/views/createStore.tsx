import React from 'react';
import { useLocation } from 'react-router-dom';
import { useBreadcrumb } from '../hooks/appNavigation';
import { StoreIcon } from '../icons';
import View from './view';

import Button from '../components/button';
import { pizzaService } from '../service/service';
import { Store } from '../service/pizzaService';

export default function CreateStore() {
  const state = useLocation().state;
  const navigateToParentPath = useBreadcrumb();
  const [store, setStore] = React.useState<Store>({ id: '', name: '' });

  async function createStore(event: React.FormEvent) {
    event.preventDefault();
    await pizzaService.createStore(state.franchise, store);
    navigateToParentPath();
  }

  return (
    <View title="Create store">
      <div className="text-start py-8 px-4 sm:px-6 lg:px-8">
        <form onSubmit={createStore}>
          <div className="flex">
            <div className="max-w-sm space-y-3 py-4  flex-1">
              <div className="relative">
                <input
                  type="text"
                  required
                  onChange={(e) => setStore({ ...store, name: e.target.value })}
                  className="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  placeholder="store name"
                />
                <div className="absolute   text-orange-800 inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                  <StoreIcon />
                </div>
              </div>
            </div>
          </div>

          <Button title="Create" submit onPress={() => {}} />
          <Button title="Cancel" onPress={navigateToParentPath} className="bg-transparent border-neutral-300" />
        </form>
      </div>
    </View>
  );
}
