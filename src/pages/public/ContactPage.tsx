import React, { useState } from 'react';
import { useLanguage } from '../../i18n/useLanguage';
import { PublicLayout } from '../../layouts/PublicLayout';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Info,
} from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  const tc = t.contact;

  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = tc.errorRequired;
    if (!form.email.trim()) {
      errs.email = tc.errorRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = tc.errorEmail;
    }
    if (!form.subject.trim()) errs.subject = tc.errorRequired;
    if (!form.message.trim()) {
      errs.message = tc.errorRequired;
    } else if (form.message.trim().length < 20) {
      errs.message = tc.errorMessageLen;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    // Simulate async submission — no real backend in prototype
    await new Promise((r) => setTimeout(r, 1200));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setForm({ name: '', email: '', subject: '', message: '' });
    setErrors({});
    setIsSubmitted(false);
  };

  const faqs = [
    { q: tc.faq1Q, a: tc.faq1A },
    { q: tc.faq2Q, a: tc.faq2A },
    { q: tc.faq3Q, a: tc.faq3A },
  ];

  const contactInfo = [
    { icon: Mail, label: tc.emailInfoLabel, value: tc.emailInfoVal },
    { icon: Phone, label: tc.phoneInfoLabel, value: tc.phoneInfoVal },
    { icon: Clock, label: tc.hoursLabel, value: tc.hoursVal },
    { icon: MapPin, label: tc.addressLabel, value: tc.addressVal },
  ];

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50/80 via-white to-slate-50 pt-16 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100/80 text-blue-800 border border-blue-200/60">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{tc.pageBadge}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {tc.heroHeadline}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {tc.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Form + Contact Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-1">{tc.formTitle}</h2>
                <p className="text-sm text-slate-600 mb-8 leading-relaxed">{tc.formSubtitle}</p>

                {isSubmitted ? (
                  /* Success State */
                  <div className="text-center space-y-5 py-8">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{tc.successTitle}</h3>
                      <p className="text-slate-600 mt-2">{tc.successText}</p>
                    </div>
                    <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-4 text-xs text-amber-900 text-left flex gap-2">
                      <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <p>{tc.successNote}</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
                    >
                      {tc.sendAnother}
                    </button>
                  </div>
                ) : (
                  /* Form */
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1.5">
                          {tc.nameLabel} <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder={tc.namePlaceholder}
                          className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                            errors.name ? 'border-rose-400 bg-rose-50' : 'border-slate-200 focus:border-blue-400'
                          }`}
                        />
                        {errors.name && (
                          <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
                          {tc.emailLabel} <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder={tc.emailPlaceholder}
                          className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                            errors.email ? 'border-rose-400 bg-rose-50' : 'border-slate-200 focus:border-blue-400'
                          }`}
                        />
                        {errors.email && (
                          <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-1.5">
                        {tc.subjectLabel} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder={tc.subjectPlaceholder}
                        className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                          errors.subject ? 'border-rose-400 bg-rose-50' : 'border-slate-200 focus:border-blue-400'
                        }`}
                      />
                      {errors.subject && (
                        <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.subject}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-1.5">
                        {tc.messageLabel} <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={form.message}
                        onChange={handleChange}
                        placeholder={tc.messagePlaceholder}
                        className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 resize-none ${
                          errors.message ? 'border-rose-400 bg-rose-50' : 'border-slate-200 focus:border-blue-400'
                        }`}
                      />
                      {errors.message && (
                        <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Prototype Notice */}
                    <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 text-xs text-amber-900 flex gap-2">
                      <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <p>{tc.prototypeNote}</p>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-xl shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 active:scale-95"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          <span>{tc.submitting}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>{tc.submitButton}</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-6">
              <div className="bg-slate-50 rounded-2xl p-7 border border-slate-200/80 space-y-5">
                <h3 className="text-lg font-bold text-slate-900">{tc.infoTitle}</h3>
                <ul className="space-y-4">
                  {contactInfo.map((ci) => {
                    const Icon = ci.icon;
                    return (
                      <li key={ci.label} className="flex items-start gap-3.5">
                        <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{ci.label}</p>
                          <p className="text-sm text-slate-800 mt-0.5">{ci.value}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* FAQ */}
              <div className="bg-white rounded-2xl p-7 border border-slate-200/80 space-y-4 shadow-xs">
                <h3 className="text-lg font-bold text-slate-900">{tc.faqTitle}</h3>
                <div className="space-y-2">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="border border-slate-200/80 rounded-xl overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                        className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors text-left"
                        aria-expanded={expandedFaq === idx}
                      >
                        <span>{faq.q}</span>
                        {expandedFaq === idx ? (
                          <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                      </button>
                      {expandedFaq === idx && (
                        <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed bg-slate-50 border-t border-slate-200/60">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};
