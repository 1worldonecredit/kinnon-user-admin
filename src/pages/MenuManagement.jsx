import React, { useState, useEffect } from 'react';
import { 
  Settings, Edit, Trash2, LayoutDashboard, Users, 
  ListTree, BellRing, Bell, Loader2
} from 'lucide-react';

import { componentsRegistry, componentLabels } from '../utils/componentsRegistry';
import { API_URL } from '../config'; // 🌟 ดึง API_URL มาใช้งาน

const MenuManagement = () => {
  const [menus, setMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // โครงสร้างฟอร์มเริ่มต้น (เพิ่ม id เข้ามาเพื่อเช็คว่าเป็นการแก้ไข หรือสร้างใหม่)
  const defaultForm = {
    id: null,
    parentId: '',
    name: '',
    path: '',
    component: '',
    icon: '',
    useBadge: false
  };
  const [formData, setFormData] = useState(defaultForm);

  // 🌟 1. ดึงข้อมูลจาก API เมื่อเปิดหน้าจอ
  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    setIsFetching(true);
    try {
      const response = await fetch(`${API_URL}/api/menus`);
      if (response.ok) {
        const data = await response.json();
        setMenus(data);
      }
    } catch (error) {
      console.error("ดึงข้อมูลเมนูไม่สำเร็จ:", error);
    } finally {
      setIsFetching(false);
    }
  };

  // 🌟 2. ฟังก์ชันบันทึกข้อมูล (รองรับทั้งการ สร้างใหม่ และ แก้ไข)
  const handleSaveMenu = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // ถ้ามี id แปลว่าเป็นการแก้ไข (PUT) ถ้าไม่มีคือสร้างใหม่ (POST)
      const method = formData.id ? 'PUT' : 'POST';
      const endpoint = formData.id ? `${API_URL}/api/menus/${formData.id}` : `${API_URL}/api/menus`;

      const response = await fetch(endpoint, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          parentId: formData.parentId === '' ? null : formData.parentId // แปลงค่าว่างเป็น null สำหรับ DB
        })
      });

      if (response.ok) {
        alert(formData.id ? 'อัปเดตเมนูสำเร็จ!' : 'เพิ่มเมนูใหม่สำเร็จ!');
        setFormData(defaultForm); // ล้างฟอร์ม
        fetchMenus(); // โหลดข้อมูลใหม่มาแสดง
      } else {
        const errData = await response.json();
        alert(`เกิดข้อผิดพลาด: ${errData.message || 'ไม่สามารถบันทึกได้'}`);
      }
    } catch (error) {
      console.error("Save Error:", error);
      alert('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    } finally {
      setIsLoading(false);
    }
  };

  // 🌟 3. ฟังก์ชันดึงข้อมูลลงฟอร์มเมื่อกดปุ่มแก้ไข
  const handleEdit = (menu) => {
    setFormData({
      id: menu.id,
      parentId: menu.parent_id || menu.parentId || '', // รองรับทั้งชื่อฟิลด์จาก DB และ Mock
      name: menu.name || menu.menu_name || '', 
      path: menu.path || '',
      component: menu.component || '',
      icon: menu.icon || '',
      useBadge: menu.useBadge || false
    });
    // เลื่อนหน้าจอกลับไปที่ฟอร์มด้านบน
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 🌟 4. ฟังก์ชันลบเมนู
  const handleDelete = async (id, name) => {
    if (!window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบเมนู "${name}"?\n(หากเป็นเมนูหลัก เมนูย่อยทั้งหมดจะได้รับผลกระทบ)`)) return;
    
    try {
      const response = await fetch(`${API_URL}/api/menus/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchMenus(); // โหลดข้อมูลใหม่หลังลบเสร็จ
      } else {
        alert('ลบข้อมูลไม่สำเร็จ');
      }
    } catch (error) {
      console.error("Delete Error:", error);
      alert('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    }
  };

  // แยกเมนูหลักสำหรับทำ Dropdown และแสดงผล
  const mainMenus = menus.filter(m => m.parent_id === null || m.parentId === null);

  return (
    <div className="p-4 lg:p-6 min-h-screen">
      
      <div className="flex items-center gap-2 mb-6 border-b border-[var(--glass-border)] pb-3">
        <ListTree style={{ color: 'var(--theme-main)' }} size={24} />
        <h2>จัดการโครงสร้างเมนู (Dynamic Menu)</h2>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* ================= ซ้าย: ฟอร์มเพิ่มเมนู ================= */}
        <div className="xl:col-span-5 glass-card-container p-6 h-fit">
          <div className="flex items-center gap-2 mb-4 font-bold border-b border-[var(--glass-border)] pb-3" style={{ color: 'var(--theme-main)' }}>
            <span className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-[var(--theme-main)] text-[12px]">
              {formData.id ? '✎' : '+'}
            </span>
            {formData.id ? 'แก้ไขเมนูระบบ' : 'เพิ่มเมนูระบบ'}
          </div>

          <form onSubmit={handleSaveMenu} className="space-y-4">
            
            <div>
              <label className="block text-[13px] font-medium mb-1">ระดับเมนู (หากต้องการสร้างเมนูลูก)</label>
              <select 
                className="cyber-input text-sm"
                value={formData.parentId}
                onChange={(e) => setFormData({...formData, parentId: e.target.value})}
              >
                <option value="" className="text-black">-- สร้างเป็นเมนูหลัก (Main Menu) --</option>
                {mainMenus.map(menu => (
                  <option key={menu.id} value={menu.id} className="text-black">
                    {menu.menu_name || menu.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[13px] font-medium mb-1">ชื่อเมนู *</label>
              <input 
                type="text" 
                required
                placeholder="เช่น จัดการพนักงาน"
                className="cyber-input text-sm"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-[13px] font-medium mb-1">Path (URL)</label>
              <input 
                type="text" 
                placeholder="เช่น /admin/employees"
                className="cyber-input text-sm"
                value={formData.path}
                onChange={(e) => setFormData({...formData, path: e.target.value})}
              />
            </div>

           <div>
              <label className="block text-[13px] font-medium mb-1">เลือกหน้าจอ (Component)</label>
              <select 
                className="cyber-input text-sm"
                value={formData.component}
                onChange={(e) => setFormData({...formData, component: e.target.value})}
              >
                <option value="" className="text-black">-- ไม่ระบุ (ใช้สำหรับเมนูหลักที่มีลูก) --</option>
                {Object.keys(componentsRegistry).map(compName => (
                  <option key={compName} value={compName} className="text-black">
                    {componentLabels[compName] || compName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[13px] font-medium mb-1">เลือก Icon (เฉพาะเมนูหลัก)</label>
              <select 
                className="cyber-input text-sm"
                value={formData.icon}
                onChange={(e) => setFormData({...formData, icon: e.target.value})}
              >
                <option value="" className="text-black">-- ไม่มี Icon --</option>
                
                <optgroup label="🛠️ ทั่วไป & แอดมิน" className="text-black">
                  <option value="LayoutDashboard">LayoutDashboard (แผงควบคุม)</option>
                  <option value="Settings">Settings (ตั้งค่าระบบ)</option>
                  <option value="Users">Users (ผู้ใช้งาน/ลูกค้า)</option>
                </optgroup>
                <optgroup label="🏨 ที่พัก & อสังหาฯ" className="text-black">
                  <option value="Building2">Building2 (ตึก/โรงแรม/ที่พัก)</option>
                </optgroup>
                {/* เพิ่ม Optgroup อื่นๆ ของคุณตามเดิมได้เลย */}
              </select>
            </div>

            <div className="flex items-start gap-3 p-3 bg-black/20 rounded-lg border border-[var(--glass-border)] mt-4">
              <input 
                type="checkbox" 
                id="useBadge"
                className="mt-1 w-4 h-4 accent-[var(--theme-main)]"
                checked={formData.useBadge}
                onChange={(e) => setFormData({...formData, useBadge: e.target.checked})}
              />
              <label htmlFor="useBadge" className="cursor-pointer">
                <span className="block text-[13px] font-bold text-white">เปิดใช้งาน Badge แจ้งเตือน (Notification)</span>
                <span className="block text-[11px] text-[var(--text-span)] mt-0.5">ระบบจะแสดงตัวเลขแจ้งเตือนงานใหม่หลังชื่อเมนู</span>
              </label>
            </div>

            <div className="flex gap-3 pt-2">
              {formData.id && (
                <button 
                  type="button"
                  onClick={() => setFormData(defaultForm)}
                  className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                >
                  ยกเลิก
                </button>
              )}
              <button 
                type="submit"
                disabled={isLoading}
                className="cyber-btn flex-1 flex justify-center items-center gap-2"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : (formData.id ? '💾 บันทึกการแก้ไข' : '➕ เพิ่มเมนูลงในระบบ')}
              </button>
            </div>
          </form>
        </div>

        {/* ================= ขวา: โครงสร้างเมนูที่แสดงผล ================= */}
        <div className="xl:col-span-7 glass-card-container p-6">
          <div className="flex justify-between items-center mb-4 border-b border-[var(--glass-border)] pb-3">
            <h3 className="text-sm font-bold">โครงสร้างเมนูที่จะแสดงผลทางซ้ายมือ</h3>
            {isFetching && <Loader2 size={16} className="animate-spin text-[var(--theme-main)]" />}
          </div>
          
          <div className="space-y-4">
            {menus.length === 0 && !isFetching && (
              <div className="text-center py-8 text-[var(--text-span)]">
                ยังไม่มีข้อมูลเมนูในระบบ
              </div>
            )}

            {mainMenus.map(mainMenu => {
              // รองรับการค้นหา parent_id ทั้งแบบ DB (snake_case) และ React (camelCase)
              const subMenus = menus.filter(m => m.parent_id === mainMenu.id || m.parentId === mainMenu.id);
              
              return (
                <div key={mainMenu.id} className="border border-[var(--glass-border)] rounded-lg overflow-hidden bg-black/10">
                  
                  {/* หัวข้อเมนูหลัก */}
                  <div className="bg-black/20 p-3 flex justify-between items-center border-b border-[var(--glass-border)]">
                    <div className="flex items-center gap-2 font-bold text-sm" style={{ color: 'var(--theme-main)' }}>
                      <LayoutDashboard size={16} /> 
                      {mainMenu.menu_name || mainMenu.name}
                      {mainMenu.useBadge && <BellRing size={14} className="text-red-500 ml-1" />}
                      <span className="text-[11px] text-[var(--text-span)] font-normal ml-2">
                        ({mainMenu.path || 'ไม่มี Path'})
                      </span>
                    </div>
                    <div className="flex gap-1.5">
                      <button onClick={() => handleEdit(mainMenu)} className="p-1.5 bg-white/10 text-white rounded hover:bg-[var(--theme-main)] transition-colors">
                        <Edit size={14} />
                      </button>
                      <button onClick={() => handleDelete(mainMenu.id, mainMenu.menu_name || mainMenu.name)} className="p-1.5 bg-white/10 text-white rounded hover:bg-red-500 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* รายการเมนูย่อย */}
                  {subMenus.length > 0 && (
                    <div className="p-3 space-y-2">
                      {subMenus.map(subMenu => (
                        <div key={subMenu.id} className="flex justify-between items-center pl-6 text-sm text-[var(--text-h5)] hover:text-white transition-colors">
                          <div className="flex items-center gap-2">
                            <span className="text-[var(--text-span)]">-</span> 
                            {subMenu.menu_name || subMenu.name}
                            {subMenu.useBadge && <Bell size={12} className="text-red-500 ml-1" />}
                            <span className="text-[11px] text-[var(--text-span)]">({subMenu.path})</span>
                          </div>
                          <div className="flex gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEdit(subMenu)} className="p-1 text-blue-400 hover:text-blue-300"><Edit size={14} /></button>
                            <button onClick={() => handleDelete(subMenu.id, subMenu.menu_name || subMenu.name)} className="p-1 text-red-400 hover:text-red-300"><Trash2 size={14} /></button>
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