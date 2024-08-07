"use client";

import { useState } from "react";

import { api } from "~/trpc/react";


export function InsertVehicle() {

    const [stockNumber, setStockNumber] = useState("");
    const [VIN, setVIN] = useState("");
    const [odometer, setOdometer] = useState(0);
    const [standInValue, setStandInValue] = useState(0);
    const [internetPrice, setInternetPrice] = useState(0);
    const [MMCode, setMMCode] = useState(0);
    const [workshop, setWorkshop] = useState("");
    const [panelBeater, setPanelBeater] = useState("");
    const [interiorRepairs, setInteriorRepairs] = useState("");
    const [valet, setValet] = useState("");

    


    const { mutate } = api.pmgused.createVehicle.useMutation();

    return (
        <main className="flex h-screen justify-center">
            <div className="text-black bg-contain bg-center w-full border-x border-slate-400 md:max-w-2xl">
                <div className="flex pl-1 pt-1 pb-1 border-b border-slate-400">
                    <nav>
                        This was a link
                    </nav>
                </div>
                <h1 className="ml-1 pt-4">Add a new vehicle below:</h1>

                <br />

                <div className="ml-1 ">Stock Number:
                    <input className="bg-black shadow appearance-none border rounded ml-7 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        id="StockNumber" type="text" placeholder="StockNumber"
                        value={stockNumber}
                        onChange={(e) => setStockNumber(e.target.value)}
                    />
                </div>

                <br />

                <div className="ml-1">VIN:
                    <input className="bg-black shadow appearance-none border rounded ml-4 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        id="VIN" type="text" placeholder="VIN"
                        value={VIN}
                        onChange={(e) => setVIN(e.target.value)}
                    />
                </div>

                <div className="ml-1">Odometer:
                    <input className="bg-black shadow appearance-none border rounded ml-4 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        id="Odometer" type="number" placeholder="Odometer"
                        value={odometer}
                        onChange={(e) => setOdometer(parseInt(e.target.value))}
                    />
                </div>

                <div className="ml-1">MMCode:
                    <input className="bg-black shadow appearance-none border rounded ml-4 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        id="MMCode" type="number" placeholder="MMCode"
                        value={MMCode}
                        onChange={(e) => setMMCode(parseInt(e.target.value))}
                    />
                </div>

                <div className="ml-1">StandInValue:
                    <input className="bg-black shadow appearance-none border rounded ml-4 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        id="StandInValue" type="number" placeholder="StandInValue"
                        value={standInValue}
                        onChange={(e) => setStandInValue(parseInt(e.target.value))}
                    />
                </div>

                <div className="ml-1">InternetPrice:
                    <input className="bg-black shadow appearance-none border rounded ml-4 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        id="InternetPrice" type="number" placeholder="InternetPrice"
                        value={internetPrice}
                        onChange={(e) => setInternetPrice(parseInt(e.target.value))}
                    />
                </div>

                <div className="ml-1">Workshop:
                    <input className="bg-black shadow appearance-none border rounded ml-4 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        id="Workshop" type="text" placeholder="Workshop"
                        value={workshop}
                        onChange={(e) => setWorkshop(e.target.value)}
                    />
                </div>

                <div className="ml-1">PanelBeater:
                    <input className="bg-black shadow appearance-none border rounded ml-4 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        id="PanelBeater" type="number" placeholder="PanelBeater"
                        value={panelBeater}
                        onChange={(e) => setPanelBeater(e.target.value)}
                    />
                </div>

                <div className="ml-1">InteriorRepairs:
                    <input className="bg-black shadow appearance-none border rounded ml-4 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        id="InteriorRepairs" type="text" placeholder="InteriorRepairs"
                        value={interiorRepairs}
                        onChange={(e) => setInteriorRepairs(e.target.value)}
                    />
                </div>

                <div className="ml-1">Valet:
                    <input className="right-0 bg-black shadow appearance-none border rounded ml-4 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        id="Valet" type="text" placeholder="Valet"
                        value={valet}
                        onChange={(e) => setValet(e.target.value)}
                    />
                </div>

                

                <br />

                <button
                    onClick={() => {
                        mutate({ stockNum: stockNumber, VIN: VIN, MMCode: MMCode, Odometer: odometer, StandInValue: standInValue, InternetPrice: internetPrice })
                    }}

                    className="ml-1 bg-green-700 hover:bg-green-800 py-2 px-4 border border-lime-900 rounded">
                    Insert new vehicle
                </button>
            </div>
        </main>
    )
}