"use client";

import { Flex, Heading, Text } from "@once-ui-system/core";
import { gallery } from "@/resources";
import Carousel from "./Carousel";

export default function GalleryView() {
  return (
    <Flex direction="column" gap="xl" fillWidth>
      {gallery.projects.map((project, index) => (
        <Flex key={index} direction="column" gap="m" fillWidth>
          <Flex direction="column" gap="s">
            <Heading as="h2" variant="display-strong-s">
              {project.name}
            </Heading>
            <Text variant="body-default-m" onBackground="neutral-weak">
              {project.description}
            </Text>
          </Flex>
          <Carousel images={project.images} />
        </Flex>
      ))}
    </Flex>
  );
}
