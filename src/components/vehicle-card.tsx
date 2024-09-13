'use client'

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"

import { api } from "~/trpc/react";

export function VehicleCard({ vehicle }: { vehicle: string }) {

  
  // const vehicleInfo = {
  //   stockNumber: "A12345",
  //   model: "Tesla Model 3",
  //   vin: "5YJ3E1EA1JF000001",
  //   dealership: "EV Motors",
  //   dealershipAge: "5 years",
  // }
  
  const reconProcess = [
    { step: "Initial Inspection", status: "Completed", date: "2023-05-28" },
    { step: "Mechanical Check", status: "Completed", date: "2023-05-29" },
    { step: "Detailing", status: "In Progress", date: "2023-05-30" },
    { step: "Final Quality Check", status: "Pending", date: "2023-05-31" },
  ]
  
  const marketingProcess = [
    { step: "Photos Taken", status: "Completed", date: "2023-06-01" },
    { step: "Online Listing", status: "In Progress", date: "2023-06-02" },
    { step: "Social Media Post", status: "Pending", date: "2023-06-03" },
  ]
  
  const vehicleInfo = api.pmgused.getVehicleWithStockNum.useQuery({ stockNum: vehicle }).data

  if (!vehicleInfo) return <div>Loading</div>

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <CardTitle>Vehicle Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div>
            <p className="text-sm font-medium">Stock Number</p>
            <p className="text-lg">{vehicleInfo.StockNum}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Model</p>
            <p className="text-lg">{vehicleInfo.Model}</p>
          </div>
          <div>
            <p className="text-sm font-medium">VIN</p>
            <p className="text-lg">{vehicleInfo.VIN}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Dealership</p>
            <p className="text-lg">{vehicleInfo.Odometer}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Dealership Age</p>
            <p className="text-lg">{vehicleInfo.createdAt.toDateString()}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Recon Process</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Step</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reconProcess.map((step, index) => (
                  <TableRow key={index}>
                    <TableCell>{step.step}</TableCell>
                    <TableCell>{step.status}</TableCell>
                    <TableCell>{step.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Marketing Process</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Step</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {marketingProcess.map((step, index) => (
                  <TableRow key={index}>
                    <TableCell>{step.step}</TableCell>
                    <TableCell>{step.status}</TableCell>
                    <TableCell>{step.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}