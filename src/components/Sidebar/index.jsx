/**
 * @version 0.0.1
 * Updated On : October 7, 2024
 * Sidebar for Dashboard
 */

import { Menu } from 'antd';
import { LayoutGrid } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Sidebar = () => {
  const location = useLocation();

  // Set the selected key based on the current pathname
  const getMenuKey = () => {
    if (location.pathname === '/dashboard') return '1';
    return '';
  };

  // Define menu items using the new 'items' prop
  const menuItems = [
    {
      key: '1',
      icon: <LayoutGrid size={22} />,
      label: <Link to={'/dashboard'} />
    }
  ];

  return (
    <div className="w-20 h-screen fixed bg-white shadow-lg flex flex-col items-center">
      {/* Menu Items with Icons */}
      <Menu
        mode="inline"
        selectedKeys={[getMenuKey()]}
        style={{ height: '100%', border: 'none' }}
        items={menuItems}
      />
    </div>
  );
};
