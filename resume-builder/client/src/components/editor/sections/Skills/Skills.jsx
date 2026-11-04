import React, { useState } from 'react';
import { useResume } from '../../../../context/ResumeContext';
import styles from './Skills.module.css';
import { Plus, X, Wrench } from 'lucide-react';

const SUGGESTED_SKILLS = [
  "React", "Node.js", "TypeScript", "JavaScript", "Python",
  "Docker", "AWS", "SQL", "Git", "System Design", "REST APIs", "TailwindCSS"
];

export const Skills = () => {
  const { resumeData, addListItem, updateListItem, removeListItem } = useResume();
  const skills = resumeData.skills || [];
  const [newSkillText, setNewSkillText] = useState("");

  const handleAddSkill = (skillName) => {
    const name = (skillName || newSkillText).trim();
    if (!name) return;
    if (skills.some(s => s.name.toLowerCase() === name.toLowerCase())) {
      setNewSkillText("");
      return;
    }

    addListItem("skills", {
      name,
      level: 4,
      category: "Technical"
    });
    setNewSkillText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Skills & Proficiencies</h2>
          <p className={styles.subtitle}>Add technical, functional, and leadership skills that match your target role.</p>
        </div>
      </div>

      {/* Input bar */}
      <div className={styles.inputBar}>
        <input
          type="text"
          value={newSkillText}
          onChange={(e) => setNewSkillText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a skill and press Enter (e.g. Next.js)..."
          className={styles.input}
        />
        <button type="button" onClick={() => handleAddSkill()} className={styles.addBtn}>
          <Plus size={16} /> Add Skill
        </button>
      </div>

      {/* Suggested skill pills */}
      <div className={styles.suggested}>
        <span className={styles.suggestedLabel}>Quick Add:</span>
        {SUGGESTED_SKILLS.filter(s => !skills.some(sk => sk.name.toLowerCase() === s.toLowerCase())).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => handleAddSkill(item)}
            className={styles.pill}
          >
            + {item}
          </button>
        ))}
      </div>

      {/* Active Skills List */}
      <div className={styles.skillsList}>
        {skills.map((skill) => (
          <div key={skill.id} className={styles.skillCard}>
            <div className={styles.skillTop}>
              <span className={styles.skillName}>{skill.name}</span>
              <button
                type="button"
                onClick={() => removeListItem("skills", skill.id)}
                className={styles.removeBtn}
              >
                <X size={14} />
              </button>
            </div>
            <div className={styles.levelRow}>
              <span className={styles.lvlText}>Proficiency:</span>
              <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => updateListItem("skills", skill.id, "level", lvl)}
                    className={lvl <= (skill.level || 4) ? styles.starFilled : styles.starEmpty}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
