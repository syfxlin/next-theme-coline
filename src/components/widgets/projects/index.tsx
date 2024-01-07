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

export type IconsProps = {
  link: string;
};

export const Icons: React.FC<IconsProps> = async (props) => {
  const match = /https?:\/\/(?:www\.)?github\.com\/([^\/]+)\/([^\/]+)/.exec(props.link);
  if (match) {
    try {
      const data = await adapter.component({ repo: `${match[1]}/${match[2]}` });
      if (data?.data) {
        return (
          <>
            <Iconify icon="uil:github" className={styles.icon} />
            <span className={styles.github}>
              <Iconify icon="ri:star-s-line" />
              <span>{stars(data.data.stars)}</span>
            </span>
          </>
        );
      }
    } catch (e) {
      console.log(e);
    }
  }
  return <Iconify icon="ri:link" className={styles.icon} />;
};

export type ProjectsProps = {
  data: Exclude<ProjectsData["categories"], undefined>;
};

export const Projects: React.FC<ProjectsProps> = async ({ data }) => {
  return (
    <>
      {data.map((category) => (
        <React.Fragment key={`category-${category.name}`}>
          <Heading>{category.name}</Heading>
          <Grid>
            {category.projects.map((project) => {
              return (
                <LinkButton
                  key={`project-${project.link}`}
                  className={styles.link}
                  href={project.link}
                  aria-label={project.name}
                  target="_blank"
                  rel="nofollow noopener"
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
                    <Icons link={project.link} />
                  </span>
                </LinkButton>
              );
            })}
          </Grid>
        </React.Fragment>
      ))}
    </>
  );
};
