import {
  Heading,
  Text,
  Button,
  Avatar,
  Column,
  Row,
  Schema,
  Meta,
  Line,
} from "@once-ui-system/core";
import { home, about, person, baseURL, routes } from "@/resources";
import { Mailchimp, RevealOnScroll } from "@/components";
import { HeroSection } from "@/components/HeroSection";
import { Projects } from "@/components/work/Projects";
import { Posts } from "@/components/blog/Posts";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <HeroSection
        headline={
          <Heading variant="display-strong-l" style={{ lineHeight: "1.1" }}>
            {home.headline}
          </Heading>
        }
        subline={
          <Column gap="8">
            <Text onBackground="neutral-weak" variant="body-default-l">
              Développeur Web & Product Designer
            </Text>
            <Text onBackground="neutral-weak" variant="body-default-l">
              Étudiant en <Text as="span" variant="body-strong-l" onBackground="neutral-strong">BUT MMI</Text> — Université Gustave Eiffel
            </Text>
            <Text onBackground="neutral-weak" variant="body-default-l">
              Je crée des expériences numériques intuitives et modernes.
            </Text>
          </Column>
        }
        cta={
          <Button
            id="about"
            data-border="rounded"
            href={about.path}
            variant="secondary"
            size="m"
            weight="default"
            arrowIcon
          >
            <Row gap="8" vertical="center" paddingRight="4">
              {about.avatar.display && (
                <Avatar
                  marginRight="8"
                  style={{ marginLeft: "-0.75rem" }}
                  src={person.avatar}
                  size="m"
                />
              )}
              {about.title}
            </Row>
          </Button>
        }
      />
      <RevealOnScroll variant="fadeUp" delay={0}>
        <Projects range={[1, 1]} />
      </RevealOnScroll>
      {routes["/blog"] && (
        <Column fillWidth gap="24" marginBottom="l">
          <Row fillWidth paddingRight="64">
            <Line maxWidth={48} />
          </Row>
          <Row fillWidth gap="24" marginTop="40" s={{ direction: "column" }}>
            <Row flex={1} paddingLeft="l" paddingTop="24">
              <Heading as="h2" variant="display-strong-xs" wrap="balance">
                Latest from the blog
              </Heading>
            </Row>
            <Row flex={3} paddingX="20">
              <Posts range={[1, 2]} columns="2" />
            </Row>
          </Row>
          <Row fillWidth paddingLeft="64" horizontal="end">
            <Line maxWidth={48} />
          </Row>
        </Column>
      )}
      <Projects range={[2]} />
      <Mailchimp />
    </Column>
  );
}
