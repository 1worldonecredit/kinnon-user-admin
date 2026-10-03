import React from 'react';
import { Search, Bell, User, Menu } from 'lucide-react';

// 🌟 รับ prop "onMenuClick" เข้ามา
const TopNavbar = ({ onMenuClick }) => {
  return (
    <header 
      className="h-[70px] flex items-center justify-between px-4 sm:px-6 border-b sticky top-0 z-30 shadow-sm transition-all duration-300"
      // 🌟 ใช้สไตล์กระจกโปร่งแสง
      style={{ 
        background: 'var(--glass-bg-topbar)', 
        backdropFilter: 'blur(var(--glass-blur))',
        WebkitBackdropFilter: 'blur(var(--glass-blur))',
        borderColor: 'var(--glass-border)'
      }}
    >
      
      <div className="flex items-center gap-4">
        {/* 🌟 ผูกฟังก์ชัน onMenuClick กับปุ่ม (เปลี่ยน Hover เป็นโปร่งแสง) */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg transition-colors hover:bg-white/10"
          style={{ color: 'var(--text-h1)' }}
        >
          <Menu size={24} />
        </button>

        {/* 🌟 ช่องค้นหา ปรับเป็นสไตล์กระจกดำโปร่งแสง */}
        <div 
          className="hidden sm:flex items-center px-3 py-2 rounded-lg border transition-all"
          style={{ 
            background: 'rgba(0, 0, 0, 0.2)', 
            borderColor: 'var(--glass-border)' 
          }}
        >
          <Search size={18} style={{ color: 'var(--text-span)' }} />
          <input 
            type="text" 
            placeholder="ค้นหาเมนู หรือข้อมูล..." 
            className="bg-transparent border-none outline-none ml-2 text-sm w-48 lg:w-64 placeholder-white/40" 
            style={{ color: 'var(--text-h1)' }}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* 🌟 ปุ่มแจ้งเตือน */}
        <button 
          className="relative p-2 rounded-full transition-colors hover:bg-white/10"
          style={{ color: 'var(--text-h1)' }}
        >
          <Bell size={22} />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border border-white/50"></span>
        </button>

        {/* 🌟 โปรไฟล์ผู้ดูแลระบบ */}
        <div 
          className="flex items-center gap-3 pl-2 sm:pl-4 border-l cursor-pointer hover:bg-white/10 p-1.5 rounded-lg transition-colors"
          style={{ borderColor: 'var(--glass-border)' }}
        >
          <div className="hidden sm:block text-right">
            <p className="text-sm font-bold leading-none" style={{ color: 'var(--text-h1)' }}>ผู้ดูแลระบบ</p>
            <p className="text-[11px] mt-1" style={{ color: 'var(--text-span)' }}>Super Admin</p>
          </div>
          {/* 🌟 ใช้สี Gradient หลักของระบบเป็นพื้นหลังไอคอน User */}
          <div 
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold shadow-md"
            style={{ background: 'var(--theme-gradient)' }}
          >
            <User size={18} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;