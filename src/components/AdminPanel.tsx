import React from 'react';
import { TemplateConfig } from '../types';

interface AdminPanelProps {
  config: TemplateConfig;
  onChange: (config: TemplateConfig) => void;
  onSave?: () => void;
}

interface ColorInputProps {
  label: string;
  name: keyof TemplateConfig;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ColorInput = ({ label, name, value, onChange }: ColorInputProps) => (
  <div className="flex items-center justify-between py-3 border-b border-[#F5F5F0] last:border-0">
    <label className="text-[11px] font-medium text-gray-600 uppercase tracking-wide">{label}</label>
    <div className="flex items-center gap-3">
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="text-[10px] font-mono text-gray-500 uppercase w-20 text-right bg-transparent border-b border-gray-200 focus:border-gray-400 outline-none"
        placeholder="#000000"
      />
      <div className="relative w-7 h-7 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-[#E2E2D8] shrink-0">
        <input
          type="color"
          name={name}
          value={value}
          onChange={onChange}
          className="absolute -top-2 -left-2 w-12 h-12 cursor-pointer"
        />
      </div>
    </div>
  </div>
);

export function AdminPanel({ config, onChange, onSave }: AdminPanelProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({
      ...config,
      [name]: name === 'fontSize' ? Number(value) : value,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-black/5 flex flex-col border border-white/50 w-full overflow-hidden mb-12">
      <div className="p-6 bg-[#F5F5F0] border-b border-[#E2E2D8]">
        <h2 className="font-serif italic text-xl text-[#5A5A40] mb-1">Cài đặt hiển thị</h2>
        <p className="text-[10px] text-gray-500 uppercase tracking-widest">Tùy chỉnh mẫu xuất ảnh</p>
      </div>
      
      <div className="p-8 space-y-8">
        <div>
          <h3 className="text-[10px] font-black text-[#7A8471] uppercase tracking-widest mb-4">Kiểu chữ & Kích thước</h3>
          
          <div className="space-y-4 pl-4 border-l border-[#E2E2D8] ml-2">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-2">Cỡ chữ nhập liệu</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  name="fontSize"
                  value={config.fontSize}
                  onChange={handleChange}
                  min={8}
                  max={24}
                  className="flex-1 accent-[#7A8471]"
                />
                <span className="text-xs font-mono text-[#5A5A40] bg-[#F9F9F7] px-2 py-1 rounded border border-[#E2E2D8]">{config.fontSize}px</span>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-2">Font chữ</label>
              <select
                name="fontFamily"
                value={config.fontFamily}
                onChange={handleChange}
                className="w-full p-2 border border-[#E2E2D8] rounded bg-[#F9F9F7] text-xs text-[#3C3633] focus:border-[#7A8471] outline-none transition-colors"
              >
                <option value="'Google Sans', 'Be Vietnam Pro', sans-serif">Google Sans</option>
                <option value="'Inter', sans-serif">Inter (Sans-serif)</option>
                <option value="system-ui, -apple-system, sans-serif">System Default</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-[10px] font-black text-[#9A8C73] uppercase tracking-widest mb-4">Màu sắc văn bản</h3>
          <div className="pl-4 border-l border-[#E2E2D8] ml-2">
            <ColorInput label="Màu chữ nội dung" name="textColor" value={String(config.textColor)} onChange={handleChange} />
            <ColorInput label="Màu Tiêu đề chính" name="headingColor1" value={String(config.headingColor1)} onChange={handleChange} />
            <ColorInput label="Màu Tiêu đề phụ" name="headingColor2" value={String(config.headingColor2)} onChange={handleChange} />
          </div>
        </div>

        <div>
          <h3 className="text-[10px] font-black text-[#5A5A40] uppercase tracking-widest mb-4">Màu nền & Màu khung</h3>
          <div className="pl-4 border-l border-[#E2E2D8] ml-2">
            <ColorInput label="Màu nền" name="backgroundColor" value={String(config.backgroundColor)} onChange={handleChange} />
            <ColorInput label="Viền cột trái" name="borderColor1" value={String(config.borderColor1)} onChange={handleChange} />
            <ColorInput label="Viền cột phải" name="borderColor2" value={String(config.borderColor2)} onChange={handleChange} />
            <ColorInput label="Viền bảng dưới" name="borderColor3" value={String(config.borderColor3)} onChange={handleChange} />
          </div>
        </div>
      </div>
      
      {onSave && (
        <div className="p-6 bg-[#F5F5F0] border-t border-[#E2E2D8] flex justify-end">
          <button
            onClick={onSave}
            className="px-6 py-2 bg-[#5A5A40] text-white text-xs font-bold uppercase tracking-wider rounded shadow-sm hover:bg-[#4A4A35] transition-colors"
          >
            Lưu tùy chọn
          </button>
        </div>
      )}
    </div>
  );
}
