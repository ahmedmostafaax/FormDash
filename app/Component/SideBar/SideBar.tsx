"use client";

import { useState } from "react";

export default function SideBar({ activeIndex, setActiveIndex }: { activeIndex: number; setActiveIndex: (i: number) => void }) {
  const dashboardicon = (
    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5Zm16 14a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2a1 1 0 011-1h4a1 1 0 011 1v2ZM4 13a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6Zm16-2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5a1 1 0 011-1h4a1 1 0 011 1v6Z" />
    </svg>
  );

  const overviewicon = (
    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.111 20A3.111 3.111 0 014 16.889v-12C4 4.398 4.398 4 4.889 4h4.444a.89.89 0 01.89.889v12A3.111 3.111 0 017.11 20Zm0 0h12a.889.889 0 00.889-.889v-4.444a.889.889 0 00-.889-.89h-4.389a.889.889 0 00-.62.253l-3.767 3.665a.933.933 0 00-.146.185c-.868 1.433-1.581 1.858-3.078 2.12Zm0-3.556h.009m7.933-10.927 3.143 3.143a.889.889 0 010 1.257l-7.974 7.974v-8.8l3.574-3.574a.889.889 0 011.257 0Z" />
    </svg>
  );

  const chaticon = (
    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 9h5m3 0h2M7 12h2m3 0h5M5 5h14a1 1 0 011 1v9a1 1 0 01-1 1h-6.616a1 1 0 00-.67.257l-2.88 2.592A.5.5 0 018 18.477V17a1 1 0 00-1-1H5a1 1 0 01-1-1V6a1 1 0 011-1Z" />
    </svg>
  );

  const sidebarLinks = [
    { name: "Hey", icon: dashboardicon },
    { name: "Hey All", icon: overviewicon },
    { name: "Bye", icon: chaticon },
  ];

  return (
    <div className="w-64 border-r border-gray-300 min-h-screen p-4 flex flex-col">
      {sidebarLinks.map((item, index) => (
        <button
          key={index}
          onClick={() => setActiveIndex(index)}
          className={`flex items-center gap-3 py-3 px-2 rounded transition-colors duration-200 ${
            index === activeIndex ? "bg-indigo-500/10 text-indigo-600" : "hover:bg-gray-100 text-gray-700"
          }`}
        >
          {item.icon}
          <span className="font-medium">{item.name}</span>
        </button>
      ))}
    </div>
  );
}
