/**
 * @version 0.0.1
 * Updated On : Oct 21, 2024
 * This is user wrapper component.
 */

import { Sidebar } from 'src/components';
import { Header } from 'src/components/Header';

export const UserWrapper = ({ children }) => {
  return (
    <div className="bg-body-bg pb-3 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-lg px-5 sticky top-0 z-10">
        <Header />
      </div>
      <div className="flex max-w-screen-4xl">
        {/*  Sidebar */}
        <Sidebar />

        {/* Content */}
        <div className="flex-1 p-5 ml-20">{children}</div>
      </div>
    </div>
  );
};
