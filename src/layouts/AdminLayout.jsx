import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import BottomNavbar from '../components/BottomNavbar';

const AdminLayout = () => {
  // 🌟 State ควบคุมการเปิด/ปิด Sidebar บนมือถือ
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      
      {/* 🌟 1. ฉากหลังสีดำ (Backdrop) จะโชว์เฉพาะบนมือถือตอนเปิด Sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)} // กดพื้นที่สีดำเพื่อปิด
        />
      )}

      {/* 🌟 2. โครงสร้าง Sidebar (ซ่อน/แสดง อัตโนมัติ) 
          - บนมือถือ (lg ลงไป): ใช้ fixed ให้ลอยทับหน้าจอ และใช้ translate-x เพื่อสไลด์เข้าออก
          - บนคอม (lg ขึ้นไป): ใช้ relative ให้อยู่ประจำที่ และแปลกค่า translate เป็น 0 เสมอ
      */}
      <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar />
      </div>

      {/* ฝั่งขวาของหน้าจอ (เนื้อหาหลัก) */}
      <div className="flex-1 flex flex-col overflow-hidden w-full relative">
        
        {/* 🌟 3. ส่งคำสั่งเปิด Sidebar ไปให้ปุ่ม Menu ใน TopNavbar */}
        <TopNavbar onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 relative p-4 lg:p-6 pb-[90px] lg:pb-6">
          <Outlet />
        </main>
        
        <BottomNavbar />
      </div>
    </div>
  );
};

export default AdminLayout;