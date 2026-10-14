import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  navItems: { title: string; to: string; display: string[] }[];
}

export default function Footer(props: Props) {
  const [version, setVersion] = React.useState('');

  React.useEffect(() => {
    fetch('/version.json')
      .then((response) => response.json())
      .then((data) => setVersion(data.version));
  }, []);

  return (
    <footer className="m-8 flex justify-center">
      <div className="container border-t-2 border-white max-w-3xl">
        <nav className="-mb-0.5 flex space-x-6 justify-between">
          {props.navItems.map(
            (item) =>
              item.display.includes('footer') && (
                <NavLink
                  key={item.title}
                  className=" py-4 px-1 inline-flex items-center gap-2 text-sm whitespace-nowrap text-white hover:text-dominos-midnight focus:text-dominos-midnight"
                  to={item.to}>
                  {item.title}
                </NavLink>
              )
          )}
        </nav>
        <p className="text-sm text-center italic text-white">© 2024 JWT Pizza LTD. All rights reserved. Version: {version}</p>
      </div>
    </footer>
  );
}
