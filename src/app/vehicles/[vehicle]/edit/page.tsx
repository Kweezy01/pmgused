"use client";

import { usePathname } from "next/navigation";
import VehicleEditForm from "~/components/vehicle-edit-form"

export default function EditVehicle() {


   const pathSlug = usePathname().split("/")
   pathSlug.pop()
   const stockNum = pathSlug.pop()
   console.log(stockNum)

   if (typeof stockNum != "string") return (<h1>Team not found</h1>)

   return (
      <div>

         <VehicleEditForm stockNumProp={stockNum} />

      </div>
   )

}