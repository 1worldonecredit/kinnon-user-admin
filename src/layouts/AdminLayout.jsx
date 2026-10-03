import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import BottomNavbar from '../components/BottomNavbar';

const AdminLayout = () => {
  // 🌟 State ควบคุมการเปิด/ปิด Sidebar บนมือถือ
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    // 🌟 1. เปลี่ยน bg-slate-100 เป็น bg-transparent เพื่อให้เห็นภาพพื้นหลังจาก index.css
    <div className="flex h-screen bg-transparent overflow-hidden font-sans">
      
      {/* 🌟 2. ฉากหลังสีดำบนมือถือ เพิ่ม backdrop-blur-sm ให้ดูเป็นกระจกฝ้า */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)} // กดพื้นที่สีดำเพื่อปิด
        />
      )}

      {/* โครงสร้าง Sidebar (ซ่อน/แสดง อัตโนมัติ) */}
      <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar />
      </div>

      {/* ฝั่งขวาของหน้าจอ (เนื้อหาหลัก) */}
      <div className="flex-1 flex flex-col overflow-hidden w-full relative">
        
        {/* ส่งคำสั่งเปิด Sidebar ไปให้ปุ่ม Menu ใน TopNavbar */}
        <TopNavbar onMenuClick={() => setIsSidebarOpen(true)} />

        {/* 🌟 3. เปลี่ยน bg-slate-50 เป็น bg-transparent */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-transparent relative p-4 lg:p-6 pb-[90px] lg:pb-6">
          <Outlet />
        </main>
        
        <BottomNavbar />
      </div>
    </div>
  );
};

export default AdminLayout;