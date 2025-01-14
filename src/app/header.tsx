import React from 'react';
import { NavLink } from 'react-router-dom';
import { HamburgerIcon, CloseIcon } from '../icons';
import { User } from '../service/pizzaService';

interface Props {
  user: User | null;
  navItems: { title: string; to: string; display: string[]; constraints?: (() => boolean)[] }[];
}

export default function Header(props: Props) {
  function validateConstraints(constraints: (() => boolean)[]) {
    return constraints.every((c) => c());
  }

  function generateUserText(user: User) {
    const names = user?.name?.split(' ') || ['?'];
    return names.length > 1 ? names[0].charAt(0) + names[names.length - 1].charAt(0) : names[0].charAt(0);
  }

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-gray-800 text-sm py-4">
        <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
          <div className="flex items-center justify-between">
            <img className="w-10 m-3" src="/jwt-pizza-icon.png" />
            <span className="font-normal flex-none text-4xl bg-clip-text bg-gradient-to-tr from-orange-500 to-orange-300 text-transparent">JWT Pizza</span>
            <div className="sm:hidden">
              <button
                type="button"
                className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-lg border border-gray-700 font-medium bg-gray-800 text-gray-400 shadow-sm align-middle hover:bg-gray-700/[.25] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-600 transition-all text-sm"
                data-hs-collapse="#navbar-dark"
              >
                <HamburgerIcon className="hs-collapse-open:hidden" />
                <CloseIcon className="hs-collapse-open:block hidden" />
              </button>
            </div>
          </div>
          <div id="navbar-dark" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block">
            <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
              {props.navItems.map((item) => {
                return (
                  item.display.includes('nav') &&
                  (!item.constraints || validateConstraints(item.constraints)) && (
                    <NavLink key={item.title} className="font-medium text-gray-400  focus:text-orange-600" to={item.to.replace(':subPath?/', '')}>
                      {item.title}
                    </NavLink>
                  )
                );
              })}
            </div>
          </div>
          {props.user && (
            <NavLink className="font-medium text-gray-400  focus:text-orange-600" to="diner-dashboard">
              <div className="hs-tooltip inline-block  [--placement:bottom]">
                <div className="hs-tooltip-toggle pl-4 font-semibold text-orange-400">
                  <span className="inline-flex items-center justify-center size-[30px] rounded-full bg-orange-800 font-semibold text-white leading-none">
                    {generateUserText(props.user)}
                  </span>
                </div>
              </div>
            </NavLink>
          )}
        </nav>
      </header>
    </div>
  );
}
