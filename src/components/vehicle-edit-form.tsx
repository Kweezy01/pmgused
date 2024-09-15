'use client'

import { useState, useEffect } from 'react'
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Checkbox } from "~/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Calendar } from "~/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { api } from "~/trpc/react";

type EntryType = {
  StockNum: string
  VIN: string | null
  MMCode: number | null
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
  const [entry, setEntry] = useState<EntryType | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)


  //states for vehicle data
  const [VIN, setVIN] = useState("")
  const [MMCode, setMMCode] = useState(0)
  const [Model, setModel] = useState("")
  const [Odometer, setOdometer] = useState(0)
  const [StandInValue, setStandInValue] = useState(0)
  const [InternetPrice, setInternetPrice] = useState(0)
  const [ReconStates, setReconStates] = useState({})
  const [InternetStates, setInternetStates] = useState({})


  //Recon States
  const [WorkshopID, setWorkshopID] = useState(0)
  const [WorkshopDate, setWorkshopDate] = useState(new Date)
  const [PannelBeaterID, setPannelBeaterID] = useState(0)
  const [PannelBeaterDate, setPannelBeaterDate] = useState(new Date)
  const [InteriorRepairerID, setInteriorRepairerID] = useState(0)
  const [InteriorRepairDate, setInteriorRepairDate] = useState(new Date)
  const [ValetID, setValetID] = useState(0)
  const [ValetDate, setValetDate] = useState(new Date)
  const [DateOnFloor, setDateOnFloor] = useState(new Date)
  //Internet States

  const [PicsTaken, setPicsTaken] = useState(false)
  const [PicsOnPc, setPicsOnPc] = useState(false)
  const [OnAutoTrader, setOnAutoTrader] = useState(false)
  const [OnCars, setOnCars] = useState(false)
  const [OnPMGUsed, setOnPMGUsed] = useState(false)
  const [OnWhatsapp, setOnWhatsapp] = useState(false)
  const [OnPinnacle, setOnPinnacle] = useState(false)



  const { data, isLoading } = api.editRouter.getVehicle.useQuery({ stockNum })
  const updateVehicleMutation = api.editRouter.updateVehicle.useMutation()

  useEffect(() => {
    if (data) {
      setEntry(data)
    }
  }, [data])

  const handleReconStateChange = (name: keyof EntryType['ReconStates'], value: number | Date | null | undefined) => {
    if (!entry) return
    setEntry(prev => ({
      ...prev!,
      ReconStates: {
        ...prev!.ReconStates,
        [name]: value === undefined ? null : value
      }
    }))
  }

  const handleInternetStateChange = (name: keyof EntryType['InternetStates']) => {
    if (!entry) return
    setEntry(prev => ({
      ...prev!,
      InternetStates: {
        ...prev!.InternetStates,
        [name]: !prev!.InternetStates[name]
      }
    }))
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      await updateVehicleMutation.mutateAsync({
        StockNum: stockNum,
        VIN: VIN,
        MMCode: MMCode,
        Model: Model,
        Odometer: Odometer,
        StandInValue: StandInValue,
        InternetPrice: InternetPrice,
        ReconStates: {
          WorkshopID: WorkshopID,
          WorkshopDate: WorkshopDate,
          PannelBeaterID: PannelBeaterID,
          PannelBeaterDate: PannelBeaterDate,
          InteriorRepairerID: InteriorRepairerID,
          InteriorRepairDate: InteriorRepairDate,
          ValetID: ValetID,
          ValetDate: ValetDate,
          DateOnFloor: DateOnFloor
        },
        InternetStates: {
          PicsTaken: PicsTaken,
          PicsOnPc: PicsOnPc,
          OnAutoTrader: OnAutoTrader,
          OnCars: OnCars,
          OnPMGUsed: OnPMGUsed,
          OnWhatsapp: OnWhatsapp,
          OnPinnacle: OnPinnacle
        }
      })
      setMessage("The vehicle entry has been successfully updated.")
    } catch (error) {
      setMessage("An error occurred while updating the vehicle entry.")
      console.error("Update error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) return <div>Loading...</div>

  if (!entry) return <div>No data available</div>

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
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="VIN">VIN</Label>
          <Input
            id="VIN"
            name="VIN"
            value={entry.VIN || ''}
            onChange={(e) => setVIN(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="MMCode">MM Code</Label>
          <Input
            id="MMCode"
            name="MMCode"
            type="number"
            value={entry.MMCode || ''}
            onChange={(e) => setMMCode(parseInt(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="Model">Model</Label>
          <Input
            id="Model"
            name="Model"
            value={entry.Model || ''}
            onChange={(e) => setModel(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="Odometer">Odometer</Label>
          <Input
            id="Odometer"
            name="Odometer"
            type="number"
            value={entry.Odometer || ''}
            onChange={(e) => setOdometer(parseInt(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="StandInValue">Stand-In Value</Label>
          <Input
            id="StandInValue"
            name="StandInValue"
            type="number"
            value={entry.StandInValue || ''}
            onChange={(e) => setStandInValue(parseInt(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="InternetPrice">Internet Price</Label>
          <Input
            id="InternetPrice"
            name="InternetPrice"
            type="number"
            value={entry.InternetPrice || ''}
            onChange={(e) => setInternetPrice(parseInt(e.target.value))}
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