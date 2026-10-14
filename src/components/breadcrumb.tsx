import React from 'react';
import { NavLink } from 'react-router-dom';
import { HouseIcon, GreaterThanIcon } from '../icons';

interface Props {
  location: string;
}

export default function Breadcrumb(props: Props) {
  let currentPath = '';
  const paths = props.location.split('/').map((path) => {
    currentPath += '/' + path;
    return (
      <li key={path} className="inline-flex items-center text-sm font-semibold text-dominos-gray-900 truncate" aria-current="page">
        <GreaterThanIcon />

        <NavLink className="flex items-center text-sm text-dominos-gray-700 hover:text-dominos-link focus:outline-none focus:text-dominos-link" to={currentPath}>
          {path}
        </NavLink>
      </li>
    );
  });
  return (
    <ol className="flex items-center whitespace-nowrap py-2 px-4 bg-dominos-gray-200">
      <li className="inline-flex items-center">
        <NavLink className="flex items-center text-sm text-dominos-gray-700 hover:text-dominos-link focus:outline-none focus:text-dominos-link" to="/">
          <span className="mx-1">
            <HouseIcon />
          </span>
          home
        </NavLink>
      </li>
      {location && paths}
    </ol>
  );
}
