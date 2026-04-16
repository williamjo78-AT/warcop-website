"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ko from "../../locales/ko.json";
import en from "../../locales/en.json";
import id from "../../locales/id.json";

const locales: Record<string, Record<string, string>> = { ko, en, id };
const langNames: Record<string, string> = { ko: "한국어", en: "English", id: "Bahasa" };

export default function PrivacyPage() {
  const [lang, setLang] = useState("ko");
  const t = locales[lang];

  const section = (title: string, body: string) => (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-[#2D3748] mb-3 border-b border-orange-100 pb-2">
        {title}
      </h2>
      <div className="text-[#4A5568] leading-relaxed whitespace-pre-line">
        {body}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-orange-100">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/icon.png" alt="WARCOP" width={36} height={36} className="rounded-lg" />
            <span className="text-lg font-bold text-[#2D3748]">WARCOP</span>
          </Link>
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

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
          <h1 className="text-3xl font-extrabold text-[#2D3748] mb-2">
            {t.privacy_title}
          </h1>
          <p className="text-sm text-[#718096] mb-8">
            {t.privacy_effective}
          </p>
          <p className="text-[#4A5568] leading-relaxed mb-10">
            {t.privacy_intro}
          </p>

          {section(t.privacy_s1_title, t.privacy_s1_body)}
          {section(t.privacy_s2_title, t.privacy_s2_body)}
          {section(t.privacy_s3_title, t.privacy_s3_body)}
          {section(t.privacy_s4_title, t.privacy_s4_body)}
          {section(t.privacy_s5_title, t.privacy_s5_body)}
          {section(t.privacy_s6_title, t.privacy_s6_body)}
          {section(t.privacy_s7_title, t.privacy_s7_body)}
          {section(t.privacy_s8_title, t.privacy_s8_body)}

          <div className="mt-10 pt-6 border-t border-orange-100 flex flex-wrap gap-3">
            <Link
              href="/delete-account"
              className="px-4 py-2 bg-[#C53030] text-white rounded-full text-sm font-semibold hover:bg-[#9B2C2C] transition-all"
            >
              {t.delete_account_link}
            </Link>
            <Link
              href="/"
              className="px-4 py-2 bg-orange-50 text-[#2D3748] rounded-full text-sm font-semibold hover:bg-orange-100 transition-all"
            >
              ← {t.back_home}
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#2D3748] py-8 mt-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-4">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
              {t.privacy}
            </Link>
            <Link href="/delete-account" className="text-gray-400 hover:text-white text-sm">
              {t.delete_account_link}
            </Link>
          </div>
          <p className="text-gray-500 text-sm">{t.footer_rights}</p>
        </div>
      </footer>
    </div>
  );
}
