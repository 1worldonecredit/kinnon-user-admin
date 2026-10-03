import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// นำเข้า Component ที่จำเป็น
import Login from './pages/Login';
import AdminLayout from './layouts/AdminLayout';
import PageRouter from './pages/PageRouter';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 🌟 1. เมื่อเข้าสู่ระบบด้วย URL หน้าแรก (/) จะถูกส่งไปหน้า Login อัตโนมัติ */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* 🌟 2. กำหนด Path สำหรับหน้า Login (จะไม่ถูกครอบด้วยเมนูซ้าย-บน) */}
        <Route path="/login" element={<Login />} />
        
        {/* 🌟 3. หน้าอื่นๆ ทั้งหมดของระบบหลังบ้าน จะถูกครอบด้วย AdminLayout */}
        <Route element={<AdminLayout />}>
          <Route path="*" element={<PageRouter />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;