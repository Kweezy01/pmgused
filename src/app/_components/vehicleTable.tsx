"use client";

import { useState } from "react";

import { api } from "~/trpc/react";

export function VehicleTable() {
    const [latestVehicle] = api.vehicle.getLatest.useSuspenseQuery();

    const utils = api.useUtils();
    const [stockNum, setStockNum] = useState("");
    const [VIN, setVIN] = useState("");
    const [MMCode, setMMCode] = useState(0);
    const [odometer, setOdometer] = useState(0);
    const [standInValue, setStandInValue] = useState(0);
    const [interetPrice, setInteretPrice] = useState(0);

    const createVehicle = api.vehicle.create.useMutation({
        onSuccess: async () => {
            await utils.vehicle.invalidate();
            setStockNum("");
        },
    });

    return (
        <div className="w-full max-w-xs">
            {latestVehicle ? (
                <main className="flex bg-black h-screen justify-center">
                <div className="text-black bg-center bg-contain bg-[url('https://scontent-jnb1-1.xx.fbcdn.net/v/t39.30808-6/260277972_10227320945231659_2177364538079183029_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=1ac024&_nc_ohc=BNUj0U7h4X0AX9ag8BH&_nc_ht=scontent-jnb1-1.xx&oh=00_AfDC04u-kGWkfzpbF3M2J_AV6brZETHXZaWgnR4ow5Zj7A&oe=65175085')] w-full     border-x border-slate-400 md:max-w-2xl">
                    <div className="flex pl-1 pt-1 pb-1 border-b border-slate-400">
                        <nav>
                            <button>
                                Dont Press Me
                            </button>
                        </nav>
                    </div>
                    <table className="mt-1 w-full">
                        <tr>
                            <td className="font-bold text-center border-b border-x bg-blue-500">StockNum</td>
                            <td className="font-bold text-center border-b border-x bg-blue-500">VIN</td>
                            <td className="font-bold text-center border-b border-x bg-blue-500">MMCode</td>
                            <td className="font-bold text-center border-b border-x bg-blue-500">Odometer</td>
                            <td className="font-bold text-center border-b border-x bg-blue-500">Standin Price</td>
                            <td className="font-bold text-center border-b border-x bg-blue-500">Internet Price</td>
                        </tr>
                        <tr className="bg-black bg-opacity-70 text-slate-300 font-bold ml-6 border-b">
                            {[latestVehicle?.StockNum, latestVehicle?.VIN, latestVehicle?.MMcode, latestVehicle?.Odometer, latestVehicle?.StandinPrice, latestVehicle?.InternetPrice].map((e) => {
                                return (
                                    <td key={e} className="text-center border-x">{e}</td>
                                )
                            })}
                        </tr>
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
