"use client";

import { usePathname } from "next/navigation";
import { Button } from "~/components/ui/button";
import VehicleCard from "~/components/vehicle-card";
import { api } from "~/trpc/react";

export default function VehiclePage() {

  const stockNum = usePathname().split("/").pop()

  if (typeof stockNum != "string") return (<h1>Team not found</h1>)
  const { data } = api.pmgused.getVehicleWithStockNum.useQuery({ stockNum: stockNum });

  if (!data) return <div>Car not found</div>

  return (
    <div>
      <a className="flex w-full justify-center mt-3" href='/'>
        <Button className='bg-stone-500 mb-2'>Home</Button>
      </a>
      <a className="flex w-full justify-center mt-3" href={`/vehicles/${stockNum}/edit`}>
        <Button className='bg-stone-500 mb-2'>Edit</Button>
      </a>
      <VehicleCard vehicle={stockNum} />
    </div>
  )
}
