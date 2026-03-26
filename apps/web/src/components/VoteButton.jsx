"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/lib/i18n";

export default function VoteButton({ personId }) {
  const { t } = useTranslation();
  const [hasVoted, setHasVoted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [voteCount, setVoteCount] = useState(0);

  useEffect(() => {
    const voted = localStorage.getItem(`voted-${personId}`);
    const count = localStorage.getItem(`voteCount-${personId}`);
    setHasVoted(voted === "true");
    setVoteCount(count ? parseInt(count) : 0);
  }, [personId]);

  const handleVote = () => {
    if (hasVoted) return;

    const newCount = voteCount + 1;
    setVoteCount(newCount);
    setHasVoted(true);
    localStorage.setItem(`voted-${personId}`, "true");
    localStorage.setItem(`voteCount-${personId}`, newCount.toString());

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
      <button
        onClick={handleVote}
        disabled={hasVoted}
        className={`w-full py-4 font-bold transition-colors ${
          hasVoted
            ? "bg-[#f5f5f5] text-[#999] cursor-not-allowed"
            : "bg-[#1e3a8a] text-white hover:bg-[#1e40af]"
        }`}
      >
        {hasVoted ? t("vote.voted") : t("vote.action")}
      </button>
      {voteCount > 0 && (
        <p className="text-xs text-[#999] mt-2 text-center">
          {t("vote.count", { count: voteCount })}
        </p>
      )}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-[#1e3a8a] text-white px-6 py-3 shadow-lg z-50">
          {t("vote.toast")}
        </div>
      )}
    </>
  );
}
