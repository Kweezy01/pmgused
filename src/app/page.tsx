// import Link from "next/link";

// import { LatestPost } from "~/app/_components/post";
import { InsertVehicle } from "./_components/insertVehicle";
import { TailwindTable } from "./_components/tailwindTable";
import { LatestVehicle } from "./_components/vehicle";
import { VehicleTable } from "./_components/vehicleTable";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b bg-neutral-800">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">

          <TailwindTable />

        </div>
      </main>
    </HydrateClient>
  );
}
