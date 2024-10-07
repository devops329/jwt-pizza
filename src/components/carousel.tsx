import React from 'react';

interface Props {
  slides: React.ReactNode[];
}

export default function Carousel(props: Props) {
  return (
    <div data-hs-carousel='{"loadingClasses": "opacity-0","isAutoPlay": true}' className="relative m-4 min-w-[90%]">
      <div className="hs-carousel relative overflow-hidden w-full min-w-[100%] min-h-[125px] bg-white rounded-lg">
        <div className="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700 opacity-0">
          {props.slides.map((slide, index) => (
            <div className="hs-carousel-slide" key={index}>
              {slide}
            </div>
          ))}
        </div>
      </div>

      <div className="hs-carousel-pagination flex justify-center absolute bottom-3 start-0 end-0 space-x-2">
        {props.slides.map((_, index) => (
          <span
            key={index}
            className="hs-carousel-active:bg-blue-700 hs-carousel-active:border-blue-700 size-3 border border-gray-400 rounded-full cursor-pointer"></span>
        ))}
      </div>
    </div>
  );
}
