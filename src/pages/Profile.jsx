import React from 'react';
import { User, Mail, Phone } from 'lucide-react';

const Profile = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">โปรไฟล์ของฉัน</h2>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 max-w-2xl">
        <div className="flex items-center gap-4 border-b border-slate-100 pb-6 mb-6">
          <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex justify-center items-center">
            <User size={40} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">ผู้ดูแลระบบ (Super Admin)</h3>
            <p className="text-slate-500 text-sm">พร้อมใช้งาน</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-slate-600">
            <Mail size={18} /> <span>admin@kinnon.com</span>
          </div>
          <div className="flex items-center gap-3 text-slate-600">
            <Phone size={18} /> <span>080-000-0000</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;