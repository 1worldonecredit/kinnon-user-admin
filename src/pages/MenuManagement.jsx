import React, { useState } from 'react';
import { 
  Settings, Edit, Trash2, LayoutDashboard, Users, 
  ListTree, BellRing, Bell
} from 'lucide-react';

import { componentsRegistry, componentLabels } from '../utils/componentsRegistry';

const MenuManagement = () => {
  // 🌟 จำลองข้อมูลเมนูที่มีอยู่ในระบบ (เพื่อแสดงผลฝั่งขวา และเป็นตัวเลือกเมนูหลักฝั่งซ้าย)
  const [menus, setMenus] = useState([
    { id: 1, name: 'แผงควบคุม', path: '/dashboard', component: 'Dashboard', parentId: null, icon: 'LayoutDashboard' },
    { id: 2, name: 'ตั้งค่าระบบ', path: '', component: '', parentId: null, icon: 'Settings' },
    { id: 3, name: 'จัดการเมนูระบบ', path: '/admin/menus', component: 'MenuManagement', parentId: 2, useBadge: true },
    { id: 4, name: 'เพิ่มบัญชีรับเงินโอนเข้า', path: '/admin/accounts', component: '', parentId: 2 },
    { id: 5, name: 'Profile', path: '', component: '', parentId: null, icon: 'Users' },
    { id: 6, name: 'โปรไฟล์', path: '/admin/profile', component: 'Profile', parentId: 5 },
  ]);

  const [formData, setFormData] = useState({
    parentId: '',
    name: '',
    path: '',
    component: '',
    icon: '',
    useBadge: false
  });

  const mainMenus = menus.filter(m => m.parentId === null);

  const handleSaveMenu = (e) => {
    e.preventDefault();
    console.log("บันทึกข้อมูล:", formData);
    alert(`เตรียมบันทึกเมนู: ${formData.name}`);
    // โค้ดยิง API บันทึกข้อมูลจะอยู่ตรงนี้
  };

  return (
    <div className="p-4 lg:p-6">
      
      <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-3">
        <ListTree className="text-slate-700" size={24} />
        <h2 className="text-xl font-bold text-slate-800">จัดการโครงสร้างเมนู (Dynamic Menu)</h2>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* ================= ซ้าย: ฟอร์มเพิ่มเมนู ================= */}
        <div className="xl:col-span-5 bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-fit">
          <div className="flex items-center gap-2 mb-4 text-emerald-600 font-bold border-b border-slate-100 pb-3">
            <span className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-emerald-600 text-[12px]">+</span>
            เพิ่มเมนูระบบ
          </div>

          <form onSubmit={handleSaveMenu} className="space-y-4">
            
            <div>
              <label className="block text-[13px] text-slate-600 mb-1">ระดับเมนู (หากต้องการสร้างเมนูลูก)</label>
              <select 
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.parentId}
                onChange={(e) => setFormData({...formData, parentId: e.target.value})}
              >
                <option value="">-- สร้างเป็นเมนูหลัก (Main Menu) --</option>
                {mainMenus.map(menu => (
                  <option key={menu.id} value={menu.id}>{menu.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[13px] text-slate-600 mb-1">ชื่อเมนู *</label>
              <input 
                type="text" 
                required
                placeholder="เช่น จัดการพนักงาน"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-[13px] text-slate-600 mb-1">Path (URL)</label>
              <input 
                type="text" 
                placeholder="เช่น /admin/employees"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.path}
                onChange={(e) => setFormData({...formData, path: e.target.value})}
              />
            </div>

           <div>
              <label className="block text-[13px] text-slate-600 mb-1">เลือกหน้าจอ (Component)</label>
              <select 
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.component}
                onChange={(e) => setFormData({...formData, component: e.target.value})}
              >
                <option value="">-- ไม่ระบุ (ใช้สำหรับเมนูหลักที่มีลูก) --</option>
                
                {/* 🌟 ปรับปรุงการ Map Dropdown ให้ดึงชื่อภาษาไทยมาแสดง */}
                {Object.keys(componentsRegistry).map(compName => (
                  <option key={compName} value={compName}>
                    {componentLabels[compName] || compName} {/* ถ้ามีคำแปลให้แสดงคำแปล ถ้าไม่มีให้แสดงชื่อ Eng ธรรมดา */}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[13px] text-slate-600 mb-1">เลือก Icon (เฉพาะเมนูหลัก)</label>
              <select 
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.icon}
                onChange={(e) => setFormData({...formData, icon: e.target.value})}
              >
                <option value="">-- ไม่มี Icon --</option>
                
                <optgroup label="🛠️ ทั่วไป & แอดมิน">
                  <option value="LayoutDashboard">LayoutDashboard (แผงควบคุม)</option>
                  <option value="Settings">Settings (ตั้งค่าระบบ)</option>
                  <option value="Users">Users (ผู้ใช้งาน/ลูกค้า)</option>
                  <option value="ShieldCheck">ShieldCheck (สิทธิ์การใช้งาน)</option>
                  <option value="Wallet">Wallet (กระเป๋าเงิน/การเงิน)</option>
                </optgroup>

                <optgroup label="🏨 ที่พัก & อสังหาฯ">
                  <option value="Building2">Building2 (ตึก/โรงแรม/ที่พักทั้งหมด)</option>
                  <option value="Home">Home (บ้าน/ห้องเช่ารายเดือน)</option>
                  <option value="BedDouble">BedDouble (ห้องพัก/เตียงนอน)</option>
                  <option value="MapPin">MapPin (พิกัด/ที่พักใกล้ฉัน)</option>
                </optgroup>

                <optgroup label="🍽️ อาหาร & เครื่องดื่ม">
                  <option value="Utensils">Utensils (ร้านอาหาร/ช้อนส้อม)</option>
                  <option value="Coffee">Coffee (คาเฟ่/เครื่องดื่ม)</option>
                  <option value="Store">Store (ร้านค้าทั่วไป)</option>
                </optgroup>

                <optgroup label="🚗 เดินทาง & บริการ">
                  <option value="Car">Car (รถยนต์/รถรับจ้าง)</option>
                  <option value="Wrench">Wrench (ช่างซ่อม/งานช่าง)</option>
                  <option value="Briefcase">Briefcase (ต้องการคนทำงาน/สมัครงาน)</option>
                </optgroup>

                <optgroup label="📅 การจอง & ออเดอร์">
                  <option value="ClipboardList">ClipboardList (ออเดอร์/รายการสั่งซื้อ)</option>
                  <option value="CalendarDays">CalendarDays (การจอง/ปฏิทิน)</option>
                  <option value="CheckSquare">CheckSquare (ตรวจสอบ/อนุมัติ)</option>
                </optgroup>

                <optgroup label="🎁 โปรโมชั่น & ของขวัญ">
                  <option value="Gift">Gift (ของขวัญ/รางวัล)</option>
                  <option value="Percent">Percent (ส่วนลด/โปรโมชั่น)</option>
                  <option value="Tag">Tag (ป้ายราคา/คูปอง)</option>
                </optgroup>

              </select>
            </div>

            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <input 
                type="checkbox" 
                id="useBadge"
                className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                checked={formData.useBadge}
                onChange={(e) => setFormData({...formData, useBadge: e.target.checked})}
              />
              <label htmlFor="useBadge" className="cursor-pointer">
                <span className="block text-[13px] font-bold text-slate-800">เปิดใช้งาน Badge แจ้งเตือน (Notification)</span>
                <span className="block text-[11px] text-slate-500 mt-0.5">หากเปิดไว้ ระบบจะแสดงตัวเลขแจ้งเตือนงานใหม่หลังชื่อเมนู</span>
              </label>
            </div>

            <button 
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg mt-2 hover:bg-indigo-700 transition-colors flex justify-center items-center gap-2 shadow-md"
            >
              💾 เพิ่มเมนูลงในระบบ
            </button>
          </form>
        </div>

        {/* ================= ขวา: โครงสร้างเมนูที่แสดงผล ================= */}
        <div className="xl:col-span-7 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-800 mb-4">โครงสร้างเมนูที่จะแสดงผลทางซ้ายมือ</h3>
          
          <div className="space-y-4">
            {mainMenus.map(mainMenu => {
              const subMenus = menus.filter(m => m.parentId === mainMenu.id);
              
              return (
                <div key={mainMenu.id} className="border border-blue-100 rounded-lg overflow-hidden">
                  
                  {/* หัวข้อเมนูหลัก */}
                  <div className="bg-blue-50 p-3 flex justify-between items-center border-b border-blue-100">
                    <div className="flex items-center gap-2 font-bold text-blue-700 text-sm">
                      <LayoutDashboard size={16} /> {/* เปลี่ยนไอคอนตามจริงได้ภายหลัง */}
                      {mainMenu.name}
                      {mainMenu.useBadge && <BellRing size={14} className="text-red-500 ml-1" />}
                      <span className="text-[11px] text-slate-400 font-normal ml-2">({mainMenu.path || 'ไม่มี Path'})</span>
                    </div>
                    <div className="flex gap-1.5">
                      <button className="p-1.5 bg-white text-blue-600 border border-blue-200 rounded hover:bg-blue-600 hover:text-white transition-colors"><Edit size={14} /></button>
                      <button className="p-1.5 bg-white text-red-500 border border-red-200 rounded hover:bg-red-500 hover:text-white transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </div>

                  {/* รายการเมนูย่อย */}
                  {subMenus.length > 0 && (
                    <div className="p-3 bg-white space-y-2">
                      {subMenus.map(subMenu => (
                        <div key={subMenu.id} className="flex justify-between items-center pl-6 text-sm text-slate-600">
                          <div className="flex items-center gap-2">
                            <span className="text-slate-300">-</span> 
                            {subMenu.name}
                            {subMenu.useBadge && <Bell size={12} className="text-red-500 ml-1" />}
                            <span className="text-[11px] text-slate-400">({subMenu.path})</span>
                          </div>
                          <div className="flex gap-1.5">
                            <button className="p-1 text-blue-500 hover:text-blue-700"><Edit size={14} /></button>
                            <button className="p-1 text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};

export default MenuManagement;