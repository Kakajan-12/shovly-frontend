'use client';

import {useTranslations} from 'next-intl';
import {useEffect, useState} from 'react';

const ContactForm = () => {
    const t = useTranslations('Contacts');

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        phone: '',
        message: '',
        captchaText: '',
    });

    const [captchaImage, setCaptchaImage] = useState('');
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [captchaError, setCaptchaError] = useState<string | null>(null);

    const loadCaptcha = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/captcha`, {
                method: 'GET',
                credentials: 'include',
            });
            const svg = await res.text();
            setCaptchaImage(svg);
        } catch {
            setError(t('failed-captcha'));
        }
    };

    useEffect(() => {
        loadCaptcha();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        setError(null);
        setCaptchaError(null);
        setSuccess(null);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/send`, {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                if (data?.error?.toLowerCase().includes('captcha')) {
                    setCaptchaError(data.error);
                    setFormData((prev) => ({...prev, captchaText: ''}));
                    await loadCaptcha();
                } else {
                    setError(data.error || t('failed-send'));
                }
            } else {
                setSuccess(t('success-send'));
                setFormData({
                    name: '',
                    surname: '',
                    email: '',
                    phone: '',
                    message: '',
                    captchaText: '',
                });
                await loadCaptcha();
                setTimeout(() => setSuccess(null), 5000);
            }
        } catch {
            setError(t('server-error'));
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="w-full">
            {/* Section Header */}
            <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-raleway">
                    {t('form-title')}
                </h2>
                <div className="w-20 h-1 rounded-full mb-4"
                     style={{ background: 'linear-gradient(90deg, #2A4393 0%, #3E74B4 100%)' }}></div>
                <p className="text-gray-600 font-nunito">
                    {t('form-subtitle')}
                </p>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl"
                 style={{ boxShadow: '0 20px 60px rgba(42, 67, 147, 0.08)' }}>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 font-raleway">
                                {t('name')} <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                name="name"
                                placeholder={t('placeholder-name')}
                                required
                                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#2A4393] focus:bg-white focus:outline-none transition-all font-nunito"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 font-raleway">
                                {t('surname')} <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.surname}
                                onChange={handleChange}
                                name="surname"
                                placeholder={t('placeholder-surname')}
                                required
                                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#2A4393] focus:bg-white focus:outline-none transition-all font-nunito"
                            />
                        </div>
                    </div>

                    {/* Contact Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 font-raleway">
                                {t('email')} <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                name="email"
                                placeholder={t('placeholder-email')}
                                required
                                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#2A4393] focus:bg-white focus:outline-none transition-all font-nunito"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 font-raleway">
                                {t('number')} <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                name="phone"
                                placeholder={t('placeholder-phone')}
                                required
                                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#2A4393] focus:bg-white focus:outline-none transition-all font-nunito"
                            />
                        </div>
                    </div>

                    {/* Message Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 font-raleway">
                            {t('message')} <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={formData.message}
                            onChange={handleChange}
                            name="message"
                            placeholder={t('placeholder-message')}
                            required
                            rows={6}
                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#2A4393] focus:bg-white focus:outline-none transition-all resize-none font-nunito"
                        />
                    </div>

                    {/* Captcha Section */}
                    <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                        <label className="block text-sm font-medium text-gray-700 font-raleway">
                            {t('security-check')} <span className="text-red-500">*</span>
                        </label>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="bg-white p-3 rounded-xl border-2 border-gray-200"
                                 dangerouslySetInnerHTML={{__html: captchaImage}}/>
                            <div className="flex-grow">
                                <input
                                    name="captchaText"
                                    value={formData.captchaText}
                                    onChange={handleChange}
                                    placeholder={t('captcha-placeholder')}
                                    className={`w-full px-4 py-3 bg-white border-2 rounded-xl focus:outline-none transition-all font-nunito ${
                                        captchaError ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#2A4393]'
                                    }`}
                                    required
                                />
                                {captchaError && (
                                    <p className="text-red-500 text-sm mt-2 font-nunito">{captchaError}</p>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={loadCaptcha}
                                className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                                title={t('refresh-captcha')}
                            >
                                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Status Messages */}
                    {success && (
                        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-center gap-3">
                            <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-green-700 font-medium font-nunito">{success}</p>
                        </div>
                    )}
                    {error && (
                        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-center gap-3">
                            <svg className="w-6 h-6 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-red-700 font-medium font-nunito">{error}</p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={sending}
                        className="w-full py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 font-raleway"
                        style={{
                            background: sending ? '#9CA3AF' : 'linear-gradient(135deg, #2A4393 0%, #3E74B4 100%)'
                        }}
                    >
                        {sending ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {t('sending')}
                            </>
                        ) : (
                            <>
                                {t('send')}
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;
