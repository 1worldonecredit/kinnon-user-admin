import React from 'react';
import { Users, Building, Wallet, Activity } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="p-6 min-h-screen">
      
      <div className="flex justify-between items-center mb-6">
        {/* 🌟 ใช้ tag h1 ที่เราตั้งค่าสีไว้ใน index.css แล้ว */}
        <h1>ภาพรวมระบบ (Dashboard Overview)</h1>
        <span>ข้อมูลอัปเดตล่าสุด: {new Date().toLocaleDateString('th-TH')}</span>
      </div>

      {/* สถิติหลัก 4 กล่อง */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* กล่องที่ 1: โรงแรม */}
        {/* 🌟 เปลี่ยนมาใช้ .glass-card-container แทน bg-white */}
        <div className="glass-card-container p-6 flex items-center justify-between">
          <div>
            <span className="block text-sm mb-1">โรงแรมพาร์ทเนอร์</span>
            <h3 className="text-3xl">124</h3>
          </div>
          {/* 🌟 ปรับพื้นหลังไอคอนให้เป็นกระจกใส */}
          <div className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 text-[var(--theme-main)] rounded-full flex items-center justify-center">
            <Building size={24} />
          </div>
        </div>

        {/* กล่องที่ 2: ลูกค้า */}
        <div className="glass-card-container p-6 flex items-center justify-between">
          <div>
            <span className="block text-sm mb-1">ลูกค้าในระบบ</span>
            <h3 className="text-3xl">8,450</h3>
          </div>
          <div className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 text-[#4ade80] rounded-full flex items-center justify-center">
            <Users size={24} />
          </div>
        </div>

        {/* กล่องที่ 3: ยอดจองวันนี้ */}
        <div className="glass-card-container p-6 flex items-center justify-between">
          <div>
            <span className="block text-sm mb-1">ยอดจองวันนี้</span>
            <h3 className="text-3xl">45</h3>
          </div>
          <div className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 text-[#fbbf24] rounded-full flex items-center justify-center">
            <Activity size={24} />
          </div>
        </div>

        {/* กล่องที่ 4: รายได้ */}
        <div className="glass-card-container p-6 flex items-center justify-between">
          <div>
            <span className="block text-sm mb-1">รายได้รวม (THB)</span>
            <h3 className="text-3xl">฿125K</h3>
          </div>
          <div className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 text-[#c084fc] rounded-full flex items-center justify-center">
            <Wallet size={24} />
          </div>
        </div>

      </div>

      {/* พื้นที่สำหรับกราฟหรือตารางเพิ่มเติมในอนาคต */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card-container p-6 min-h-[300px]">
          {/* 🌟 เปลี่ยนสีเส้นแบ่งขอบให้เป็นสีกระจก */}
          <h2 className="text-lg mb-4 border-b border-[var(--glass-border)] pb-2">คำขออนุมัติโรงแรมใหม่</h2>
          <div className="flex items-center justify-center h-48">
            <span>ยังไม่มีรายการคำขอในขณะนี้</span>
          </div>
        </div>

        <div className="glass-card-container p-6 min-h-[300px]">
          <h2 className="text-lg mb-4 border-b border-[var(--glass-border)] pb-2">รายการจองล่าสุด</h2>
          <div className="flex items-center justify-center h-48">
            <span>รอเชื่อมต่อ API ดึงข้อมูล...</span>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;