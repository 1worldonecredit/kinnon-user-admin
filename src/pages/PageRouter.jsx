import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { componentsRegistry } from '../utils/componentsRegistry';

const PageRouter = () => {
  const [menus, setMenus] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // 🌟 ดึงข้อมูลเมนูจาก DB (จำลองข้อมูลไปก่อน)
    const fetchMenus = async () => {
      const mockData = [
        { id: 1, path: '/dashboard', component: 'Dashboard' },
        { id: 3, path: '/admin/menus', component: 'MenuManagement' },
      ];
      setMenus(mockData);
    };
    fetchMenus();
  }, []);

  // ค้นหาว่า URL ปัจจุบัน ตรงกับ Component อะไรใน DB
  const currentMenu = menus.find(m => m.path === location.pathname);
  const ComponentToRender = currentMenu ? componentsRegistry[currentMenu.component] : null;

  return (
    <div className="p-6">
      <Routes>
        {ComponentToRender && (
           <Route path={currentMenu.path.replace('/', '')} element={<ComponentToRender />} />
        )}
        {/* หน้า Fallback กรณีเข้า URL ที่ไม่มีในระบบ */}
        <Route path="*" element={
           ComponentToRender ? <ComponentToRender /> : <div>ไม่พบหน้าจอ หรือคุณไม่มีสิทธิ์เข้าถึง</div>
        } />
      </Routes>
    </div>
  );
};

export default PageRouter;
