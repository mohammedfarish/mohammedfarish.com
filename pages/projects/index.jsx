import React from "react";
import CustomHead from "../../components/head/Head";
import ProjectSections from "../../components/projects/project section/ProjectSections";

import styles from "./projects.module.css";

const index = () => (
  <>
    <CustomHead
      title="Projects"
    />
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1>Projects</h1>
        <span>A few highlights of my personal and commercial projects.</span>
      </div>
      <ProjectSections />
    </div>
  </>
);

export default index;
