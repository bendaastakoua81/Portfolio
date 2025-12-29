import { useState } from "react";
import styles from "./Skills.module.css";

const skillCategories = [
  {
    name: "HTML & CSS",
    front: "Decent level - Semantic markup & modern layouts",
    back: "Responsive design, Flexbox, Grid, animations, custom styling",
  },
  {
    name: "JavaScript",
    front: "Decent level - ES6+ & DOM manipulation",
    back: "Async/await, APIs, event handling, modern syntax",
  },
  {
    name: "React",
    front: "Used in labs - Components & Hooks",
    back: "State management, routing, performance optimization",
  },
  {
    name: "AI & Machine Learning",
    front: "Familiar with AI models",
    back: "Used TensorFlow for projects, understanding of neural networks, data preprocessing, and model training basics",
  },
];

const tools = ["Git", "Vite", "VS Code", "Jupyter notebook", "Render"];

function Skills() {
  const [flippedIndices, setFlippedIndices] = useState([]);

  const toggleFlip = (index) => {
    setFlippedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section id="skills" className={styles.skills}>
      <h2>My Skills</h2>

      <div className={styles.skillsGrid}>
        {skillCategories.map((skill, i) => (
          <div
            key={i}
            className={`${styles.flipCard} ${
              flippedIndices.includes(i) ? styles.flipped : ""
            }`}
            onClick={() => toggleFlip(i)}
          >
            <div className={styles.flipCardFront}>
              <h3>{skill.name}</h3>
              <p>{skill.front}</p>
            </div>
            <div className={styles.flipCardBack}>
              <h3>{skill.name}</h3>
              <p>{skill.back}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.toolsSection}>
        <h3>Tools & Technologies</h3>
        <div className={styles.toolsList}>
          {tools.map((tool, i) => (
            <span key={i} className={styles.toolTag}>
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
