"use client";

import { usePathname } from "next/navigation";
import { VehicleCard } from "~/app/_components/vehicleCard";
import { api } from "~/trpc/react";

export default function VehiclePage() {

  const stockNum = usePathname().split("/").pop()

  if (typeof stockNum != "string") return (<h1>Team not found</h1>)
  const { data } = api.pmgused.getVehicleWithStockNum.useQuery({ stockNum: stockNum });

  if (!data) return <div>Car not found</div>

  return (
    <>
      <VehicleCard target={stockNum} />
    </>
  )
}
