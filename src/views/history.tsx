import React from 'react';
import View from './view';

export default function History() {
  return (
    <View title='Mama Rucci, my my'>
      <div className='text-neutral-100 text-start py-8 px-4 sm:px-6 lg:px-8'>
        <img src='mamaRicci.png' className='w-64 m-4 float-right' />
        <div>
          It all started in Mama Ricci's kitchen. She would delight all of the cousins with a hot pie in any style they could think of Milanese, Chicago deep dish, Detroit square pan, Neapolitan, or
          even fusion flatbread.
          <p className='py-2'>
            Pizza has a long and rich history that dates back thousands of years. Its origins can be traced back to ancient civilizations such as the Egyptians, Greeks, and Romans. The ancient
            Egyptians were known to bake flatbreads topped with various ingredients, similar to modern-day pizza. In ancient Greece, they had a dish called "plakous" which consisted of flatbread
            topped with olive oil, herbs, and cheese.
          </p>
          <p className='py-2'>However, it was the Romans who truly popularized pizza-like dishes. They would top their flatbreads with various ingredients such as cheese, honey, and bay leaves.</p>
          <p className='py-2'>
            Fast forward to the 18th century in Naples, Italy, where the modern pizza as we know it today was born. Neapolitan pizza was typically topped with tomatoes, mozzarella cheese, and basil.
            It quickly became a favorite among the working class due to its affordability and delicious taste. In the late 19th century, pizza made its way to the United States through Italian
            immigrants.
          </p>
          <p className='py-2'>
            It gained popularity in cities like New York and Chicago, where pizzerias started popping up. Today, pizza is enjoyed worldwide and comes in countless variations and flavors. However, the
            classic Neapolitan pizza is still a favorite among many pizza enthusiasts. This is especially true if it comes from JWT Pizza!
          </p>
        </div>
      </div>
    </View>
  );
}
