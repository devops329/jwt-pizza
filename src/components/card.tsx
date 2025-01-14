import React from 'react';

interface Props {
  title: string;
  description: string;
  image: string;
}

export default function Card(props: Props) {
  return (
    <div className="min-w-32 max-w-80">
      <a className="flex flex-col group bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition/[.7]" href="#">
        <div className="relative pt-[50%] sm:pt-[60%] lg:pt-[80%] rounded-t-xl overflow-hidden">
          <img
            className="size-full absolute top-0 start-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-t-xl"
            src={props.image}
            alt="Image Description"
          />
        </div>
        <div className="p-4 md:p-5">
          <h3 className="text-lg font-bold text-gray-800">{props.title}</h3>
          <p className="mt-1 text-gray-500">{props.description}</p>
        </div>
      </a>
    </div>
  );
}
