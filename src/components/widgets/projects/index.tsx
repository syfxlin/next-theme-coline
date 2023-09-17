import * as styles from "./styles.css";
import React from "react";
import { ProjectsData } from "../../../contents/types";
import { Grid } from "../../layouts/grid";
import { Heading } from "../heading";
import { LinkButton } from "../../ui/button";
import { Iconify } from "../../ui/iconify";
import { GithubAdapter } from "../../../adapters/github-adapter";

const adapter = new GithubAdapter();

export type ProjectsProps = {
  data: ProjectsData;
};

export const Projects: React.FC<ProjectsProps> = ({ data }) => {
  return data.categories.map((category) => (
    <>
      <Heading level={2}>{category.name}</Heading>
      <Grid>
        {category.projects.map(async (project) => {
          const match = /https?:\/\/(?:www\.)?github\.com\/(\w+)\/(\w+)/.exec(project.link);
          const github = match ? await adapter.component({ repo: `${match[1]}/${match[2]}` }) : undefined;
          return (
            <LinkButton
              key={`project-${project.link}`}
              className={styles.link}
              href={project.link}
              aria-label={`项目：${project.name}`}
              target="_blank"
            >
              <span>
                <span className={styles.name}>
                  {project.name}
                  {project.components.map((component) => (
                    <Iconify key={`component-${component}`} icon={component} className={styles.component} />
                  ))}
                </span>
                <span className={styles.text}>{project.description}</span>
              </span>
              <span>
                <Iconify icon={match ? "uil:github" : "ri:link"} className={styles.icon} />
                {github?.data && (
                  <span className={styles.github}>
                    <Iconify icon="ri:star-s-line" />
                    {github.data.stars}
                  </span>
                )}
              </span>
            </LinkButton>
          );
        })}
      </Grid>
    </>
  ));
};
