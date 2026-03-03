'use client';

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { IoMdSearch } from "react-icons/io";
import { Blog } from "@/types/blog";

interface FilterProps {
    blogs: Blog[];
    setFilteredBlogs: React.Dispatch<React.SetStateAction<Blog[]>>;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const BlogFilter: React.FC<FilterProps> = ({ blogs, setFilteredBlogs, setCurrentPage }) => {
    const s = useTranslations("Search");
    const lang = useLocale();
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        let filtered = [...blogs];

        if (searchValue.trim()) {
            const lower = searchValue.toLowerCase();

            filtered = filtered.filter((blog) => {
                const title = (blog[`title_${lang}` as keyof Blog] as string) || "";
                return title.toLowerCase().includes(lower);
            });
        }

        setFilteredBlogs(filtered);
        setCurrentPage(1);
    }, [searchValue, blogs, lang]);

    return (
        <div className="w-full mb-6">
            <div className="relative">
                <IoMdSearch size={24} className="absolute top-3 left-3 text-gray-500" />
                <input
                    type="text"
                    placeholder={s("search")}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="w-full pl-10 py-3 rounded-lg bg-[#F3F3F3] text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                />
            </div>
        </div>
    );
};

export default BlogFilter;