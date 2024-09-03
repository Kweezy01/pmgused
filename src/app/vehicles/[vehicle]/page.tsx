"use client";

import { usePathname } from "next/navigation";
import { TailwindTableSingle } from "~/app/_components/tailwindTableSingle";
import { api } from "~/trpc/react";

export default function VehiclePage() {

  const stockNum = usePathname().split("/").pop()

  if (typeof stockNum != "string") return (<h1>Team not found</h1>)
  const { data } = api.pmgused.getVehicleWithStockNum.useQuery({ stockNum: stockNum });

  if (!data) return <div>Car not found</div>

  return (
    <>
    <TailwindTableSingle target={stockNum}/>
    </>
  )
}
