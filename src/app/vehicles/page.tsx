"use client";

import { api } from "~/trpc/react";


function getVehicles() {
    const { data } = api.pmgused.getAllVehicles.useQuery();
    return data
}

function getVehiclesAndStates() {
    const { data } = api.pmgused.getVehiclesWithReconState.useQuery();
    return data
}

function getReconStates() {
    const { data } = api.pmgused.getAllReconStates.useQuery();
    return data
}


export default function VehicleTable() {
    const vehicleData = getVehiclesAndStates()
    const reconStates = getReconStates()

    //const { data } = api.pmgused.getAllReconStates.useQuery();

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

    { if (!vehicleData || !reconStates) return (<p>Loading data...</p>) }
    return (
        <div className="flex h-screen justify-center bg-neutral-600">
            {(
                <main className="flex bg-neutral-600 h-screen justify">
                    <div className="text-black border-x border-slate-400">
                        {/* <div>
                            <nav>
                                <a href="" className="px-6">Insert Vehicle</a>
                                <a href="" className="px-6">Vehicle Recon</a>
                                <a href="" className="px-6">Internet Recon</a>
                                <a href="" className="px-6">Recon Locations</a>
                            </nav>
                        </div> */}
                        <div className="flex pl-1 pt-1 pb-1 border-b border-slate-400">
                            <nav className="w-full bg-neutral-600 relative">
                                <button
                                    type="button"
                                    className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-dark-3 transition duration-150 ease-in-out hover:bg-neutral-700 hover:shadow-dark-2 focus:bg-neutral-700 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-dark-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                                    <a href="/insertvehicle" className="px-6">Insert Vehicle</a>
                                </button>
                                <button
                                    type="button"
                                    className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs absolute right-1  font-medium uppercase leading-normal text-neutral-50 shadow-dark-3 transition duration-150 ease-in-out hover:bg-neutral-700 hover:shadow-dark-2 focus:bg-neutral-700 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-dark-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                                    Delete Vehicle
                                </button>
                            </nav>
                        </div>
                        <h1 className="pl-6 pt-3 underline font-bold">Active trade Centre Vehicles</h1>
                        <table className="m-5 text-sm">
                            <tr>
                                <td className="font-bold text-center border-b border-x border-neutral-500 bg-blue-500 p-2">StockNum</td>
                                <td className="font-bold text-center border-b border-x border-neutral-500 bg-blue-500 p-2">VIN</td>
                                <td className="font-bold text-center border-b border-x border-neutral-500 bg-blue-500 p-2">Model</td>
                                <td className="font-bold text-center border-b border-x border-neutral-500 bg-blue-500 p-2">MMCode</td>
                                <td className="font-bold text-center border-b border-x border-neutral-500 bg-blue-500 p-2">Workshop</td>
                                <td className="font-bold text-center border-b border-x border-neutral-500 bg-blue-500 p-2">Pannel Beater</td>
                                <td className="font-bold text-center border-b border-x border-neutral-500 bg-blue-500 p-2">Interior Repairer</td>
                                <td className="font-bold text-center border-b border-x border-neutral-500 bg-blue-500 p-2">Valet</td>
                            </tr>
                            {vehicleData.map((e) => {

                                return (
                                    <tr key={e.StockNum}>
                                        <td className="text-center border-b border-x border-neutral-500">{e.StockNum}</td>
                                        <td className="text-center border-b border-x border-neutral-500">{e.VIN}</td>
                                        <td className="text-center border-b border-x border-neutral-500">{e.Model}</td>
                                        <td className="text-center border-b border-x border-neutral-500">{e.MMCode}</td>
                                        {e.ReconState.map((i) => {

                                            return (
                                                <>
                                                    <td className="text-center border border-x border-neutral-500">{i.WorkshopID}</td>
                                                    <td className="text-center border border-x border-neutral-500">{i.PannelBeaterID}</td>
                                                    <td className="text-center border border-x border-neutral-500">{i.InteriorRepairerID}</td>
                                                    <td className="text-center border border-x border-neutral-500">{i.ValetID}</td>
                                                </>
                                            )
                                        })}
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
            )}

        </div>
    );
}
