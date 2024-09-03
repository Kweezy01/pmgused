"use client";

import { api } from "~/trpc/react";

export function TailwindTable() {
   const { data } = api.vehicle.getAll.useQuery();

   return (
      <div className="">
         {data ? (
            <>
               <div className="flex pl-1 pt-1 pb-1 border-b border-slate-400">
                  <nav className="w-full bg-neutral-600 relative">
                     <button
                        type="button"
                        className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-dark-3 transition duration-150 ease-in-out hover:bg-neutral-700 hover:shadow-dark-2 focus:bg-neutral-700 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-dark-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                        <a href="/" className="px-6">Home</a>
                     </button>
                     <button
                        type="button"
                        className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-dark-3 transition duration-150 ease-in-out hover:bg-neutral-700 hover:shadow-dark-2 focus:bg-neutral-700 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-dark-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                        <a href="/insertvehicle" className="px-6">Insert Vehicle</a>
                     </button>
                     <button
                        type="button"
                        className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs absolute right-1 font-medium uppercase leading-normal text-neutral-50 shadow-dark-3 transition duration-150 ease-in-out hover:bg-neutral-700 hover:shadow-dark-2 focus:bg-neutral-700 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-dark-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                        Delete Vehicle
                     </button>
                  </nav>
               </div>
               <h1 className="pl-6 pt-3 underline font-bold">Active trade Centre Vehicles</h1>
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
                                 <tr className="border-b border-blue-gray-200" key={e.StockNum}>
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
                  </div>
               </div>
            </>
         ) : (
            <p>Loading database...</p>
         )}

      </div>
   );
}