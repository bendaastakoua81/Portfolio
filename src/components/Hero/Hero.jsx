import styles from "./Hero.module.css";
import tt1 from "../../assets/tt1.png";
import tt2 from "../../assets/tt2.png";

function Hero() {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mouse-x", `${x}%`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}%`);
  };

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.leftSide}>
          <div className={styles.avatarContainer} onMouseMove={handleMouseMove}>
            <img src={tt1} alt="Takoua" className={styles.avatarBase} />
            <img
              src={tt2}
              alt="Takoua coding"
              className={styles.avatarReveal}
            />
          </div>

          <h1>TAKOUA</h1>
          <h2>Junior Front-End Developer</h2>
        </div>

        <div className={styles.rightSide}>
          <p>
            Computer Science student and Junior Developer. I build modern,
            responsive web applications using React and Vite. Proficient in
            HTML/CSS, and Python, with experience in AI projects using
            TensorFlow. Passionate about creating user-friendly experiences.
          </p>

          <div className={styles.buttonGroup}>
            <button
              onClick={() =>
                document.getElementById("projects").scrollIntoView()
              }
              className={styles.viewWorkBtn}
            >
              View My Work
            </button>

            <button
              onClick={() =>
                document.getElementById("contact").scrollIntoView()
              }
              className={styles.hireMeBtn}
            >
              Hire Me
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
