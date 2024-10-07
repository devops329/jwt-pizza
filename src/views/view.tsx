import React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function View(props: Props) {
  return (
    <>
      <div className="bg-slate-600 flex flex-col justify-center sm:items-center mx-auto">
        <div>
          <div className="text-center flex flex-col justify-between">
            <h2 className="my-1 sm:my-3 text-4xl font-thin sm:text-6xl">
              <span className="bg-clip-text bg-gradient-to-tr from-orange-600 to-orange-400 text-transparent">{props.title}</span>
            </h2>
          </div>

          {props.children}
        </div>
      </div>
    </>
  );
}
