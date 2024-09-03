// import Link from "next/link";

// import { LatestPost } from "~/app/_components/post";
import { InsertVehicle } from "./_components/insertVehicle";
import { LatestVehicle } from "./_components/vehicle";
import { VehicleTable } from "./_components/vehicleTable";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b bg-neutral-800 text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">


          {/* <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello ? hello.greeting : "Loading tRPC query..."}
            </p>
          </div> */}
          <VehicleTable />

        </div>
      </main>
    </HydrateClient>
  );
}
