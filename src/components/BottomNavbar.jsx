import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Settings, ClipboardList } from 'lucide-react';

const BottomNavbar = () => {
  const location = useLocation();

  // กำหนดเมนูหลักที่จะแสดงบนมือถือ (เลือกเฉพาะเมนูที่ใช้งานบ่อย)
  const navItems = [
    { id: 1, name: 'ภาพรวม', path: '/dashboard', icon: <LayoutDashboard size={22} /> },
    { id: 2, name: 'ลูกค้า', path: '/admin/customers', icon: <Users size={22} /> },
    { id: 3, name: 'รายการ', path: '/admin/orders', icon: <ClipboardList size={22} /> },
    { id: 4, name: 'ตั้งค่า', path: '/admin/menus', icon: <Settings size={22} /> },
  ];

  return (
    // lg:hidden คือคำสั่งซ่อน BottomNav ทันทีเมื่อหน้าจอใหญ่กว่ามือถือ
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around items-center h-[70px] px-2 z-40 shadow-[0_-4px_15px_-3px_rgba(0,0,0,0.05)] pb-safe">
      {navItems.map(item => {
        // เช็คว่าหน้าปัจจุบันตรงกับเมนูนี้หรือไม่
        const isActive = location.pathname === item.path;
        
        return (
          <Link
            key={item.id}
            to={item.path}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-200 ${
              isActive 
                ? 'text-blue-600 transform -translate-y-1' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div className={`${isActive ? 'bg-blue-50 p-1.5 rounded-xl' : 'p-1.5'}`}>
              {item.icon}
            </div>
            <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>
              {item.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNavbar;