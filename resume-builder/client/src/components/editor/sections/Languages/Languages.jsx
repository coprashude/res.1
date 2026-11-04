import React from 'react';
import { useResume } from '../../../../context/ResumeContext';
import styles from './Languages.module.css';
import { Plus, Trash2, Languages as LangIcon } from 'lucide-react';

export const Languages = () => {
  const { resumeData, addListItem, updateListItem, removeListItem } = useResume();
  const langs = resumeData.languages || [];

  const handleAdd = () => {
    addListItem("languages", {
      name: "",
      level: "Professional Working"
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Languages</h2>
          <p className={styles.subtitle}>List the languages you speak and your proficiency level.</p>
        </div>
        <button type="button" onClick={handleAdd} className={styles.addBtn}>
          <Plus size={15} /> Add Language
        </button>
      </div>

      <div className={styles.list}>
        {langs.map((l) => (
          <div key={l.id} className={styles.row}>
            <input
              type="text"
              value={l.name || ""}
              onChange={(e) => updateListItem("languages", l.id, "name", e.target.value)}
              placeholder="e.g. Spanish"
              className={styles.input}
            />
            <select
              value={l.level || "Professional Working"}
              onChange={(e) => updateListItem("languages", l.id, "level", e.target.value)}
              className={styles.select}
            >
              <option value="Native / Bilingual">Native / Bilingual</option>
              <option value="Professional Working">Professional Working</option>
              <option value="Fluent">Fluent</option>
              <option value="Conversational">Conversational</option>
              <option value="Elementary">Elementary</option>
            </select>
            <button
              type="button"
              onClick={() => removeListItem("languages", l.id)}
              className={styles.removeBtn}
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Languages;
