import Dashboard from '../pages/Dashboard';
import MenuManagement from '../pages/MenuManagement';
import Profile from '../pages/Profile';

// ส่งออก Component สำหรับใช้ใน Router
export const componentsRegistry = {
  'Dashboard': Dashboard,
  'MenuManagement': MenuManagement,
  'Profile': Profile,
};

// 🌟 เพิ่มส่วนนี้: ส่งออกคำอธิบายภาษาไทย สำหรับใช้แสดงใน Dropdown
export const componentLabels = {
  'Dashboard': 'หน้าแผงควบคุม (Dashboard)',
  'MenuManagement': 'หน้าจัดการระบบเมนู (MenuManagement)',
  'Profile': 'หน้าโปรไฟล์ผู้ใช้งาน (Profile)',
  // เพิ่มหน้าอื่นๆ ในอนาคตตรงนี้ เช่น
  // 'CustomerList': 'หน้ารายชื่อลูกค้า (CustomerList)',
};