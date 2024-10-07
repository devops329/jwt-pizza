import React from 'react';

interface Props {
  image: string;
}

export default function Slide(props: Props) {
  return (
    <div className="flex justify-center h-full bg-transparent p-6">
      <span className="self-center text-4xl transition duration-700">
        <img className="rounded-xl" src={props.image} />
      </span>
    </div>
  );
}
