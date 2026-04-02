"use client";

import { StaggerItem } from "@/components/StaggerItem";
import { ProjectCard } from "@/components/ProjectCard";
import { Column } from "@once-ui-system/core";

interface ProjectData {
  slug: string;
  metadata: {
    title: string;
    summary: string;
    images: string[];
    link?: string;
    team?: { avatar: string }[];
  };
  content: string;
}

interface AnimatedProjectsProps {
  projects: ProjectData[];
}

export function AnimatedProjects({ projects }: AnimatedProjectsProps) {
  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {projects.map((post, index) => (
        <StaggerItem key={post.slug} index={index}>
          <ProjectCard
            priority={index < 2}
            href={`/work/${post.slug}`}
            images={post.metadata.images}
            title={post.metadata.title}
            description={post.metadata.summary}
            content={post.content}
            avatars={post.metadata.team?.map((member) => ({ src: member.avatar })) || []}
            link={post.metadata.link || ""}
          />
        </StaggerItem>
      ))}
    </Column>
  );
}
