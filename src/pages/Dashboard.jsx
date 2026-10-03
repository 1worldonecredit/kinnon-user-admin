// src/pages/Dashboard.jsx
import React from 'react';
import { Users, Building, Wallet, Activity } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="p-6 bg-slate-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">ภาพรวมระบบ (Dashboard Overview)</h1>
        <div className="text-sm text-slate-500">ข้อมูลอัปเดตล่าสุด: {new Date().toLocaleDateString('th-TH')}</div>
      </div>

      {/* สถิติหลัก 4 กล่อง */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* กล่องที่ 1: โรงแรม */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 mb-1">โรงแรมพาร์ทเนอร์</p>
            <h3 className="text-3xl font-bold text-slate-800">124</h3>
          </div>
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            <Building size={24} />
          </div>
        </div>

        {/* กล่องที่ 2: ลูกค้า */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 mb-1">ลูกค้าในระบบ</p>
            <h3 className="text-3xl font-bold text-slate-800">8,450</h3>
          </div>
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
            <Users size={24} />
          </div>
        </div>

        {/* กล่องที่ 3: ยอดจองวันนี้ */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 mb-1">ยอดจองวันนี้</p>
            <h3 className="text-3xl font-bold text-slate-800">45</h3>
          </div>
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
            <Activity size={24} />
          </div>
        </div>

        {/* กล่องที่ 4: รายได้ */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 mb-1">รายได้รวม (THB)</p>
            <h3 className="text-3xl font-bold text-slate-800">฿125K</h3>
          </div>
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
            <Wallet size={24} />
          </div>
        </div>

      </div>

      {/* พื้นที่สำหรับกราฟหรือตารางเพิ่มเติมในอนาคต */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 min-h-[300px]">
          <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">คำขออนุมัติโรงแรมใหม่</h2>
          <div className="flex items-center justify-center h-48 text-slate-400">
            ยังไม่มีรายการคำขอในขณะนี้
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 min-h-[300px]">
          <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">รายการจองล่าสุด</h2>
          <div className="flex items-center justify-center h-48 text-slate-400">
            รอเชื่อมต่อ API ดึงข้อมูล...
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;