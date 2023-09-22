import * as styles from "./styles.css";
import React from "react";
import { ProjectsData } from "../../../contents/types";
import { Grid } from "../../layouts/grid";
import { LinkButton } from "../../ui/button";
import { Iconify } from "../../ui/iconify";
import { GithubAdapter } from "../../../adapters/github-adapter";
import { Heading } from "../heading";
import { stars } from "../../../utils/vender";

const adapter = new GithubAdapter();

export type ProjectsProps = {
  data: Exclude<ProjectsData["categories"], undefined>;
};

export const Projects: React.FC<ProjectsProps> = async ({ data }) => {
  return await Promise.all(
    data.map(async (category) => (
      <React.Fragment key={`category-${category.name}`}>
        <Heading>{category.name}</Heading>
        <Grid>
          {await Promise.all(
            category.projects.map(async (project) => {
              const match = /https?:\/\/(?:www\.)?github\.com\/([^\/]+)\/([^\/]+)/.exec(project.link);
              const github = match ? await adapter.component({ repo: `${match[1]}/${match[2]}` }) : undefined;
              return (
                <LinkButton
                  key={`project-${project.link}`}
                  className={styles.link}
                  href={project.link}
                  aria-label={`项目：${project.name}`}
                  target="_blank"
                >
                  <span className={styles.left}>
                    <span className={styles.name}>
                      <span>{project.name}</span>
                      {project.components.map((component) => (
                        <Iconify key={`component-${component}`} icon={component} className={styles.component} />
                      ))}
                    </span>
                    <span className={styles.text}>{project.description}</span>
                  </span>
                  <span className={styles.right}>
                    <Iconify icon={match ? "uil:github" : "ri:link"} className={styles.icon} />
                    {github?.data && (
                      <span className={styles.github}>
                        <Iconify icon="ri:star-s-line" />
                        <span>{stars(github.data.stars)}</span>
                      </span>
                    )}
                  </span>
                </LinkButton>
              );
            }),
          )}
        </Grid>
      </React.Fragment>
    )),
  );
};
