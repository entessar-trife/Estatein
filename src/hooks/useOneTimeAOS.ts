import { useEffect, useRef } from "react";

export function useOneTimeAOS(key?: string) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!key || !ref.current) return;

    const storageKey = `aos-seen:${key}`;
    const seen = sessionStorage.getItem(storageKey);

    if (seen === "1") {

      ref.current.classList.add("aos-init", "aos-animate");
      ref.current.removeAttribute("data-aos");
      ref.current.removeAttribute("data-aos-delay");
      ref.current.removeAttribute("data-aos-duration");
    } else {

      ref.current.setAttribute("data-aos-once", "true");

      const markSeen = () => sessionStorage.setItem(storageKey, "1");

      ref.current.addEventListener("transitionend", markSeen, { once: true });
      return () => ref.current?.removeEventListener("transitionend", markSeen);
    }
  }, [key]);

  return ref;
}
