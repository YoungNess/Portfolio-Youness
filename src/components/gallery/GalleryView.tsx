"use client";

import { motion } from "framer-motion";
import { Flex, Heading, Text } from "@once-ui-system/core";
import { gallery } from "@/resources";
import Carousel from "./Carousel";

export default function GalleryView() {
  return (
    <Flex direction="column" gap="xl" fillWidth>
      {gallery.projects.map((project, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.6,
            delay: index * 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ width: "100%" }}
        >
          <Flex direction="column" gap="m" fillWidth>
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
        </motion.div>
      ))}
    </Flex>
  );
}
