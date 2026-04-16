"use client";

import { useState } from "react";
import Image from "next/image";
import ko from "../locales/ko.json";
import en from "../locales/en.json";
import id from "../locales/id.json";

const locales: Record<string, Record<string, string>> = { ko, en, id };
const langNames: Record<string, string> = { ko: "한국어", en: "English", id: "Bahasa" };

export default function Home() {
  const [lang, setLang] = useState("ko");
  const t = locales[lang];

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-orange-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/icon.png" alt="WARCOP" width={40} height={40} className="rounded-lg" />
            <span className="text-xl font-bold text-[#2D3748]">WARCOP</span>
          </div>
          <div className="flex gap-1">
            {Object.entries(langNames).map(([key, name]) => (
              <button
                key={key}
                onClick={() => setLang(key)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  lang === key
                    ? "bg-[#C53030] text-white"
                    : "bg-orange-50 text-[#2D3748] hover:bg-orange-100"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#FFD9B8] via-[#FFECD2] to-[#FFFBF5] py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="mb-6">
            <Image src="/icon.png" alt="WARCOP" width={80} height={80} className="mx-auto rounded-2xl shadow-lg" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#2D3748] mb-4 leading-tight">
            {t.hero_title}
          </h1>
          <p className="text-lg md:text-xl text-[#4A5568] max-w-2xl mx-auto">
            {t.hero_subtitle}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a href="#services" className="px-6 py-3 bg-[#C53030] text-white rounded-full font-semibold hover:bg-[#9B2C2C] transition-all shadow-lg">
              {t.services_title}
            </a>
            <a href="#contact" className="px-6 py-3 bg-white text-[#C53030] rounded-full font-semibold border-2 border-[#C53030] hover:bg-red-50 transition-all">
              {t.contact_title}
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D3748] mb-4">{t.about_title}</h2>
          <p className="text-xl text-[#C53030] font-semibold mb-6 italic">
            &ldquo;{t.about_mission}&rdquo;
          </p>
          <p className="text-lg text-[#4A5568] leading-relaxed">
            {t.about_desc}
          </p>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 md:py-24 bg-[#FFFBF5]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2D3748] mb-12">{t.services_title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all border border-orange-100">
              <div className="text-5xl mb-4">🍛</div>
              <h3 className="text-xl font-bold text-[#2D3748] mb-3">{t.svc1_title}</h3>
              <p className="text-[#4A5568]">{t.svc1_desc}</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all border border-orange-100 relative">
              <span className="absolute top-4 right-4 bg-[#C53030] text-white text-xs px-3 py-1 rounded-full font-semibold">
                {t.svc2_badge}
              </span>
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-[#2D3748] mb-3">{t.svc2_title}</h3>
              <p className="text-[#4A5568]">{t.svc2_desc}</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all border border-orange-100">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-[#2D3748] mb-3">{t.svc3_title}</h3>
              <p className="text-[#4A5568]">{t.svc3_desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Information */}
      <section id="company" className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2D3748] mb-12">{t.company_title}</h2>
          <div className="bg-[#FFFBF5] rounded-2xl p-8 md:p-12 border border-orange-100">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { label: t.company_name_label, value: t.company_name },
                { label: t.reg_number_label, value: t.reg_number },
                { label: t.ceo_label, value: t.ceo },
                { label: t.founded_label, value: t.founded },
                { label: t.address_label, value: t.address, full: true },
                { label: t.phone_label, value: t.phone },
                { label: t.email_label, value: t.email, isEmail: true },
              ].map((item, i) => (
                <div key={i} className={item.full ? "md:col-span-2" : ""}>
                  <p className="text-sm text-[#A0AEC0] font-medium mb-1">{item.label}</p>
                  <p className="text-lg text-[#2D3748] font-semibold">
                    {item.isEmail ? (
                      <a href={`mailto:${item.value}`} className="text-[#C53030] hover:underline">{item.value}</a>
                    ) : (
                      item.value
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-[#C53030] to-[#9B2C2C]">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.contact_title}</h2>
          <p className="text-lg mb-8 opacity-90">{t.contact_desc}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="mailto:dev@warcop.kr" className="flex items-center justify-center gap-2 bg-white text-[#C53030] px-8 py-4 rounded-full font-semibold hover:bg-orange-50 transition-all shadow-lg">
              📧 dev@warcop.kr
            </a>
            <a href="tel:+821041886707" className="flex items-center justify-center gap-2 bg-white/20 text-white px-8 py-4 rounded-full font-semibold border-2 border-white/50 hover:bg-white/30 transition-all">
              📞 010-4188-6707
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2D3748] py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-4 flex-wrap">
            <a href="/privacy" className="text-gray-400 hover:text-white text-sm transition-all">{t.privacy}</a>
            <a href="/delete-account" className="text-gray-400 hover:text-white text-sm transition-all">{t.delete_account_link}</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-all">{t.terms}</a>
          </div>
          <p className="text-gray-500 text-sm">{t.footer_rights}</p>
        </div>
      </footer>
    </div>
  );
}
