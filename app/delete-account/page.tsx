"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ko from "../../locales/ko.json";
import en from "../../locales/en.json";
import id from "../../locales/id.json";

const locales: Record<string, Record<string, string>> = { ko, en, id };
const langNames: Record<string, string> = { ko: "한국어", en: "English", id: "Bahasa" };

const SUPABASE_URL = "https://llgtnubckwgwwfztjvic.supabase.co";
const ENDPOINT = `${SUPABASE_URL}/functions/v1/account-deletion-request`;

type Status = "idle" | "submitting" | "success" | "error" | "duplicate" | "invalid_email";

export default function DeleteAccountPage() {
  const [lang, setLang] = useState("ko");
  const t = locales[lang];

  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState<string>("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!emailRegex.test(trimmed)) {
      setStatus("invalid_email");
      return;
    }

    setStatus("submitting");
    setServerMessage("");

    try {
      const resp = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, reason, language: lang }),
      });
      const data = await resp.json();

      if (resp.ok && data.success) {
        setStatus("success");
        setServerMessage(data.message || t.delete_success);
        setEmail("");
        setReason("");
      } else if (resp.status === 429 || data.error === "duplicate_request") {
        setStatus("duplicate");
        setServerMessage(data.message || t.delete_duplicate);
      } else {
        setStatus("error");
        setServerMessage(data.message || t.delete_error);
      }
    } catch (err) {
      console.error("[DeleteAccount] submit error:", err);
      setStatus("error");
      setServerMessage(t.delete_error);
    }
  };

  const block = (title: string, body: string) => (
    <section className="mb-6">
      <h3 className="text-lg font-bold text-[#2D3748] mb-2">{title}</h3>
      <div className="text-[#4A5568] leading-relaxed whitespace-pre-line text-sm">
        {body}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-orange-100">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
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

      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
          <h1 className="text-3xl font-extrabold text-[#2D3748] mb-4">
            {t.delete_title}
          </h1>
          <p className="text-[#4A5568] leading-relaxed mb-8">
            {t.delete_intro}
          </p>

          {/* Method */}
          <section className="mb-8 p-5 bg-orange-50 rounded-xl border border-orange-100">
            <h3 className="text-lg font-bold text-[#2D3748] mb-3">
              {t.delete_method_title}
            </h3>
            <ul className="space-y-2 text-sm text-[#4A5568]">
              <li>{t.delete_method_app}</li>
              <li>{t.delete_method_web}</li>
              <li>{t.delete_method_email}</li>
            </ul>
          </section>

          {block(t.delete_data_title, t.delete_data_list)}
          {block(t.delete_retain_title, t.delete_retain_list)}

          {/* Form */}
          <section className="mt-10 p-6 bg-[#FFF8F0] rounded-xl border border-orange-200">
            <h3 className="text-xl font-bold text-[#2D3748] mb-4">
              {t.delete_form_title}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#2D3748] mb-1">
                  {t.delete_email_label}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.delete_email_placeholder}
                  className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C53030] focus:border-transparent bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2D3748] mb-1">
                  {t.delete_reason_label}
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder={t.delete_reason_placeholder}
                  rows={3}
                  maxLength={1000}
                  className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C53030] focus:border-transparent bg-white resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full px-6 py-3 bg-[#C53030] text-white rounded-full font-semibold hover:bg-[#9B2C2C] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? t.delete_submitting : t.delete_submit}
              </button>

              {status === "success" && (
                <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-sm text-green-800">
                  ✅ {serverMessage || t.delete_success}
                </div>
              )}
              {status === "duplicate" && (
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-800">
                  ⚠️ {serverMessage || t.delete_duplicate}
                </div>
              )}
              {status === "invalid_email" && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-800">
                  ❌ {t.delete_invalid_email}
                </div>
              )}
              {status === "error" && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-800">
                  ❌ {serverMessage || t.delete_error}
                </div>
              )}
            </form>
          </section>

          <div className="mt-10 pt-6 border-t border-orange-100 flex flex-wrap gap-3">
            <Link
              href="/privacy"
              className="px-4 py-2 bg-orange-50 text-[#2D3748] rounded-full text-sm font-semibold hover:bg-orange-100 transition-all"
            >
              {t.privacy}
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
