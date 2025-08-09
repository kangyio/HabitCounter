import { useEffect, useState } from "react";
import { ArrowUpToLineIcon } from "lucide-react";

export function BackToTopButton() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleScroll() {
    setIsScrolled(window.scrollY > 500); // Show after 100px scroll
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      className={`bg-slate-100 p-2 rounded-xl text-2xl cursor-pointer transition-transform duration-200 active:scale-95 ${
        isScrolled ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={scrollToTop}
    >
      <ArrowUpToLineIcon
        color={"#0c0a09"}
        size={40}
      />
    </button>
  );
}
