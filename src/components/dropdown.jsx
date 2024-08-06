import React, { useState, useRef, useEffect } from 'react';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-24 w-52 text-right" ref={menuRef}>
        sdgfhjklhgfdshjk
      <button
        onClick={toggleMenu}
        className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-700"
      >
        Options
        <svg
          className="w-4 h-4 fill-white/60"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 10l5 5 5-5H7z" />
        </svg>
      </button>

      {isOpen && (
        <div className="w-52 origin-top-right rounded-xl border border-white/5 bg-gray-800 p-1 text-sm text-white transition duration-100 ease-out focus:outline-none">
          <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-white/10 focus:bg-white/10">
            <div className="w-4 h-4 bg-white/30"></div>
            Edit
            <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-focus:inline">⌘E</kbd>
          </button>
          <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-white/10 focus:bg-white/10">
            <div className="w-4 h-4 bg-white/30"></div>
            Duplicate
            <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-focus:inline">⌘D</kbd>
          </button>
          <div className="my-1 h-px bg-white/5"></div>
          <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-white/10 focus:bg-white/10">
            <div className="w-4 h-4 bg-white/30"></div>
            Archive
            <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-focus:inline">⌘A</kbd>
          </button>
          <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-white/10 focus:bg-white/10">
            <div className="w-4 h-4 bg-white/30"></div>
            Delete
            <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-focus:inline">⌘D</kbd>
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
