'use client';

import {useState} from "react";
import {useTranslations} from "next-intl";
import {IoMdSearch} from "react-icons/io";
import {Tour} from "@/types/tour"

interface FilterProps {
    tours: Tour[];
    setFilteredTours: React.Dispatch<React.SetStateAction<Tour[]>>;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Filter: React.FC<FilterProps> = ({ tours, setFilteredTours, setCurrentPage }) => {
    const s = useTranslations("Search");
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = (value: string) => {
        setSearchValue(value);
        setCurrentPage(1);

        if (!value.trim()) {
            setFilteredTours(tours);
            return;
        }

        const searchLower = value.toLowerCase();
        const filtered = tours.filter(tour => {
            // Search across all language fields
            const titleEn = (tour.title_en || '').toLowerCase();
            const titleRu = (tour.title_ru || '').toLowerCase();
            const titleTk = (tour.title_tk || '').toLowerCase();
            const typeEn = (tour.type_en || '').toLowerCase();
            const typeRu = (tour.type_ru || '').toLowerCase();
            const typeTk = (tour.type_tk || '').toLowerCase();

            return titleEn.includes(searchLower) ||
                   titleRu.includes(searchLower) ||
                   titleTk.includes(searchLower) ||
                   typeEn.includes(searchLower) ||
                   typeRu.includes(searchLower) ||
                   typeTk.includes(searchLower);
        });

        setFilteredTours(filtered);
    };

    return (
        <div className="w-full mb-8">
            <div className="relative">
                <IoMdSearch size={24} className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400"/>
                <input
                    type="text"
                    placeholder={s("search")}
                    value={searchValue}
                    onChange={e => handleSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-700 bg-white border-2 border-gray-200 focus:border-[#2A4393] focus:outline-none transition-all shadow-sm hover:shadow-md font-nunito"
                />
                {searchValue && (
                    <button
                        onClick={() => handleSearch('')}
                        className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Filter;
