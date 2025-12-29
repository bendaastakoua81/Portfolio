import { useRef, useEffect } from "react";
import styles from "./Projects.module.css";

const labs = [
  {
    title: "Kanban Board App",
    description:
      "A full-featured Kanban board for task management with drag-and-drop functionality.",
    github: "https://kanbanboard-6fdg.onrender.com/",
  },
  {
    title: "Medical Website.",
    description:
      "A smart document scanning web app powered by AI for text extraction, image enhancement, and intelligent processing.",
    github: "https://github.com/salsabilbou2019-web/caw-labs/tree/project",
  },
  {
    title: "Project Setup",
    description: "Initial setup and structure using basic HTML and CSS.",
    github: "https://github.com/salsabilbou2019-web/caw-labs/tree/lab3-setup",
  },
  {
    title: "Jest Testing",
    description:
      "JavaScript functions tested with Jest, covering array manipulation, string processing, and more.",
    github: "https://github.com/salsabilbou2019-web/caw-labs/tree/lab4-jest",
  },
  {
    title: "React Component",
    description:
      "A lab focused on building reusable and interactive React components.",
    github: "https://github.com/salsabilbou2019-web/caw-labs/tree/lab5",
  },
];

export default function Projects() {
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const paused = useRef(false);
  const animationId = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const autoScroll = () => {
      if (!paused.current && !isDragging.current) {
        track.scrollLeft += 1;
        if (track.scrollLeft >= track.scrollWidth / 2) {
          track.scrollLeft = 0;
        }
      }
      animationId.current = requestAnimationFrame(autoScroll);
    };

    animationId.current = requestAnimationFrame(autoScroll);

    const down = (e) => {
      isDragging.current = true;
      startX.current = e.pageX - track.offsetLeft;
      scrollStart.current = track.scrollLeft;
      paused.current = true;
    };

    const move = (e) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      track.scrollLeft = scrollStart.current - (x - startX.current);
    };

    const stop = () => {
      isDragging.current = false;
      paused.current = false;
    };

    const touchStart = (e) => {
      isDragging.current = true;
      startX.current = e.touches[0].pageX - track.offsetLeft;
      scrollStart.current = track.scrollLeft;
      paused.current = true;
    };

    const touchMove = (e) => {
      if (!isDragging.current) return;
      const x = e.touches[0].pageX - track.offsetLeft;
      track.scrollLeft = scrollStart.current - (x - startX.current);
    };

    const touchEnd = stop;

    const enter = () => (paused.current = true);
    const leave = () => {
      paused.current = false;
      isDragging.current = false;
    };

    track.addEventListener("mousedown", down);
    track.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stop);

    track.addEventListener("touchstart", touchStart, { passive: true });
    track.addEventListener("touchmove", touchMove, { passive: true });
    window.addEventListener("touchend", touchEnd);

    track.addEventListener("mouseenter", enter);
    track.addEventListener("mouseleave", leave);

    return () => {
      cancelAnimationFrame(animationId.current);
      track.removeEventListener("mousedown", down);
      track.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", stop);

      track.removeEventListener("touchstart", touchStart);
      track.removeEventListener("touchmove", touchMove);
      window.removeEventListener("touchend", touchEnd);

      track.removeEventListener("mouseenter", enter);
      track.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <section id="projects" className={styles.projects}>
      <h2>My Projects</h2>

      <div className={styles.carouselWrapper} ref={trackRef}>
        <div className={styles.carouselTrack}>
          {[...labs, ...labs].map((lab, i) => (
            <div className={styles.card} key={i}>
              <h3>{lab.title}</h3>
              <p>{lab.description}</p>
              <a href={lab.github} target="_blank" rel="noreferrer">
                {lab.title === "Kanban Board App" ? "Live Demo →" : "GitHub →"}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
