import { SimpleGrid } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import EmoteCard from "../../components/EmoteCard";

export default function Emotes() {
  const { isLoading, error, data, isFetching } = useQuery(["emoteData"], () =>
    // TODO Move URL to env variable
    axios.get("http://127.0.0.1:3001/emote/").then((res) => res.data)
  );

  return (
    <div>
      <SimpleGrid cols={6} spacing="xl">
        {!isLoading &&
          data.map((item: any, i: number) => (
            <EmoteCard
              key={`${i}-${item.name}`}
              url={item.url}
              name={item.name}
            />
          ))}
      </SimpleGrid>
    </div>
  );
}
