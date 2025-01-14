import React from 'react';
import View from './view';

export default function NotFound() {
  return (
    <View title='Oops'>
      <div className='text-neutral-100 text-start py-8 px-4 sm:px-6 lg:px-8'>It looks like we have dropped a pizza on the floor. Please try another page.</div>
    </View>
  );
}
