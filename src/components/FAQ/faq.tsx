'use client';

import {ChevronDown, ChevronUp} from 'lucide-react';

export default function FAQAccordion() {

    return (
        <div className="w-full min-w-3xl mx-auto bg-white rounded-2xl shadow-md divide-y divide-gray-200">
            <div>
                <button
                    className="flex justify-between items-center w-full px-6 py-4 text-left font-semibold text-gray-800 hover:text-[#A40000] transition-colors"
                >
                    <span className="text-lg sm:text-xl">title</span>
                    <ChevronUp className="w-5 h-5 text-[#A40000] transition-transform duration-200"/>
                    <ChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-200"/>
                </button>

                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out max-h-96 py-3 max-h-0`}
                >
                    <p className="px-6 pb-4 text-gray-700 text-sm sm:text-lg leading-relaxed">
                        text
                    </p>
                </div>
            </div>
        </div>
    );
}
