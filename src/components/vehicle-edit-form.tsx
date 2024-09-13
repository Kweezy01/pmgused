'use client'

import { useState } from 'react'
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Checkbox } from "~/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Calendar } from "~/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { usePathname } from "next/navigation";

import { api } from "~/trpc/react";

type EntryType = {
  StockNum: string
  VIN: string | null
  MMCode: number | null
  Registration: number | null
  Model: string | null
  Odometer: number | null
  StandInValue: number | null
  InternetPrice: number | null
  ReconStates: {
    WorkshopID: number | null
    WorkshopDate: Date | null
    PannelBeaterID: number | null
    PannelBeaterDate: Date | null
    InteriorRepairerID: number | null
    InteriorRepairDate: Date | null
    ValetID: number | null
    ValetDate: Date | null
    DateOnFloor: Date | null
  }
  InternetStates: {
    PicsTaken: boolean
    PicsOnPc: boolean
    OnAutoTrader: boolean
    OnCars: boolean
    OnPMGUsed: boolean
    OnWhatsapp: boolean
    OnPinnacle: boolean
  }
}

// Simulated initial entry
const initialEntry: EntryType = {
  StockNum: "ST12345",
  VIN: "1HGCM82633A004352",
  MMCode: 12345,
  Registration: 34244,
  Model: "Sedan",
  Odometer: 50000,
  StandInValue: 15000,
  InternetPrice: 18999,
  ReconStates: {
    WorkshopID: null,
    WorkshopDate: null,
    PannelBeaterID: null,
    PannelBeaterDate: null,
    InteriorRepairerID: null,
    InteriorRepairDate: null,
    ValetID: null,
    ValetDate: null,
    DateOnFloor: null,
  },
  InternetStates: {
    PicsTaken: false,
    PicsOnPc: false,
    OnAutoTrader: false,
    OnCars: false,
    OnPMGUsed: false,
    OnWhatsapp: false,
    OnPinnacle: false,
  },
}

// Simulated data for related entities
const workshops = [
  { id: 1, name: "Workshop A" },
  { id: 2, name: "Workshop B" },
]
const pannelBeaters = [
  { id: 1, name: "Pannel Beater A" },
  { id: 2, name: "Pannel Beater B" },
]
const interiorRepairers = [
  { id: 1, name: "Interior Repairer A" },
  { id: 2, name: "Interior Repairer B" },
]
const valets = [
  { id: 1, name: "Valet A" },
  { id: 2, name: "Valet B" },
]



export default function VehicleEditForm({ stockNum }: { stockNum: string }) {


  if (typeof stockNum != "string") return (<h1>Team not found</h1>)
  const { data } = api.pmgused.getVehicleWithStockNum.useQuery({ stockNum: stockNum });



  const [entry, setEntry] = useState<EntryType>(data)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setEntry(prev => ({
      ...prev,
      [name]: type === 'number' ? (value ? parseInt(value, 10) : null) : value
    }))
  }

  const handleReconStateChange = (name: keyof EntryType['ReconStates'], value: number | Date | null | undefined) => {
    setEntry(prev => ({
      ...prev,
      ReconStates: {
        ...prev.ReconStates,
        [name]: value === undefined ? null : value
      }
    }))
  }

  const handleInternetStateChange = (name: keyof EntryType['InternetStates']) => {
    setEntry(prev => ({
      ...prev,
      InternetStates: {
        ...prev.InternetStates,
        [name]: !prev.InternetStates[name]
      }
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    // Simulated API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Update successful
    setIsSubmitting(false)
    setMessage("The vehicle entry has been successfully updated.")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center">Edit Vehicle Entry</h2>

      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="StockNum">Stock Number</Label>
          <Input
            id="StockNum"
            name="StockNum"
            value={entry.StockNum}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="VIN">VIN</Label>
          <Input
            id="VIN"
            name="VIN"
            value={entry.VIN || ''}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="MMCode">MM Code</Label>
          <Input
            id="MMCode"
            name="MMCode"
            type="number"
            value={entry.MMCode || ''}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="Model">Model</Label>
          <Input
            id="Model"
            name="Model"
            value={entry.Model || ''}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="Odometer">Odometer</Label>
          <Input
            id="Odometer"
            name="Odometer"
            type="number"
            value={entry.Odometer || ''}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="StandInValue">Stand-In Value</Label>
          <Input
            id="StandInValue"
            name="StandInValue"
            type="number"
            value={entry.StandInValue || ''}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="InternetPrice">Internet Price</Label>
          <Input
            id="InternetPrice"
            name="InternetPrice"
            type="number"
            value={entry.InternetPrice || ''}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recon States</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {['Workshop', 'PannelBeater', 'InteriorRepairer', 'Valet'].map((service) => (
            <div key={service} className="space-y-2">
              <Label htmlFor={`${service}ID`}>{service}</Label>
              <Select
                onValueChange={(value) => handleReconStateChange(`${service}ID` as keyof EntryType['ReconStates'], parseInt(value, 10))}
                value={entry.ReconStates[`${service}ID` as keyof EntryType['ReconStates']]?.toString() || ''}
              >
                <SelectTrigger>
                  <SelectValue placeholder={`Select ${service}`} />
                </SelectTrigger>
                <SelectContent>
                  {(service === 'Workshop' ? workshops :
                    service === 'PannelBeater' ? pannelBeaters :
                      service === 'InteriorRepairer' ? interiorRepairers :
                        valets).map((item) => (
                          <SelectItem key={item.id} value={item.id.toString()}>{item.name}</SelectItem>
                        ))}
                </SelectContent>
              </Select>

              <Label htmlFor={`${service}Date`}>{service} Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={`w-full justify-start text-left font-normal ${!entry.ReconStates[`${service}Date` as keyof EntryType['ReconStates']] && "text-muted-foreground"}`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {entry.ReconStates[`${service}Date` as keyof EntryType['ReconStates']] ? format(entry.ReconStates[`${service}Date` as keyof EntryType['ReconStates']] as Date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={entry.ReconStates[`${service}Date` as keyof EntryType['ReconStates']] as Date | undefined}
                    onSelect={(date) => handleReconStateChange(`${service}Date` as keyof EntryType['ReconStates'], date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          ))}

          <div className="space-y-2">
            <Label htmlFor="DateOnFloor">Date On Floor</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`w-full justify-start text-left font-normal ${!entry.ReconStates.DateOnFloor && "text-muted-foreground"}`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {entry.ReconStates.DateOnFloor ? format(entry.ReconStates.DateOnFloor, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={entry.ReconStates.DateOnFloor as Date | undefined}
                  onSelect={(date) => handleReconStateChange('DateOnFloor', date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Internet States</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(entry.InternetStates).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={`internet-${key}`}
                checked={value}
                onCheckedChange={() => handleInternetStateChange(key as keyof EntryType['InternetStates'])}
              />
              <label
                htmlFor={`internet-${key}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {key}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Updating...' : 'Update Vehicle Entry'}
      </Button>
    </form>
  )
}