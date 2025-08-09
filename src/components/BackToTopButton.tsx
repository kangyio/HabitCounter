import { useEffect, useState } from "react";
import { ArrowUpToLineIcon } from "lucide-react";

export function BackToTopButton() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleScroll() {
    setIsScrolled(window.scrollY > 500);
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      className={`bg-slate-100 p-2 rounded-xl cursor-pointer transition-transform duration-200 active:scale-95 ${
        isScrolled ? "flex" : "hidden"
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
