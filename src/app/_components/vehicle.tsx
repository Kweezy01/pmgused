"use client";

import { useState } from "react";

import { api } from "~/trpc/react";

export function LatestVehicle() {
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
        <p className="truncate">Your most recent post: {latestVehicle.VIN}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createVehicle.mutate({
            stockNum: stockNum,
            VIN: VIN,
            MMCode: MMCode,
            Odometer: odometer,
            StandInValue: standInValue,
            InteretPrice: interetPrice
          });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="StockNum"
          value={stockNum}
          onChange={(e) => setStockNum(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        
        <input
          type="text"
          placeholder="VIN"
          value={VIN}
          onChange={(e) => setVIN(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />

<input
          type="text"
          placeholder="MMCode"
          value={MMCode}
          onChange={(e) => setMMCode(parseInt(e.target.value))}
          className="w-full rounded-full px-4 py-2 text-black"
        />

<input
          type="text"
          placeholder="Odometer"
          value={odometer}
          onChange={(e) => setOdometer(parseInt(e.target.value))}
          className="w-full rounded-full px-4 py-2 text-black"
        />

<input
          type="text"
          placeholder="Stand In Value"
          value={standInValue}
          onChange={(e) => setStandInValue(parseInt(e.target.value))}
          className="w-full rounded-full px-4 py-2 text-black"
        />

<input
          type="text"
          placeholder="Internet Price"
          value={interetPrice}
          onChange={(e) => setInteretPrice(parseInt(e.target.value))}
          className="w-full rounded-full px-4 py-2 text-black"
        />

        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createVehicle.isPending}
        >
          {createVehicle.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
