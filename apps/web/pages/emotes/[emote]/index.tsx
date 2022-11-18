import { SimpleGrid, Text } from "@mantine/core";
import { useRouter } from "next/router";

export default function Emotes() {
  const router = useRouter();
  const { emote } = router.query;

  console.log(emote)

  return (
    <div>
      <SimpleGrid cols={6} spacing="xl">
        <Text>{"XD"}</Text>
      </SimpleGrid>
    </div>
  );
}
