import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Settings, Users, ChevronDown, ChevronRight, CircleDot } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  // State สำหรับเก็บว่าเมนูกลุ่มไหนถูกกดขยายอยู่บ้าง
  const [openGroups, setOpenGroups] = useState({});

  // 🌟 จำลองข้อมูลเมนูที่มีโครงสร้างแบบ SALAPI (มี parentId)
  // - parentId: null คือหัวข้อหลัก
  // - parentId: ตัวเลข คือเมนูย่อยที่อยู่ใต้กลุ่มนั้น
  const menus = [
    { id: 1, name: 'แผงควบคุม', path: '/dashboard', icon: <LayoutDashboard size={18} />, parentId: null },
    
    // สร้างกลุ่มเมนู (ไม่มี path)
    { id: 2, name: 'ตั้งค่าระบบ', path: '', icon: <Settings size={18} />, parentId: null },
    { id: 3, name: 'จัดการเมนูระบบ', path: '/admin/menus', parentId: 2 },
    { id: 4, name: 'กำหนดสิทธิ์พนักงาน', path: '/admin/roles', parentId: 2 },
    
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
    <div className="w-64 bg-slate-900 text-white flex flex-col h-full shadow-xl z-20">
      
      {/* โลโก้ / หัว Sidebar */}
      <div className="p-5 border-b border-slate-800">
        <h1 className="text-xl font-bold text-blue-400 tracking-wider">
          KIN NON ADMIN
        </h1>
        <p className="text-xs text-slate-400 mt-1">ซุปเปอร์ ผู้ดูแลระบบ</p>
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
                  className="w-full flex items-center justify-between px-6 py-3 text-sm hover:bg-slate-800 transition-colors text-slate-300 hover:text-white"
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
                  className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white font-bold border-l-4 border-blue-400' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white border-l-4 border-transparent'
                  }`}
                >
                  {menu.icon}
                  <span>{menu.name}</span>
                </Link>
              )}

              {/* 🔹 ส่วนแสดงผลเมนูย่อย (จะแสดงก็ต่อเมื่อเมนูนั้นมีลูก และถูกกดขยายอยู่) */}
              {hasSub && isOpen && (
                <div className="bg-slate-950 py-1">
                  {subMenus.map(sub => {
                    const isSubActive = location.pathname === sub.path;
                    return (
                      <Link
                        key={sub.id}
                        to={sub.path}
                        className={`flex items-center gap-2 pl-12 pr-6 py-2.5 text-[13px] transition-colors ${
                          isSubActive 
                            ? 'text-blue-400 font-bold' 
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <CircleDot size={10} className={isSubActive ? 'text-blue-400' : 'text-slate-600'} />
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