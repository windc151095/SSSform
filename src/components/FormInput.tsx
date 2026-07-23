import React from 'react';
import { FormData } from '../types';

interface FormInputProps {
  data: FormData;
  onChange: (data: FormData) => void;
}

interface InputFieldProps {
  label: string;
  name: keyof FormData;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const InputField = ({ label, name, placeholder, value, onChange }: InputFieldProps) => (
  <div>
    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block mb-1">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border-b-2 border-[#F5F5F0] focus:border-[#7A8471] outline-none text-[12px] py-1 text-[#3C3633] bg-transparent transition-colors"
    />
  </div>
);

interface TextAreaFieldProps {
  label: string;
  name: keyof FormData;
  rows?: number;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const TextAreaField = ({ label, name, rows = 3, placeholder, value, onChange }: TextAreaFieldProps) => (
  <div>
    <label className="text-[10px] text-gray-500 italic mb-1 block">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      className="w-full bg-[#F9F9F7] border border-transparent focus:border-[#7A8471] rounded p-2 text-[12px] text-[#3C3633] outline-none transition-colors resize-none"
    />
  </div>
);

export function FormInput({ data, onChange }: FormInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-black/5 flex flex-col border border-white/50 w-full mb-12">
      <div className="p-6 bg-[#5A5A40] text-white shrink-0 rounded-t-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 22h20L12 2zm0 3.8l7.5 15.2H4.5L12 5.8z"/>
          </svg>
        </div>
        <h3 className="font-sans italic text-2xl mb-1 relative z-10">Nhập liệu nội dung</h3>
        <p className="text-[10px] opacity-80 uppercase tracking-widest relative z-10">Tâm thức đồ</p>
      </div>

      <div className="p-8 space-y-8">
        {/* Thông tin chung */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InputField label="Ngày" name="date" placeholder="DD/MM/YYYY" value={data.date} onChange={handleChange} />
          <InputField label="Writer (Người viết)" name="writer" placeholder="Tên của bạn" value={data.writer} onChange={handleChange} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block mb-2">Tình huống</label>
            <textarea
              name="tinhHuong"
              value={data.tinhHuong}
              onChange={handleChange}
              rows={2}
              className="w-full border border-[#F5F5F0] rounded p-3 text-[12px] text-[#3C3633] focus:border-[#7A8471] outline-none transition-colors bg-[#FAFAFA] resize-none"
              placeholder="Tình huống..."
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block mb-2">Thực cảnh</label>
            <textarea
              name="thucCanh"
              value={data.thucCanh}
              onChange={handleChange}
              rows={2}
              className="w-full border border-[#F5F5F0] rounded p-3 text-[12px] text-[#3C3633] focus:border-[#7A8471] outline-none transition-colors bg-[#FAFAFA] resize-none"
              placeholder="Sự việc diễn ra..."
            />
          </div>
        </div>

        {/* Nhận dạng vô thức */}
        <div className="pt-6 border-t border-[#F5F5F0]">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-6 rounded-full bg-[#7A8471] text-white flex items-center justify-center text-[10px] font-bold">01</span>
            <p className="text-xs font-black text-[#7A8471] uppercase tracking-wider">Nhận dạng vô thức</p>
          </div>
          <div className="space-y-4 pl-4 border-l border-[#E2E2D8] ml-3">
            <TextAreaField label="1. Soi tính xấu" name="soiTinhXau" rows={2} value={data.soiTinhXau} onChange={handleChange} />
            <div>
              <label className="text-[10px] text-gray-500 italic mb-2 block">2. Xét độc hại</label>
              <div className="space-y-2">
                <input type="text" name="xetDocHai_suyNghi" value={data.xetDocHai_suyNghi} onChange={handleChange} className="w-full bg-[#F9F9F7] border border-transparent focus:border-[#7A8471] rounded p-2 text-[12px] outline-none text-[#3C3633] transition-colors" placeholder="a. Suy nghĩ" />
                <input type="text" name="xetDocHai_loiNoi" value={data.xetDocHai_loiNoi} onChange={handleChange} className="w-full bg-[#F9F9F7] border border-transparent focus:border-[#7A8471] rounded p-2 text-[12px] outline-none text-[#3C3633] transition-colors" placeholder="b. Lời nói" />
                <input type="text" name="xetDocHai_hanhDong" value={data.xetDocHai_hanhDong} onChange={handleChange} className="w-full bg-[#F9F9F7] border border-transparent focus:border-[#7A8471] rounded p-2 text-[12px] outline-none text-[#3C3633] transition-colors" placeholder="c. Hành động" />
              </div>
            </div>
            <TextAreaField label="3. Thấy hậu quả" name="thayHauQua" rows={2} value={data.thayHauQua} onChange={handleChange} />
          </div>
        </div>

        {/* Nhận dạng tâm thức */}
        <div className="pt-6 border-t border-[#F5F5F0]">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-6 rounded-full bg-[#9A8C73] text-white flex items-center justify-center text-[10px] font-bold">02</span>
            <p className="text-xs font-black text-[#9A8C73] uppercase tracking-wider">Nhận dạng tâm thức</p>
          </div>
          <div className="space-y-4 pl-4 border-l border-[#E2E2D8] ml-3">
            <TextAreaField label="1. Nhìn nhân gốc" name="nhinNhanGoc" rows={2} value={data.nhinNhanGoc} onChange={handleChange} />
            <div>
              <label className="text-[10px] text-gray-500 italic mb-2 block">2. Chọn tâm thức</label>
              <div className="space-y-2">
                <input type="text" name="chonTamThuc_suyNghi" value={data.chonTamThuc_suyNghi} onChange={handleChange} className="w-full bg-[#F9F9F7] border border-transparent focus:border-[#9A8C73] rounded p-2 text-[12px] outline-none text-[#3C3633] transition-colors" placeholder="a. Suy nghĩ" />
                <input type="text" name="chonTamThuc_loiNoi" value={data.chonTamThuc_loiNoi} onChange={handleChange} className="w-full bg-[#F9F9F7] border border-transparent focus:border-[#9A8C73] rounded p-2 text-[12px] outline-none text-[#3C3633] transition-colors" placeholder="b. Lời nói" />
                <input type="text" name="chonTamThuc_hanhDong" value={data.chonTamThuc_hanhDong} onChange={handleChange} className="w-full bg-[#F9F9F7] border border-transparent focus:border-[#9A8C73] rounded p-2 text-[12px] outline-none text-[#3C3633] transition-colors" placeholder="c. Hành động" />
              </div>
            </div>
            <TextAreaField label="3. Dưỡng đức tính" name="duongDucTinh" rows={2} value={data.duongDucTinh} onChange={handleChange} />
          </div>
        </div>

        {/* Thực luyện tâm thức */}
        <div className="pt-6 border-t border-[#F5F5F0]">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-6 rounded-full bg-[#5A5A40] text-white flex items-center justify-center text-[10px] font-bold">03</span>
            <p className="text-xs font-black text-[#5A5A40] uppercase tracking-wider">Thực luyện tâm thức</p>
          </div>
          <div className="space-y-4 pl-4 border-l border-[#E2E2D8] ml-3">
            <TextAreaField label="1. Phá chấp" name="phaChap" rows={2} value={data.phaChap} onChange={handleChange} />
            <TextAreaField label="2. Định tâm" name="dinhTam" rows={2} value={data.dinhTam} onChange={handleChange} />
            <TextAreaField label="3. Phát tuệ" name="phatTue" rows={2} value={data.phatTue} onChange={handleChange} />
            <TextAreaField label="4. Thành người" name="thanhNguoi" rows={2} value={data.thanhNguoi} onChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
}
