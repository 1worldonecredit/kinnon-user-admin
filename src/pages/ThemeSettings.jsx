import React, { useState, useEffect } from 'react';
import { Save, Image as ImageIcon, Palette, Droplets, RotateCcw } from 'lucide-react';

const ThemeSettings = () => {
  // 🌟 1. ตั้งค่าเริ่มต้น (Default Theme) - อนาคตดึงก้อนนี้มาจาก API Database
  const defaultTheme = {
    bgImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
    primaryColor: '#0ea5e9',   // สีฟ้า
    secondaryColor: '#c084fc', // สีม่วง (สำหรับทำ Gradient)
    glassOpacity: 0.5,         // ความโปร่งแสงของการ์ด
    glassBlur: 16              // ความเบลอ
  };

  // State สำหรับเก็บค่าฟอร์ม
  const [theme, setTheme] = useState(defaultTheme);
  const [isSaving, setIsSaving] = useState(false);

  // 🌟 2. ฟังก์ชันอัปเดต CSS Variables ทันทีเมื่อค่าในฟอร์มเปลี่ยน (Real-time Preview)
  useEffect(() => {
    const root = document.documentElement;
    // เปลี่ยนภาพพื้นหลังของ body โดยตรง
    document.body.style.backgroundImage = `url(${theme.bgImage})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundAttachment = 'fixed';
    
    // อัปเดตตัวแปร CSS ของระบบ
    root.style.setProperty('--theme-main', theme.primaryColor);
    root.style.setProperty('--theme-gradient', `linear-gradient(90deg, ${theme.primaryColor} 0%, ${theme.secondaryColor} 100%)`);
    root.style.setProperty('--glass-bg-card', `rgba(30, 41, 59, ${theme.glassOpacity})`);
    root.style.setProperty('--glass-blur', `${theme.glassBlur}px`);
  }, [theme]);

  // 🌟 3. ฟังก์ชันบันทึกลง Database
  const handleSave = async () => {
    setIsSaving(true);
    try {
      console.log("เตรียมบันทึกข้อมูล Theme ลง Database:", theme);
      
      // ตัวอย่างการเรียก API (เปิดคอมเมนต์เมื่อมี Backend)
      /*
      const response = await fetch('/api/settings/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(theme)
      });
      if(!response.ok) throw new Error('บันทึกไม่สำเร็จ');
      */

      // จำลองดีเลย์
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('บันทึกการตั้งค่า Theme สำเร็จ! ระบบจะจดจำค่านี้ไว้เป็นค่าเริ่มต้น');
    } catch (error) {
      alert('เกิดข้อผิดพลาด: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  // ฟังก์ชันรีเซ็ตค่ากลับเป็นค่าเริ่มต้น
  const handleReset = () => {
    if(window.confirm('คุณต้องการรีเซ็ตสีและพื้นหลังทั้งหมดกลับเป็นค่ามาตรฐานหรือไม่?')) {
      setTheme(defaultTheme);
    }
  };

  return (
    <div className="p-4 lg:p-6 min-h-screen">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">ตั้งค่าธีมและดีไซน์ (Theme Settings)</h1>
          <span className="text-sm">ปรับแต่งสีสันและเอกลักษณ์ของระบบให้เข้ากับแบรนด์ของคุณ</span>
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
          <button 
            onClick={handleReset}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-600"
          >
            <RotateCcw size={16} /> รีเซ็ต
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 cyber-btn !w-auto !rounded-lg !py-2 !text-sm"
          >
            <Save size={16} />
            {isSaving ? 'กำลังบันทึก...' : 'บันทึกค่าเริ่มต้น'}
          </button>
        </div>
      </div>

      {/* 🌟 4. กลุ่มการตั้งค่า (แบ่งเป็น 3 การ์ด เพื่อความยืดหยุ่น) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* กลุ่มที่ 1: ภาพพื้นหลัง */}
        <div className="glass-card-container p-6">
          <div className="flex items-center gap-3 mb-6 border-b border-[var(--glass-border)] pb-3">
            <ImageIcon className="text-[var(--theme-main)]" />
            <h2 className="text-lg font-bold">ภาพพื้นหลัง (Background)</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2 font-medium">URL รูปภาพพื้นหลัง</label>
              <input 
                type="text" 
                className="cyber-input text-sm"
                value={theme.bgImage}
                onChange={(e) => setTheme({...theme, bgImage: e.target.value})}
                placeholder="https://..."
              />
            </div>
            
            {/* กล่องแสดงตัวอย่างพื้นหลัง */}
            <div 
              className="w-full h-32 rounded-lg border border-[var(--glass-border)] bg-cover bg-center mt-4"
              style={{ backgroundImage: `url(${theme.bgImage})` }}
            ></div>
            <p className="text-[11px] mt-2 text-[var(--text-span)]">
              แนะนำ: ใช้ภาพแนวนอนขนาด 1920x1080px ขึ้นไป และมีโทนสีที่เข้ากับแบรนด์
            </p>
          </div>
        </div>

        {/* กลุ่มที่ 2: สีหลักของระบบ */}
        <div className="glass-card-container p-6">
          <div className="flex items-center gap-3 mb-6 border-b border-[var(--glass-border)] pb-3">
            <Palette className="text-[var(--theme-main)]" />
            <h2 className="text-lg font-bold">โทนสีหลัก (Brand Colors)</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <label className="block text-sm font-medium">สีหลัก (Primary)</label>
                <span className="text-[11px]">ใช้สำหรับปุ่ม, ไอคอน, ขอบ</span>
              </div>
              <input 
                type="color" 
                className="w-12 h-12 rounded cursor-pointer bg-transparent border-0 p-0"
                value={theme.primaryColor}
                onChange={(e) => setTheme({...theme, primaryColor: e.target.value})}
              />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <label className="block text-sm font-medium">สีรอง (Secondary)</label>
                <span className="text-[11px]">ใช้สำหรับไล่สี (Gradient)</span>
              </div>
              <input 
                type="color" 
                className="w-12 h-12 rounded cursor-pointer bg-transparent border-0 p-0"
                value={theme.secondaryColor}
                onChange={(e) => setTheme({...theme, secondaryColor: e.target.value})}
              />
            </div>

            <div className="pt-4 border-t border-[var(--glass-border)]">
              <label className="block text-sm font-medium mb-3">ตัวอย่างปุ่มเรืองแสง</label>
              <button className="cyber-btn" disabled>
                ตัวอย่าง (Preview)
              </button>
            </div>
          </div>
        </div>

        {/* กลุ่มที่ 3: เอฟเฟกต์กระจก */}
        <div className="glass-card-container p-6">
          <div className="flex items-center gap-3 mb-6 border-b border-[var(--glass-border)] pb-3">
            <Droplets className="text-[var(--theme-main)]" />
            <h2 className="text-lg font-bold">กระจก (Glassmorphism)</h2>
          </div>
          
          <div className="space-y-6">
            
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium">ความทึบของการ์ด (Opacity)</label>
                <span className="text-sm font-bold text-[var(--theme-main)]">{Math.round(theme.glassOpacity * 100)}%</span>
              </div>
              <input 
                type="range" 
                min="0.1" 
                max="0.9" 
                step="0.05"
                className="w-full accent-[var(--theme-main)]"
                value={theme.glassOpacity}
                onChange={(e) => setTheme({...theme, glassOpacity: parseFloat(e.target.value)})}
              />
              <span className="text-[11px] block mt-1">ค่าน้อย = โปร่งใสมาก, ค่ามาก = ทึบแสง</span>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium">ความเบลอ (Blur Amount)</label>
                <span className="text-sm font-bold text-[var(--theme-main)]">{theme.glassBlur}px</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="30" 
                step="1"
                className="w-full accent-[var(--theme-main)]"
                value={theme.glassBlur}
                onChange={(e) => setTheme({...theme, glassBlur: parseInt(e.target.value)})}
              />
              <span className="text-[11px] block mt-1">ค่าน้อย = เห็นพื้นหลังชัด, ค่ามาก = ฝ้าหนา</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default ThemeSettings;