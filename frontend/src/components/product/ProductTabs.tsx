'use client';

import { useState } from 'react';

interface ProductVariant {
  sku: string;
  size: string;
  model_name: string;
}

interface ProductTabsProps {
  features?: string;
  specifications?: Record<string, string>;
  variants?: ProductVariant[];
  locale: string;
}

const labels = {
  th: {
    features: 'คุณสมบัติ',
    specs: 'ข้อมูลจำเพาะ',
    variants: 'รุ่นที่มีจำหน่าย',
    sku: 'รหัสสินค้า',
    size: 'ขนาด',
    model: 'รุ่น',
    noData: 'ไม่มีข้อมูล',
  },
  en: {
    features: 'Features',
    specs: 'Specifications',
    variants: 'Available Models',
    sku: 'Model Code',
    size: 'Dimensions',
    model: 'Variant',
    noData: 'No data available',
  },
};

export default function ProductTabs({ features, specifications, variants, locale }: ProductTabsProps) {
  const t = labels[locale as 'th' | 'en'] ?? labels.th;
  const tabs = [
    { key: 'features', label: t.features, show: !!features },
    { key: 'specs', label: t.specs, show: !!(specifications && Object.keys(specifications).length > 0) },
    { key: 'variants', label: t.variants, show: !!(variants && variants.length > 0) },
  ].filter((tab) => tab.show);

  const [active, setActive] = useState(tabs[0]?.key ?? 'features');

  if (tabs.length === 0) return null;

  return (
    <div className="mt-16">
      {/* Tab bar */}
      <div className="flex border-b border-neutral-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`relative px-6 py-3 text-xs uppercase tracking-widest transition-colors duration-200 ${
              active === tab.key
                ? 'text-primary font-medium'
                : 'text-secondary hover:text-primary'
            }`}
          >
            {tab.label}
            {active === tab.key && (
              <span className="absolute bottom-0 left-0 w-full h-px bg-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="pt-8">
        {active === 'features' && features && (
          <p className="text-secondary font-light text-sm leading-relaxed whitespace-pre-line">
            {features}
          </p>
        )}

        {active === 'specs' && specifications && (
          <dl className="space-y-3">
            {Object.entries(specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b border-neutral-50 pb-3">
                <dt className="text-xs text-secondary uppercase tracking-widest">{key}</dt>
                <dd className="text-xs text-primary font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        )}

        {active === 'variants' && variants && variants.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="text-left px-5 py-3 text-xs font-medium tracking-widest">{t.sku}</th>
                  <th className="text-left px-5 py-3 text-xs font-medium tracking-widest">{t.size}</th>
                  <th className="text-left px-5 py-3 text-xs font-medium tracking-widest">{t.model}</th>
                </tr>
              </thead>
              <tbody>
                {variants.map((v, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                    <td className="px-5 py-3 text-xs text-amber-600 font-medium">{v.sku}</td>
                    <td className="px-5 py-3 text-xs text-secondary">{v.size}</td>
                    <td className="px-5 py-3 text-xs text-secondary">{v.model_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
