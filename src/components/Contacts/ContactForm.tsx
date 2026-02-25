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
            setError('Failed to load captcha');
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
                    setError(data.error || 'Failed to send message');
                }
            } else {
                setSuccess('Message sent successfully!');
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
            setError('Server error');
        } finally {
            setSending(false);
        }
    };

    return (
        <div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <form
                    className="w-full max-w-8xl space-y-8"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col sm:flex-row gap-6">
                        <input
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            name="name"
                            placeholder={t('name')}
                            required
                            className="w-full border border-[#848484] rounded-lg bg-transparent px-2 py-2 focus:outline-none transition"
                        />
                        <input
                            type="text"
                            value={formData.surname}
                            onChange={handleChange}
                            name="surname"
                            placeholder={t('surname')}
                            required
                            className="w-full border border-[#848484] rounded-lg px-2 py-2 focus:outline-none transition"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-6">
                        <input
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            name="email"
                            placeholder={t('email')}
                            required
                            className="w-full border border-[#848484] bg-white rounded-lg px-2 py-2 focus:outline-none transition"
                        />
                        <input
                            type="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            name="phone"
                            placeholder={t('phone')}
                            required
                            className="w-full border border-[#848484] bg-white rounded-lg px-2 py-2 focus:outline-none transition"
                        />
                    </div>


                    <textarea
                        value={formData.message}
                        onChange={handleChange}
                        name="message"
                        placeholder={t('message')}
                        required
                        className="w-full h-64 text-start border border-[#848484] bg-white rounded-lg px-2 py-2 focus:outline-none transition"
                    />

                    <div className="flex flex-col items-center gap-2">
                        <div dangerouslySetInnerHTML={{__html: captchaImage}}/>

                        <input
                            name="captchaText"
                            value={formData.captchaText}
                            onChange={handleChange}
                            className={`border py-2 px-3 rounded-md max-w-40 bg-white ${
                                    captchaError ? 'border-red-500' : ''
                                }`}
                                required
                            />
                            {captchaError && <p className="text-red-500 text-xs">{captchaError}</p>}
                        </div>

                        {success && (
                            <p
                                className="text-green-600 text-center"
                            >
                                {success}
                            </p>
                        )}
                        {error && <p className="text-red-600 text-center">{error}</p>}

                        <button
                            type="submit"
                            disabled={sending}
                            className="lang-bg text-white font-semibold w-full py-3 rounded-lg"
                        >
                            {sending ? '...' : t('send')}
                        </button>
                </form>
            </div>

        </div>
);
};

export default ContactForm;
