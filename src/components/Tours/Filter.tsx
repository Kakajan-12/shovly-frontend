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

const Filter: React.FC<FilterProps> = () => {
    const s = useTranslations("Search");

    const [searchValue, setSearchValue] = useState("");

    return (
        <div className="w-full mb-6">
            <div className="relative mb-6">
                <IoMdSearch size={24} className="absolute top-3 left-3 text-gray-500"/>
                <input
                    type="text"
                    placeholder={s("search")}
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                    className="w-full pl-10 py-3 rounded-lg text-gray-700 border-2 border-[#2A4393] focus:outline-none transition-all"
                />
            </div>
        </div>
    );
};

export default Filter;
