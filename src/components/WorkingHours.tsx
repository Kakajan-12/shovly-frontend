
'use client';

import { useState, useEffect } from 'react';
import { FaRegClock } from "react-icons/fa";
import { useTranslations } from 'next-intl';

interface Holiday {
    date: string;
    name_key: string;
}

const holidays: Holiday[] = [
    {
        date: '01/01',
        name_key: 'newYear'
    },
    {
        date: '03/08',
        name_key: 'womensDay'
    },
    {
        date: '03/21',
        name_key: 'novruz'
    },
    {
        date: '03/22',
        name_key: 'novruz'
    },
    {
        date: '05/18',
        name_key: 'constitutionDay'
    },
    {
        date: '09/27',
        name_key: 'independenceDay'
    },
    {
        date: '12/12',
        name_key: 'neutralityDay'
    }
];

const WorkingHours = () => {
    const t = useTranslations('WorkingHours');
    const [time, setTime] = useState('');
    const [status, setStatus] = useState<'working' | 'not-working'>('not-working');
    const [statusText, setStatusText] = useState(t('notWorking'));
    const [holidayName, setHolidayName] = useState<string | null>(null);

    useEffect(() => {
        const checkWorkingStatus = () => {
            const now = new Date();
            const day = now.getDay();
            const hours = now.getHours();
            const minutes = now.getMinutes();

            const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
            setTime(formattedTime);

            const formattedDate = `${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}`;
            const holiday = holidays.find(h => h.date === formattedDate);

            const isWorkingDay = day >= 1 && day <= 5;
            const isWorkingHours = hours >= 9 && hours < 18;

            if (isWorkingDay && isWorkingHours && !holiday) {
                setStatus('working');
                setStatusText(t('working'));
                setHolidayName(null);
            } else if (holiday) {
                setStatus('not-working');
                setStatusText(t('notWorking'));
                setHolidayName(t(holiday.name_key));
            } else {
                setStatus('not-working');
                setStatusText(t('notWorking'));
                setHolidayName(null);
            }
        };

        checkWorkingStatus();
        const interval = setInterval(checkWorkingStatus, 60000);
        return () => clearInterval(interval);
    }, [t]);

    return (
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">

            <div className="flex flex-col">
                <div className="flex justify-center items-center mb-3">
                    <div className={`w-2.5 h-2.5 rounded-full mr-2 ${
                        status === 'working' ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                    }`} />
                    <span className="text-white font-medium">{statusText}</span>
                </div>

                <div className="flex items-center justify-center gap-3">
                    <FaRegClock className="w-5 h-5 text-white/80" />
                    <span className="text-3xl font-bold text-white">{time}</span>
                </div>

                {holidayName && (
                    <div className="flex justify-center mt-3">
                        <span className="text-white/80 text-sm bg-white/5 px-3 py-1 rounded-full">
                            {holidayName}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkingHours;