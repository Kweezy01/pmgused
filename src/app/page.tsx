// import Link from "next/link";

// import { LatestPost } from "~/app/_components/post";
import { DarkThemeVehiclesTableComponent } from "~/components/dark-theme-vehicles-table";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });

  // void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main>

          <DarkThemeVehiclesTableComponent   />

      </main>
    </HydrateClient>
  );
}
