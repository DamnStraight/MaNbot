import { AppShell, Header, SimpleGrid, Text } from "@mantine/core";
import EmoteCard from "../../components/EmoteCard";

export default function Emotes() {
  return (
    // TODO Move AppShell to _app
    <AppShell
      padding="md"
      header={
        <Header height={{ base: 50, md: 70 }} p="lg">
          <Text>Small text</Text>
        </Header>
      }
    >
      <div>
        <SimpleGrid cols={3} spacing="xl">
          <EmoteCard />
          <EmoteCard />
          <EmoteCard />
          <EmoteCard />
          <EmoteCard />
          <EmoteCard />
          <EmoteCard />
          <EmoteCard />
          <EmoteCard />
          <EmoteCard />
          <EmoteCard />
          <EmoteCard />
        </SimpleGrid>
      </div>
    </AppShell>
  );
}
