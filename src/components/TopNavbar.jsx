import React from 'react';
import { Search, Bell, User, Menu } from 'lucide-react';

// 🌟 รับ prop "onMenuClick" เข้ามา
const TopNavbar = ({ onMenuClick }) => {
  return (
    <header className="bg-white h-[70px] flex items-center justify-between px-4 sm:px-6 border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      
      <div className="flex items-center gap-4">
        {/* 🌟 ผูกฟังก์ชัน onMenuClick กับปุ่ม */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>

        <div className="hidden sm:flex items-center bg-slate-100 px-3 py-2 rounded-lg border border-slate-200 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400 transition-all">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="ค้นหาเมนู หรือข้อมูล..." 
            className="bg-transparent border-none outline-none ml-2 text-sm w-48 lg:w-64 text-slate-700" 
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
          <Bell size={22} />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-2 sm:pl-4 border-l border-slate-200 cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-bold text-slate-700 leading-none">ผู้ดูแลระบบ</p>
            <p className="text-[11px] text-slate-500 mt-1">Super Admin</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
            <User size={18} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;