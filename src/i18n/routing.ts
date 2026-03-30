import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['en', 'ru', 'tk', 'ar', 'ja', 'ko', 'zh'],

    defaultLocale: 'en'
});