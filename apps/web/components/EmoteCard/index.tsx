import { Card, Group, Image, Text } from "@mantine/core";
import Link from "next/link";

interface EmoteCardProps {
  url: string;
  name: string;
}

// TODO Cleanup styles
export default function EmoteCard({ url, name }: EmoteCardProps) {
  return (
    <Link href={`/emotes/${name}`}>
      <Card
        shadow="sm"
        p="lg"
        radius="md"
        className="transition ease-in-out delay-15 hover:-translate-y-1 hover:bg-[#2C2E33]"
        withBorder
      >
        <div
          style={{
            height: "60px",
            padding: "6px",
            borderRadius: "4px",
            width: "48px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Image src={url} alt="Emoji" />
        </div>

        <Card.Section>
          <Group position="center" mt="md" mb="xs">
            <Text weight={500}>{name}</Text>
          </Group>
        </Card.Section>
      </Card>
    </Link>
  );
}
