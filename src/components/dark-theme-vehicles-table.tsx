'use client'

import Link from 'next/link'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"

import { api } from "~/trpc/react";
import { Button } from './ui/button';

// Sample data based on the provided model


export function DarkThemeVehiclesTableComponent() {

  const  vehicles = api.vehicle.getAll.useQuery().data;

  if (!vehicles) return <div>Loading</div>
  
  return (
    <div className="p-8 bg-gray-900 text-gray-100 min-h-screen">
      <a href='/insertvehicle'><Button className='bg-stone-500 mb-2'>Insert Vehicle</Button></a>
      <Table>
        <TableCaption>List of Vehicles</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Stock Number</TableHead>
            <TableHead>VIN</TableHead>
            <TableHead>MM Code</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Odometer</TableHead>
            <TableHead>Stand-In Value</TableHead>
            <TableHead>Internet Price</TableHead>
            <TableHead>Internet State</TableHead>
            <TableHead>Recon State</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles.map((vehicle) => (
            <TableRow key={vehicle.StockNum}>
              <TableCell className="font-medium">
                <Link 
                  href={`/vehicles/${vehicle.StockNum}`}
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  {vehicle.StockNum}
                </Link>
              </TableCell>
              <TableCell>{vehicle.VIN || 'N/A'}</TableCell>
              <TableCell>{vehicle.MMCode || 'N/A'}</TableCell>
              <TableCell>{vehicle.Model || 'N/A'}</TableCell>
              <TableCell>{vehicle.Odometer?.toLocaleString() || 'N/A'}</TableCell>
              <TableCell>${vehicle.StandInValue?.toLocaleString() || 'N/A'}</TableCell>
              <TableCell>${vehicle.InternetPrice?.toLocaleString() || 'N/A'}</TableCell>
              <TableCell>
                <Link 
                  href={`/internet-states/${vehicle.StockNum}`}
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  {vehicle.StockNum}
                </Link>
              </TableCell>
              <TableCell>
                <Link 
                  href={`/recon-states/${vehicle.StockNum}`}
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  {vehicle.StockNum}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}