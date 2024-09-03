"use client";

import { useState } from "react";

import { api } from "~/trpc/react";

export function TailwindTable() {
   const { data } = api.vehicle.getAll.useQuery();

   // const utils = api.useUtils();
   // const [stockNum, setStockNum] = useState("");
   // const [VIN, setVIN] = useState("");
   // const [MMCode, setMMCode] = useState(0);
   // const [odometer, setOdometer] = useState(0);
   // const [standInValue, setStandInValue] = useState(0);
   // const [interetPrice, setInteretPrice] = useState(0);

   // const createVehicle = api.vehicle.create.useMutation({
   //     onSuccess: async () => {
   //         await utils.vehicle.invalidate();
   //         setStockNum("");
   //     },
   // });

   return (
      <div className="">
         {data ? (
            <div className="flex min-h-screen items-center justify-center">
               <div className="overflow-x-auto">
                  <table className="min-w-full bg-white shadow-md rounded-xl">
                     <thead>
                        <tr className="bg-blue-gray-100 text-gray-700">
                           <th className="py-3 px-4 text-left">Stock Number</th>
                           <th className="py-3 px-4 text-left">Vehicle</th>
                           <th className="py-3 px-4 text-left">VIN</th>
                           <th className="py-3 px-4 text-left">Internet Price</th>
                           <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                     </thead>
                     <tbody className="text-blue-gray-900">

                        {data.map((e) => {
                           return (
                              <tr className="border-b border-blue-gray-200">
                                 <td className="py-3 px-4">{e.StockNum}</td>
                                 <td className="py-3 px-4">{e.Model}</td>
                                 <td className="py-3 px-4">{e.VIN}</td>
                                 <td className="py-3 px-4">{e.StandInValue}</td>
                                 <td className="py-3 px-4">
                                    <a href="/" className="font-medium text-blue-600 hover:text-blue-800">Edit</a>
                                 </td>
                              </tr>
                           )
                        })}
                     </tbody>
                  </table>
                  <div className="w-full pt-5 px-4 mb-8 mx-auto ">
                     <div className="text-sm text-gray-700 py-1 text-center">
                        Made with <a className="text-gray-700 font-semibold" href="https://www.material-tailwind.com/docs/html/table/?ref=tailwindcomponents" target="_blank">Material Tailwind</a> by <a href="https://www.creative-tim.com?ref=tailwindcomponents" className="text-gray-700 font-semibold" target="_blank"> Creative Tim</a>.
                     </div>
                  </div>
               </div>
            </div>
         ) : (
            <p>Loading database...</p>
         )}

      </div>
   );
}