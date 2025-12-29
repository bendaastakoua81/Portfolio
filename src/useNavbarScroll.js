import { useEffect } from "react";

export default function useNavbarScroll() {
  useEffect(() => {
    const navbar = document.querySelector(".nav");

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.8) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}
