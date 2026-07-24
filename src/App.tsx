import React, { useState, useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import { Settings, PenTool, Image as ImageIcon, Download } from 'lucide-react';

import { defaultFormData, defaultTemplateConfig, FormData, TemplateConfig } from './types';
import { FormInput } from './components/FormInput';
import { TemplatePreview } from './components/TemplatePreview';
import { AdminPanel } from './components/AdminPanel';

type Tab = 'fill' | 'preview' | 'admin';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('fill');
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  
  const [templateConfig, setTemplateConfig] = useState<TemplateConfig>(() => {
    const saved = localStorage.getItem('templateConfig');
    if (saved) {
      try {
        return { ...defaultTemplateConfig, ...JSON.parse(saved) };
      } catch (e) {
        console.error('Failed to parse saved config', e);
      }
    }
    return defaultTemplateConfig;
  });

  const handleSaveConfig = () => {
    localStorage.setItem('templateConfig', JSON.stringify(templateConfig));
    alert('Đã lưu tùy chọn màu sắc và cài đặt thành công!');
  };

  const [isExporting, setIsExporting] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);

  const handleExport = useCallback(() => {
    if (previewRef.current === null) {
      return;
    }
    setIsExporting(true);
    
    // Slight delay to ensure React has fully rendered any state changes before snapshot
    setTimeout(() => {
      toPng(previewRef.current!, { cacheBust: true, pixelRatio: 2 })
        .then((dataUrl) => {
          download(dataUrl, `TamThuc_${formData.date.replace(/\//g, '-')}.png`);
          setIsExporting(false);
        })
        .catch((err) => {
          console.error('Error exporting image', err);
          alert('Có lỗi xảy ra khi xuất ảnh.');
          setIsExporting(false);
        });
    }, 100);
  }, [previewRef, formData.date]);

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#3C3633] font-sans flex flex-col">
      {/* Navigation */}
      <header className="h-16 bg-white border-b border-[#E2E2D8] flex items-center justify-between px-4 sm:px-8 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#7A8471] rounded-full flex items-center justify-center text-white font-serif italic shadow-sm">S</div>
          <h1 className="font-serif text-xl font-semibold tracking-tight uppercase text-[#5A5A40] hidden sm:block">Sống Sáng Suốt</h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-2 p-1 bg-[#F5F5F0] rounded-lg">
            <button
              onClick={() => setActiveTab('fill')}
              className={`px-3 sm:px-4 py-1.5 rounded-md text-[10px] sm:text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors ${
                activeTab === 'fill' ? 'bg-white shadow-sm text-[#3C3633]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <PenTool className="w-3 h-3" />
              <span className="hidden sm:inline">Nhập liệu</span>
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 sm:px-4 py-1.5 rounded-md text-[10px] sm:text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors ${
                activeTab === 'preview' ? 'bg-white shadow-sm text-[#3C3633]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <ImageIcon className="w-3 h-3" />
              <span className="hidden sm:inline">Xem trước</span>
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-3 sm:px-4 py-1.5 rounded-md text-[10px] sm:text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors ${
                activeTab === 'admin' ? 'bg-white shadow-sm text-[#3C3633]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Settings className="w-3 h-3" />
              <span className="hidden sm:inline">Cài đặt</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden bg-[#F0F0E8]">
        <section className="flex-1 flex justify-center overflow-y-auto p-4 sm:p-8 custom-scrollbar">
          {activeTab === 'fill' && (
            <div className="w-full max-w-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500">
              <FormInput data={formData} onChange={setFormData} />
            </div>
          )}

          {activeTab === 'admin' && (
            <div className="w-full max-w-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500">
              <AdminPanel config={templateConfig} onChange={setTemplateConfig} onSave={handleSaveConfig} />
            </div>
          )}

          <div
            className={`w-full flex flex-col items-center ${
              activeTab === 'preview' ? 'block animate-in fade-in duration-500' : 'hidden'
            }`}
          >
            <div className="w-full max-w-[1000px] flex justify-end mb-4">
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="inline-flex items-center px-5 py-2 bg-[#5A5A40] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#4A4A35] transition-colors disabled:opacity-50 shadow-sm"
              >
                {isExporting ? (
                  <>Đang xử lý...</>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Xuất ra ảnh (.png)
                  </>
                )}
              </button>
            </div>

            {/* Wrapper for horizontal scrolling if window is too small */}
            <div className="w-full max-w-[1020px] overflow-auto bg-white p-4 sm:p-8 rounded-2xl shadow-xl border border-white flex justify-center custom-scrollbar">
              <div className="origin-top flex justify-center w-[1000px] shrink-0 bg-white shadow-2xl relative">
                <TemplatePreview ref={previewRef} data={formData} config={templateConfig} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
