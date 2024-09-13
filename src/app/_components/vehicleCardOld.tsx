"use client";

import { api } from "~/trpc/react";

export function VehicleCardOld({ target }: { target: string }) {

   const { data } = api.pmgused.getVehicleWithStockNum.useQuery({ stockNum: target });

   return (
      <main className="flex bg-black h-screen justify-center">
         <div className="text-black bg-center bg-contain bg-[url('https://scontent-jnb1-1.xx.fbcdn.net/v/t39.30808-6/260277972_10227320945231659_2177364538079183029_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=1ac024&_nc_ohc=BNUj0U7h4X0AX9ag8BH&_nc_ht=scontent-jnb1-1.xx&oh=00_AfDC04u-kGWkfzpbF3M2J_AV6brZETHXZaWgnR4ow5Zj7A&oe=65175085')] w-full     border-x border-slate-400 md:max-w-2xl">
            <div className="flex pl-1 pt-1 pb-1 border-b border-slate-400">
               <nav>
                  <button className="ml-1 bg-green-700 hover:bg-green-800  py-2 px-4 border border-lime-900 rounded">
                     <a href={"/"}>Home</a>
                  </button>
               </nav>
            </div>
            <table className="mt-1 w-full">
               <tbody>
                  <tr>
                     <td className="font-bold text-center border-b border-x bg-blue-500">Date in Centre</td>
                     <td className="font-bold text-center border-b border-x bg-blue-500">Stock Number</td>
                     <td className="font-bold text-center border-b border-x bg-blue-500">Vehicle</td>
                     <td className="font-bold text-center border-b border-x bg-blue-500">VIN</td>
                     <td className="font-bold text-center border-b border-x bg-blue-500">Stand In Value</td>
                     <td className="font-bold text-center border-b border-x bg-blue-500">Stock Days</td>
                     {/* <td className="font-bold text-center border-b border-x bg-blue-500"><a href={`/vehicles/${target}/reconcard`}></a>Recon Card</td>
                  <td className="font-bold text-center border-b border-x bg-blue-500"><a href={`/vehicles/${target}/internetcard`}></a>Internet Card</td> */}
                  </tr>
                  <tr className="bg-black bg-opacity-70 text-slate-300 font-bold ml-6 border-b">

                     <td className="text-center border-x p-3">{data?.createdAt.toDateString()}</td>
                     <td className="text-center border-x p-3">{data?.StockNum}</td>
                     <td className="text-center border-x p-3">{data?.Model}</td>
                     <td className="text-center border-x p-3">{data?.VIN}</td>
                     <td className="text-center border-x p-3">{data?.StandInValue}</td>
                     <td className="text-center border-x p-3">{data ? Math.floor((new Date().valueOf() - (data?.createdAt).valueOf()) / (1000 * 60 * 60 * 24)) : ""}</td>

                  </tr>
               </tbody>
            </table>

            <br />

            <button className="ml-1 bg-green-700 hover:bg-green-800  py-2 px-4 border border-lime-900 rounded">
               <a href={`/vehicles/${target}/edit`}>Edit</a>
            </button>

            <button className="ml-1 bg-green-700 hover:bg-green-800  py-2 px-4 border border-lime-900 rounded">
               <a href={`/vehicles/${target}/reconstatus`}>Recon Status</a>
            </button>

            <button className="ml-1 bg-green-700 hover:bg-green-800  py-2 px-4 border border-lime-900 rounded">
               <a href={`/vehicles/${target}/internetstatus`}>Internet Status</a>
            </button>

            <button className="ml-1 bg-red-700 hover:bg-red-800  py-2 px-4 border border-lime-900 rounded">
               <a href={`/vehicles/${target}/delete`}>Delete</a>
            </button>

         </div>
      </main>
      // <div className="">
      //    {data ? (
      //       <main className="flex bg-black h-screen justify-center">
      //          <div className="text-black bg-center bg-contain bg-[url('https://scontent-jnb1-1.xx.fbcdn.net/v/t39.30808-6/260277972_10227320945231659_2177364538079183029_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=1ac024&_nc_ohc=BNUj0U7h4X0AX9ag8BH&_nc_ht=scontent-jnb1-1.xx&oh=00_AfDC04u-kGWkfzpbF3M2J_AV6brZETHXZaWgnR4ow5Zj7A&oe=65175085')] w-full     border-x border-slate-400 md:max-w-2xl">
      //             <div className="flex pl-1 pt-1 pb-1 border-b border-slate-400">
      //                <nav>
      //                   <button>
      //                      <a href={"/"}>Home</a>
      //                   </button>
      //                </nav>
      //             </div>
      //             <table className="mt-1 w-full">
      //                <tr>
      //                   <td className="font-bold text-center border-b border-x bg-blue-500">Stock Number</td>
      //                   <td className="font-bold text-center border-b border-x bg-blue-500">Vehicle</td>
      //                   <td className="font-bold text-center border-b border-x bg-blue-500">Registration</td>
      //                   <td className="font-bold text-center border-b border-x bg-blue-500">VIN</td>
      //                   <td className="font-bold text-center border-b border-x bg-blue-500"><a href={`/vehicles/${target}/reconcard`}></a></td>
      //                   <td className="font-bold text-center border-b border-x bg-blue-500"><a href={`/vehicles/${target}/internetcard`}></a></td>
      //                   <td className="font-bold text-center border-b border-x bg-blue-500">Recorded Games</td>
      //                </tr>
      //                <tr className="bg-black bg-opacity-70 text-slate-300 font-bold ml-6 border-b">

      //                   <td key={data.StockNum} className="text-center border-x">{data.StockNum}</td>

      //                </tr>
      //             </table>

      //             <br />

      //             <button className="ml-1 bg-green-700 hover:bg-green-800  py-2 px-4 border border-lime-900 rounded">
      //                <a href={`/vehicles/${target}/edit`}>Edit</a>
      //             </button>

      //             <button className="ml-1 bg-green-700 hover:bg-green-800  py-2 px-4 border border-lime-900 rounded">
      //                <a href={`/vehicles/${target}/reconstatus`}>Recon Status</a>
      //             </button>

      //             <button className="ml-1 bg-green-700 hover:bg-green-800  py-2 px-4 border border-lime-900 rounded">
      //                <a href={`/vehicles/${target}/internetstatus`}>Internet Status</a>
      //             </button>

      //             <button className="ml-1 bg-red-700 hover:bg-red-800  py-2 px-4 border border-lime-900 rounded">
      //                <a href={`/vehicles/${target}/delete`}>Delete</a>
      //             </button>

      //          </div>
      //       </main>
      //    ) : <h1>Loading</h1>
      //    }
      // </div>
   )
}