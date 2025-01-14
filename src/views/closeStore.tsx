import React from 'react';
import { useLocation } from 'react-router-dom';
import { useBreadcrumb } from '../hooks/appNavigation';
import { pizzaService } from '../service/service';
import View from './view';
import Button from '../components/button';

export default function CloseStore() {
  const state = useLocation().state;
  const navigateToParent = useBreadcrumb();

  async function close() {
    await pizzaService.closeStore(state.franchise, state.store);
    navigateToParent();
  }

  return (
    <View title='Sorry to see you go'>
      <div className='text-start py-8 px-4 sm:px-6 lg:px-8'>
        <div className='text-neutral-100'>
          Are you sure you want to close the <span className='text-orange-500'>{state.franchise.name}</span> store <span className='text-orange-500'>{state.store.name}</span> ? This cannot be
          restored. All outstanding revenue with not be refunded.
        </div>
        <Button title='Close' onPress={close} />
        <Button title='Cancel' onPress={navigateToParent} className='bg-transparent border-neutral-300' />
      </div>
    </View>
  );
}
