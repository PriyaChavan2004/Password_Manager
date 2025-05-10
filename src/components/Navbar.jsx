import React from 'react';

const Navbar = () => {
  

  return (
    <nav className="bg-slate-900">
      <div className="flex justify-between items-center px-10 py-5">
        {/* Logo and Title */}
        <div className="flex items-center space-x-2">
          <span className="text-white text-4xl font-bold">Pass</span>
          <span className="text-green-600 text-4xl font-bold">Manager</span>
        </div>
        <div className='text-white font-bold  '>
        <button className='px-2 mx-1    hover:text-green-400'>log in</button>  
        <button className='px-2 mx-1   hover:text-green-400   '>signup</button>
        </div>
        </div>
    </nav>
  );
};

export default Navbar;
