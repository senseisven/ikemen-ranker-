"use client";

import { useState } from "react";
import { categories } from "@/lib/data";

export default function CategoryFilters({ allPeople, tags, categorySlug }) {
  const [sortBy, setSortBy] = useState("score");
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const sortedFiltered = () => {
    let result = [...allPeople];

    if (selectedTags.length > 0) {
      result = result.filter((p) =>
        selectedTags.some((tag) => p.tags.includes(tag)),
      );
    }

    switch (sortBy) {
      case "score":
        return result.sort((a, b) => b.scoreTotal - a.scoreTotal);
      case "recent":
        return result.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
      default:
        return result;
    }
  };

  const displayPeople = sortedFiltered();

  return (
    <>
      <div className="mb-8 pb-6 border-b border-[#e5e5e5]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm">並び替え</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy("score")}
              className={`px-4 py-2 text-sm border transition-colors ${
                sortBy === "score"
                  ? "bg-[#1e3a8a] text-white border-[#1e3a8a]"
                  : "border-[#e5e5e5] hover:border-[#1e3a8a]"
              }`}
            >
              スコア順
            </button>
            <button
              onClick={() => setSortBy("recent")}
              className={`px-4 py-2 text-sm border transition-colors ${
                sortBy === "recent"
                  ? "bg-[#1e3a8a] text-white border-[#1e3a8a]"
                  : "border-[#e5e5e5] hover:border-[#1e3a8a]"
              }`}
            >
              新着順
            </button>
          </div>
        </div>

        {tags.length > 0 && (
          <div>
            <h3 className="font-bold text-sm mb-3">タグで絞り込み</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 text-xs border transition-colors ${
                    selectedTags.includes(tag)
                      ? "bg-[#1e3a8a] text-white border-[#1e3a8a]"
                      : "border-[#e5e5e5] hover:border-[#1e3a8a]"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mb-4 text-sm text-[#666]">
        {displayPeople.length}件の掲載
      </div>

      <div className="space-y-0">
        {displayPeople.map((person, index) => (
          <a
            key={person.id}
            href={`/p/${person.slug}`}
            className="flex items-center gap-6 py-6 border-b border-[#e5e5e5] hover:bg-[#fafafa] px-6 -mx-6 transition-colors"
          >
            <div className="w-12 text-center flex-shrink-0">
              <span className="text-2xl font-bold text-[#999]">
                {index + 1}
              </span>
            </div>
            <div className="w-20 h-20 bg-[#f5f5f5] flex-shrink-0 relative overflow-hidden">
              <img
                src={person.image.src}
                alt={person.image.alt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-bold mb-1">{person.nameJa}</h3>
              <p className="text-sm text-[#666] mb-2">{person.title}</p>
              <div className="flex gap-2">
                {person.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-[#999] border border-[#e5e5e5] px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-sm text-[#999] mb-1">Total Score</div>
              <div className="text-3xl font-bold">{person.scoreTotal}</div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
