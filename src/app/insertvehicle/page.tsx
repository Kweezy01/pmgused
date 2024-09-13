"use client";

import { VehicleEntryFormComponent } from "~/components/components-vehicle-entry-form";


export default function InsertVehicle() {



    return (
        <>
            <VehicleEntryFormComponent />
        </>
    )

}







//     const [stockNumber, setStockNumber] = useState("");
//     const [VIN, setVIN] = useState("");
//     const [model, setModel] = useState("");
//     const [mmCode, setMmCode] = useState(0);
//     const [buttonText, setButtonText] = useState("Insert new vehicle");

//     const [insertFlag, setInsertFlag] = useState(false);


//     const { mutate } = api.pmgused.createVehicle.useMutation();
//     const emptyReconState = api.pmgused.createEmptyReconState.useMutation()
//     const emptyInternetState = api.pmgused.createEmptyInternetState.useMutation()

//     if (insertFlag) return (
//         <div className="pl-5">
//             <br />
//             <h1 className="translate-x-2 pt-2">Vehicle inserted succesfully!</h1>
//             <br />
//             <a href="/vehicles" className="px-6">
//                 <button
//                     type="button"
//                     className="px-6 inline-block rounded bg-neutral-800 translate-x-2 pb-2  pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-dark-3 transition duration-150 ease-in-out hover:bg-neutral-700 hover:shadow-dark-2 focus:bg-neutral-700 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-dark-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
//                     Vehicles
//                 </button>
//             </a>
//             <button
//                 type="button"

//                 className="inline-block rounded bg-neutral-800 translate-x-2 pb-2  pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-dark-3 transition duration-150 ease-in-out hover:bg-neutral-700 hover:shadow-dark-2 focus:bg-neutral-700 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-dark-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
//             </button>
//         </div>
//     )

//     return (
//         <main className="flex h-screen justify-center bg-neutral-600">
//             <div className="text-black bg-contain bg-center w-full border-x border-slate-400 md:max-w-2xl">
//                 <div className="flex pl-1 pt-1 pb-1 border-b border-slate-400">
//                     <nav className="w-full bg-neutral-600 relative">
//                         <a href="/vehicles" className="px-6">
//                             <button
//                                 type="button"
//                                 className="px-6 inline-block rounded bg-neutral-800 translate-x-2 pb-2  pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-dark-3 transition duration-150 ease-in-out hover:bg-neutral-700 hover:shadow-dark-2 focus:bg-neutral-700 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-dark-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
//                                 Trade Centre Vehicles
//                             </button>
//                         </a>
//                         <button
//                             type="button"
//                             className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs absolute right-1  font-medium uppercase leading-normal text-neutral-50 shadow-dark-3 transition duration-150 ease-in-out hover:bg-neutral-700 hover:shadow-dark-2 focus:bg-neutral-700 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-dark-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
//                             Delete Vehicle
//                         </button>
//                     </nav>
//                 </div>
//                 <h1 className="ml-1 pt-4">Add a new vehicle below:</h1>

//                 <br />

//                 <div className="ml-1 ">Stock Number:
//                     <input className="bg-black shadow appearance-none border rounded ml-7 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
//                         id="StockNumber" type="text" placeholder="StockNumber"
//                         value={stockNumber}
//                         onChange={(e) => setStockNumber(e.target.value)}
//                     />
//                 </div>

//                 <br />

//                 <div className="ml-1">VIN:
//                     <input className="bg-black shadow appearance-none border rounded ml-4 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
//                         id="VIN" type="text" placeholder="VIN"
//                         value={VIN}
//                         onChange={(e) => setVIN(e.target.value)}
//                     />
//                 </div>

//                 <div className="ml-1">Model:
//                     <input className="bg-black shadow appearance-none border rounded ml-4 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
//                         id="Model" type="text" placeholder="Model"
//                         value={model}
//                         onChange={(e) => setModel(e.target.value)}
//                     />
//                 </div>

//                 <div className="ml-1">MMCode:
//                     <input className="bg-black shadow appearance-none border rounded ml-4 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
//                         id="MMCode" type="text"
//                         value={mmCode}
//                         onChange={(e) => setMmCode(parseInt(e.target.value))}
//                     />
//                 </div>

//                 <br />

//                 <button
//                     onClick={async () => {
//                         setButtonText("Loading...")
//                         async function sleep(ms: number): Promise<void> {
//                             return new Promise((resolve) => setTimeout(resolve, ms));
//                         }
//                         mutate({ stockNum: stockNumber, VIN: VIN, Model: model, MMCode: mmCode, Odometer: 0, StandInValue: 0, InternetPrice: 0 })
//                         await sleep(3000);
//                         setInsertFlag(true)
//                         emptyReconState.mutate({ stockNum: stockNumber })
//                         emptyInternetState.mutate({ stockNum: stockNumber })
//                     }}

//                     className="ml-1 bg-green-700 hover:bg-green-800 py-2 px-4 border border-lime-900 rounded">
//                     {buttonText}
//                 </button>
//             </div>
//         </main>
//     )
// }
