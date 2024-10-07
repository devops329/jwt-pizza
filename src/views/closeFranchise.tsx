import React from 'react';
import { useLocation } from 'react-router-dom';
import { pizzaService } from '../service/service';
import View from './view';
import Button from '../components/button';
import { useBreadcrumb } from '../hooks/appNavigation';

export default function CloseFranchise() {
  const state = useLocation().state;
  const navigateToParentPath = useBreadcrumb();

  async function close() {
    await pizzaService.closeFranchise(state.franchise);
    navigateToParentPath();
  }

  return (
    <View title='Sorry to see you go'>
      <div className='text-start py-8 px-4 sm:px-6 lg:px-8'>
        <div className='text-neutral-100'>
          Are you sure you want to close the <span className='text-orange-500'>{state.franchise.name}</span> franchise? This will close all associated stores and cannot be restored. All outstanding
          revenue with not be refunded.
        </div>
        <Button title='Close' onPress={close} />
        <Button title='Cancel' onPress={navigateToParentPath} className='bg-transparent border-neutral-300' />
      </div>
    </View>
  );
}
