import React, { forwardRef } from 'react';
import { FormData, TemplateConfig } from '../types';

interface TemplatePreviewProps {
  data: FormData;
  config: TemplateConfig;
}

export const TemplatePreview = forwardRef<HTMLDivElement, TemplatePreviewProps>(
  ({ data, config }, ref) => {
    const {
      fontSize,
      textColor,
      fontFamily,
      headingColor1,
      headingColor2,
      borderColor1,
      borderColor2,
      borderColor3,
    } = config;

    return (
      <div
        ref={ref}
        className="w-[1000px] flex flex-col gap-6 relative bg-white pb-12"
        style={{ fontFamily, fontSize: `${fontSize}px`, color: textColor }}
      >
        {/* Header */}
        <div className="flex justify-between items-start pt-8 px-8 border-b-[1px] pb-4" style={{ borderColor: headingColor1 }}>
          {/* Logo Area */}
          <div className="w-[300px] text-center mt-2 flex flex-col items-center">
            <h1
              className="font-bold text-xl tracking-[0.3em] uppercase mb-1"
              style={{ color: headingColor1 }}
            >
              Sống Sáng Suốt
            </h1>
            <div className="text-[7px] uppercase tracking-wider border rounded-full px-2 py-0.5 inline-block mb-4" style={{ borderColor: borderColor3 }}>
              <span style={{ color: headingColor2 }}>Suốt ngày sống</span> <span className="text-gray-300">|</span>{' '}
              <span style={{ color: headingColor2 }}>Suốt ngày sáng</span> <span className="text-gray-300">|</span>{' '}
              <span style={{ color: headingColor1 }}>Suốt đời sống</span> <span className="text-gray-300">|</span>{' '}
              <span style={{ color: headingColor1 }}>Suốt đời sáng</span>
            </div>
            
            <p className="font-bold text-[13px]" style={{ color: headingColor1 }}>
              Writer: {data.writer || '....................'}
            </p>
            <p className="italic text-[13px]" style={{ color: headingColor1 }}>
              {data.date || '..../..../202..'}
            </p>
          </div>

          {/* Center Titles */}
          <div className="text-center flex-1 mt-2">
            <h2 className="font-bold text-sm uppercase mb-1" style={{ color: headingColor2 }}>
              THỰC LUYỆN TÂM THỨC
            </h2>
            <h3 className="font-bold text-base uppercase mb-4" style={{ color: headingColor1 }}>
              20 BỘ ĐỜI SỐNG TÂM THỨC
            </h3>
            <div className="flex justify-center items-center gap-1 text-[13px] font-bold italic mt-6">
              <span style={{ color: headingColor2 }}>Tình huống:</span>
              <span style={{ color: headingColor1 }}>{data.tinhHuong || 'Nuông chiều mình trong mua sắm'}</span>
            </div>
          </div>

          {/* Right Area */}
          <div className="w-[300px] text-center mt-2 flex flex-col items-center">
            <h4 className="font-bold text-sm uppercase mb-1" style={{ color: headingColor2 }}>
              BỘ 01. ĐỜI SỐNG CÁ NHÂN
            </h4>
            <div className="flex justify-center items-center gap-1 text-[13px] font-bold">
              <span style={{ color: headingColor2 }}>Thực cảnh 01.</span>
              <span style={{ color: headingColor1 }}>{data.thucCanh || 'Được nuông chiều từ nhỏ'}</span>
            </div>
          </div>
        </div>

        {/* Middle Two Columns */}
        <div className="grid grid-cols-2 gap-4 px-8 mt-2 relative">
          {/* Left Column */}
          <div>
            <h3 className="font-bold uppercase mb-2 tracking-wide text-sm" style={{ color: headingColor1 }}>
              NHẬN DẠNG VÔ THỨC
            </h3>
            <div
              className="border-[1px] flex flex-col min-h-[400px] bg-white"
              style={{ borderColor: borderColor1 }}
            >
              <div
                className="p-3 border-b-[1px] flex-1"
                style={{ borderColor: borderColor1 }}
              >
                <div style={{ color: headingColor1 }} className="mb-1 font-bold">1. Soi tính xấu</div>
                <div className="whitespace-pre-wrap">{data.soiTinhXau}</div>
              </div>
              <div
                className="p-3 border-b-[1px] flex-[2]"
                style={{ borderColor: borderColor1 }}
              >
                <div style={{ color: headingColor1 }} className="mb-1 font-bold">2. Xét độc hại</div>
                <div style={{ color: headingColor1 }} className="mb-1 font-bold">a. Suy nghĩ</div>
                <div className="whitespace-pre-wrap mb-2">{data.xetDocHai_suyNghi}</div>
                <div style={{ color: headingColor1 }} className="mb-1 font-bold">b. Lời nói</div>
                <div className="whitespace-pre-wrap mb-2">{data.xetDocHai_loiNoi}</div>
                <div style={{ color: headingColor1 }} className="mb-1 font-bold">c. Hành động</div>
                <div className="whitespace-pre-wrap">{data.xetDocHai_hanhDong}</div>
              </div>
              <div className="p-3 flex-1">
                <div style={{ color: headingColor1 }} className="mb-1 font-bold">3. Thấy hậu quả</div>
                <div className="whitespace-pre-wrap">{data.thayHauQua}</div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <h3 className="font-bold uppercase mb-2 tracking-wide text-sm" style={{ color: headingColor2 }}>
              NHẬN DẠNG TÂM THỨC
            </h3>
            <div
              className="border-[1px] flex flex-col min-h-[400px] bg-white"
              style={{ borderColor: borderColor2 }}
            >
              <div
                className="p-3 border-b-[1px] flex-1"
                style={{ borderColor: borderColor2 }}
              >
                <div style={{ color: headingColor2 }} className="mb-1 font-bold">1. Nhìn nhân gốc</div>
                <div className="whitespace-pre-wrap">{data.nhinNhanGoc}</div>
              </div>
              <div
                className="p-3 border-b-[1px] flex-[2]"
                style={{ borderColor: borderColor2 }}
              >
                <div style={{ color: headingColor2 }} className="mb-1 font-bold">2. Chọn tâm thức</div>
                <div style={{ color: headingColor2 }} className="mb-1 font-bold">a. Suy nghĩ</div>
                <div className="whitespace-pre-wrap mb-2">{data.chonTamThuc_suyNghi}</div>
                <div style={{ color: headingColor2 }} className="mb-1 font-bold">b. Lời nói</div>
                <div className="whitespace-pre-wrap mb-2">{data.chonTamThuc_loiNoi}</div>
                <div style={{ color: headingColor2 }} className="mb-1 font-bold">c. Hành động</div>
                <div className="whitespace-pre-wrap">{data.chonTamThuc_hanhDong}</div>
              </div>
              <div className="p-3 flex-1">
                <div style={{ color: headingColor2 }} className="mb-1 font-bold">3. Dưỡng đức tính</div>
                <div className="whitespace-pre-wrap">{data.duongDucTinh}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Table */}
        <div className="mt-4 px-8">
          <h3 className="font-bold uppercase mb-2 tracking-wide text-sm" style={{ color: headingColor2 }}>
            THỰC LUYỆN TÂM THỨC
          </h3>
          <div
            className="border-[1px] flex flex-col bg-white"
            style={{ borderColor: borderColor3 }}
          >
            {/* Row 1 */}
            <div className="flex border-b-[1px]" style={{ borderColor: borderColor3 }}>
              <div
                className="w-40 border-r-[1px] p-4 flex items-center justify-center font-bold"
                style={{ borderColor: borderColor3, color: headingColor1 }}
              >
                1. Phá chấp
              </div>
              <div className="flex-1 p-4 whitespace-pre-wrap min-h-[60px]">{data.phaChap}</div>
            </div>
            {/* Row 2 */}
            <div className="flex border-b-[1px]" style={{ borderColor: borderColor3 }}>
              <div
                className="w-40 border-r-[1px] p-4 flex items-center justify-center font-bold"
                style={{ borderColor: borderColor3, color: headingColor2 }}
              >
                2. Định tâm
              </div>
              <div className="flex-1 p-4 whitespace-pre-wrap min-h-[60px]">{data.dinhTam}</div>
            </div>
            {/* Row 3 */}
            <div className="flex border-b-[1px]" style={{ borderColor: borderColor3 }}>
              <div
                className="w-40 border-r-[1px] p-4 flex items-center justify-center font-bold"
                style={{ borderColor: borderColor3, color: headingColor2 }}
              >
                3. Phát tuệ
              </div>
              <div className="flex-1 p-4 whitespace-pre-wrap min-h-[60px]">{data.phatTue}</div>
            </div>
            {/* Row 4 */}
            <div className="flex">
              <div
                className="w-40 border-r-[1px] p-4 flex items-center justify-center font-bold"
                style={{ borderColor: borderColor3, color: headingColor2 }}
              >
                4. Thành người
              </div>
              <div className="flex-1 p-4 whitespace-pre-wrap min-h-[60px]">{data.thanhNguoi}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

TemplatePreview.displayName = 'TemplatePreview';
