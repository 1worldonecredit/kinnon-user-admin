import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Settings, Users, ChevronDown, ChevronRight, CircleDot } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  // State สำหรับเก็บว่าเมนูกลุ่มไหนถูกกดขยายอยู่บ้าง
  const [openGroups, setOpenGroups] = useState({});

  // 🌟 จำลองข้อมูลเมนู (เพิ่มหน้าตั้งค่าธีมเข้าไปในกลุ่มตั้งค่าระบบแล้ว)
  const menus = [
    { id: 1, name: 'แผงควบคุม', path: '/dashboard', icon: <LayoutDashboard size={18} />, parentId: null },
    
    // สร้างกลุ่มเมนู (ไม่มี path)
    { id: 2, name: 'ตั้งค่าระบบ', path: '', icon: <Settings size={18} />, parentId: null },
    { id: 3, name: 'จัดการเมนูระบบ', path: '/admin/menus', parentId: 2 },
    { id: 4, name: 'กำหนดสิทธิ์พนักงาน', path: '/admin/roles', parentId: 2 },
    // 🌟 เมนูใหม่สำหรับจัดการ Theme แบบไดนามิก
    { id: 7, name: 'ตั้งค่าธีมและดีไซน์', path: '/admin/theme', parentId: 2 }, 
    
    // สร้างกลุ่มเมนูที่สอง
    { id: 5, name: 'บริหาร ลูกค้า', path: '', icon: <Users size={18} />, parentId: null },
    { id: 6, name: 'รายชื่อลูกค้าทั้งหมด', path: '/admin/customers', parentId: 5 },
  ];

  // ฟังก์ชันสำหรับเปิด/ปิด เมนูกลุ่ม
  const toggleGroup = (id) => {
    setOpenGroups(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // ดึงเฉพาะเมนูหลักมาแสดงก่อน
  const mainMenus = menus.filter(m => m.parentId === null);

  return (
    <div 
      className="w-64 text-white flex flex-col h-full shadow-xl z-20 border-r border-[var(--glass-border)]"
      // 🌟 ใช้สไตล์กระจกโปร่งแสงจาก index.css
      style={{ 
        background: 'var(--glass-bg-sidebar)', 
        backdropFilter: 'blur(var(--glass-blur))',
        WebkitBackdropFilter: 'blur(var(--glass-blur))'
      }}
    >
      
      {/* โลโก้ / หัว Sidebar */}
      <div className="p-5 border-b border-[var(--glass-border)]">
        <h1 className="text-xl font-bold tracking-wider" style={{ color: 'var(--theme-main)' }}>
          KIN NON ADMIN
        </h1>
        <p className="text-xs text-[var(--text-span)] mt-1">ซุปเปอร์ ผู้ดูแลระบบ</p>
      </div>

      {/* รายการเมนู */}
      <div className="flex-1 overflow-y-auto py-4">
        {mainMenus.map(menu => {
          // หาว่าเมนูหลักนี้มีเมนูย่อยหรือไม่
          const subMenus = menus.filter(sub => sub.parentId === menu.id);
          const hasSub = subMenus.length > 0;
          const isOpen = openGroups[menu.id];
          const isActive = location.pathname === menu.path;

          return (
            <div key={menu.id} className="mb-1">
              
              {hasSub ? (
                // 🔹 กรณีเป็นกลุ่มเมนู (กดแล้วย่อ/ขยายได้)
                <button
                  onClick={() => toggleGroup(menu.id)}
                  className="w-full flex items-center justify-between px-6 py-3 text-sm transition-colors text-[var(--text-h5)] hover:bg-white/10 hover:text-white"
                >
                  <div className="flex items-center gap-3">
                    {menu.icon}
                    <span>{menu.name}</span>
                  </div>
                  {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
              ) : (
                // 🔹 กรณีเป็นเมนูเดี่ยวๆ (กดแล้วเปลี่ยนหน้าเลย)
                <Link
                  to={menu.path}
                  className={`flex items-center gap-3 px-6 py-3 text-sm transition-all border-l-4 ${
                    isActive 
                      ? 'bg-white/20 text-white font-bold' 
                      : 'text-[var(--text-h5)] hover:bg-white/10 hover:text-white border-transparent'
                  }`}
                  style={{ borderColor: isActive ? 'var(--theme-main)' : 'transparent' }}
                >
                  <div style={{ color: isActive ? 'var(--theme-main)' : 'inherit' }}>
                    {menu.icon}
                  </div>
                  <span>{menu.name}</span>
                </Link>
              )}

              {/* 🔹 ส่วนแสดงผลเมนูย่อย */}
              {hasSub && isOpen && (
                <div className="bg-black/20 py-1">
                  {subMenus.map(sub => {
                    const isSubActive = location.pathname === sub.path;
                    return (
                      <Link
                        key={sub.id}
                        to={sub.path}
                        className={`flex items-center gap-2 pl-12 pr-6 py-2.5 text-[13px] transition-colors ${
                          isSubActive 
                            ? 'font-bold' 
                            : 'text-[var(--text-span)] hover:text-white'
                        }`}
                        style={{ color: isSubActive ? 'var(--theme-main)' : '' }}
                      >
                        <CircleDot 
                          size={10} 
                          style={{ color: isSubActive ? 'var(--theme-main)' : 'var(--text-span)' }} 
                        />
                        {sub.name}
                      </Link>
                    );
                  })}
                </div>
              )}
              
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default Sidebar;