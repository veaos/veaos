import React from 'react';
import { useHistory } from 'react-router-dom';
import { ChatAlt2, UserGroup } from 'heroicons-react';

const items = [
  {
    icon: ChatAlt2,
    label: 'Discussions',
    route: '/',
  },
  {
    icon: UserGroup,
    label: 'Communities',
    route: '/',
  },
];

export const Navigation = () => {
  const history = useHistory();

  return (
    <nav className="min-h-full flex p-6">
      <ul className="w-full">
        {items.map(({ icon, route, label }, i) => (
          <li
            className="flex flex-row items-center h-14 px-4 text-gray-600 rounded-lg hover:bg-gray-100 cursor-pointer"
            key={i}
            onClick={() => {
              history.push(route);
            }}
          >
            {React.createElement(icon, { className: 'h-6 w-6 text-gray-400' })}
            <span className="ml-2">{label}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};
