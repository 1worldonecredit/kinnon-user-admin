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
    // 🌟 1. ใช้ lg:hidden ครอบไว้ชั้นนอกสุด เพื่อซ่อนแถบนี้เมื่อเปิดบนจอคอมพิวเตอร์
    <div className="lg:hidden">
      
      {/* 🌟 2. เรียกใช้ class "bottom-navbar" ที่เราตั้งค่าพื้นหลังกระจกโปร่งแสงไว้ใน index.css */}
      <div className="bottom-navbar">
        {navItems.map(item => {
          // เช็คว่าหน้าปัจจุบันตรงกับเมนูนี้หรือไม่
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.id}
              to={item.path}
              // 🌟 3. เรียกใช้ class "nav-item" และเติม "active" เมื่อมีการเลือกเมนูนี้
              // (จะเปลี่ยนเป็นสีฟ้าเรืองแสงและเด้งขึ้นด้านบน ตามที่เราตั้งไว้ใน CSS)
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <div className="p-1">
                {item.icon}
              </div>
              <span className={isActive ? 'font-bold' : 'font-medium'}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
      
    </div>
  );
};

export default BottomNavbar;