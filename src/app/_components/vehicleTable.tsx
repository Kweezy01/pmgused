"use client";

import { useState } from "react";

import { api } from "~/trpc/react";

export function VehicleTable() {
    const { data, isLoading } = api.vehicle.getAll.useQuery();

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
                <main className="flex bg-cyan-500 h-screen justify">
                    <div className="text-black border-x border-slate-400">
                        <div className="flex pl-1 pt-1 pb-1 border-b border-slate-400">
                            <nav>
                            </nav>
                        </div>
                        <table className="mt-1">
                            <tr>
                                <td className="font-bold text-center border-b border-x bg-blue-500">StockNum</td>
                                <td className="font-bold text-center border-b border-x bg-blue-500">VIN</td>
                                <td className="font-bold text-center border-b border-x bg-blue-500">MMCode</td>
                                <td className="font-bold text-center border-b border-x bg-blue-500">Odometer</td>
                                <td className="font-bold text-center border-b border-x bg-blue-500">Stand In Value</td>
                                <td className="font-bold text-center border-b border-x bg-blue-500">Internet Price</td>
                            </tr>
                            {data.map((e) => {
                                console.log(e)
                                return (
                                    <tr key={e.StockNum}>
                                        <td className="text-center border-x">{e.StockNum}</td>
                                        <td className="text-center border-x">{e.VIN}</td>
                                        <td className="text-center border-x">{e.MMCode}</td>
                                        <td className="text-center border-x">{e.Odometer}</td>
                                        <td className="text-center border-x">{e.StandInValue}</td>
                                        <td className="text-center border-x">{e.InternetPrice}</td>
                                    </tr>
                                )
                            })}
                        </table>
                        {/* 
                    <br />

                    <button className="ml-1 bg-green-700 hover:bg-green-800  py-2 px-4 border border-lime-900 rounded">
                        <Link href={`${teamName}/add-catch`}>Add catch</Link>
                    </button>
                    <button className="ml-1 bg-green-700 hover:bg-green-800  py-2 px-4 border border-lime-900 rounded">
                        <Link href={`${teamName}/add-batch`}>Add batch</Link>
                    </button>
                    <button className="ml-1 bg-green-700 hover:bg-green-800  py-2 px-4 border border-lime-900 rounded">
                        <Link href={`${teamName}/edit`}>Edit</Link>
                    </button>
                    <button className="ml-1 bg-green-700 hover:bg-green-800  py-2 px-4 border border-lime-900 rounded">
                        <Link href={`${teamName}/editrecordedgames`}>Edit Recorded Games</Link>
                    </button>

                    <br />
                    <br />

                    <button className="ml-1 bg-green-700 hover:bg-green-800  py-2 px-4 border border-lime-900 rounded">
                        <Link href={`${teamName}/catches`}>Catches</Link>
                    </button>
                    <button className="ml-1 bg-green-700 hover:bg-green-800  py-2 px-4 border border-lime-900 rounded">
                        <Link href={`${teamName}/batches`}>Batches</Link>
                    </button>

                    <br />
                    <br />

                    <button className="ml-1 bg-red-700 hover:bg-red-800  py-2 px-4 border border-lime-900 rounded">
                        <Link href={`${teamName}/delete`}>Delete</Link>
                    </button> */}

                    </div>
                </main>
            ) : (
                <p>You have no posts yet.</p>
            )}

        </div>
    );
}
