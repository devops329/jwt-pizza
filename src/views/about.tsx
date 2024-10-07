import React from 'react';
import View from './view';

export default function About() {
  return (
    <View title='The secret sauce'>
      <div className='text-start py-8 px-4 sm:px-6 lg:px-8'>
        <img src='jwt-pizza-logo.png' className='border-solid border-2 border-orange-700 w-64 m-4 float-left' />
        <p className='py-2 text-neutral-100 text-start mx-4 pb-4 first-line:uppercase first-line:tracking-widest  first-letter:text-7xl first-letter:font-bold first-letter:text-orange-800  first-letter:mr-3 first-letter:float-left'>
          At JWT Pizza, our amazing employees are the secret behind our delicious pizzas. They are passionate about their craft and spend every waking moment dreaming about how to make our pizzas even
          better. From selecting the finest ingredients to perfecting the dough and sauce recipes, our employees go above and beyond to ensure the highest quality and taste in every bite. Their
          dedication and attention to detail make all the difference in creating a truly exceptional pizza experience for our customers. We take pride in our team and their commitment to delivering
          the best pizza in town.
        </p>
        <p className='py-2 text-white'>
          Our talented employees at JWT Pizza are true artisans. They pour their heart and soul into every pizza they create, striving for perfection in every aspect. From hand-stretching the dough to
          carefully layering the toppings, they take pride in their work and are constantly seeking ways to elevate the pizza-making process. Their creativity and expertise shine through in every
          slice, resulting in a pizza that is not only delicious but also a work of art. We are grateful for our dedicated team and their unwavering commitment to delivering the most flavorful and
          satisfying pizzas to our valued customers.
        </p>

        <h2 className='py-2 text-2xl sm:text-4xl font-thin text-orange-600'>Our employees</h2>

        <p className='py-2 text-white'>
          JWT Pizza is home to a team of pizza enthusiasts who are truly passionate about their craft. They are constantly experimenting with new flavors, techniques, and ingredients to push the
          boundaries of traditional pizza-making. Their relentless pursuit of perfection is evident in every bite, as they strive to create a pizza experience that is unparalleled. Our employees
          understand that the secret to a great pizza lies in the details, and they leave no stone unturned in their quest for pizza perfection. We are proud to have such dedicated individuals on our
          team, as they are the driving force behind our reputation for exceptional quality and taste.
        </p>
        <div className='flex -space-x-2'>
          <div className='hs-tooltip inline-block'>
            <img
              className='hs-tooltip-toggle relative inline-block size-[96px] rounded-full ring-2 ring-white hover:z-10'
              src='https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
              alt='Employee stock photo'
            />
            <span
              className='hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg'
              role='tooltip'
            >
              James
            </span>
          </div>
          <div className='hs-tooltip inline-block'>
            <img
              className='hs-tooltip-toggle relative inline-block size-[96px] rounded-full ring-2 ring-white hover:z-10'
              src='https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
              alt='Employee stock photo'
            />
            <span
              className='hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg'
              role='tooltip'
            >
              Maria
            </span>
          </div>
          <div className='hs-tooltip inline-block'>
            <img
              className='hs-tooltip-toggle relative inline-block size-[96px] rounded-full ring-2 ring-white hover:z-10'
              src='https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80'
              alt='Employee stock photo'
            />
            <span
              className='hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg'
              role='tooltip'
            >
              Anna
            </span>
          </div>
          <div className='hs-tooltip inline-block'>
            <img
              className='hs-tooltip-toggle relative inline-block size-[96px] rounded-full ring-2 ring-white hover:z-10'
              src='https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
              alt='Employee stock photo'
            />
            <span
              className='hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg'
              role='tooltip'
            >
              Brian
            </span>
          </div>
        </div>
        <p className='py-2 text-white'>
          At JWT Pizza, our employees are more than just pizza makers. They are culinary artists who are deeply passionate about their craft. They approach each pizza with creativity, precision, and a
          genuine love for what they do. From experimenting with unique flavor combinations to perfecting the cooking process, our employees are constantly pushing the boundaries of what a pizza can
          be. Their dedication and expertise result in pizzas that are not only delicious but also a reflection of their passion and commitment. We are grateful for our talented team and the
          incredible pizzas they create day in and day out.
        </p>
      </div>
    </View>
  );
}
