'use client'

import { useState } from 'react'
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Checkbox } from "~/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "~/components/ui/card"
import { Label } from "~/components/ui/label"

//API
import { api } from '~/trpc/react'


export default function VehicleEditForm({ stockNumProp }: { stockNumProp: string }) {
  //Calling all vehicle data and relations
  const { data: vehicleData, isLoading: vehicleLoading } = api.editRouter.getVehicleByStockNum.useQuery({ stockNum: stockNumProp });
  const { data: reconData } = api.editRouter.getReconByStockNum.useQuery({ stockNum: stockNumProp });
  const { data: internetData } = api.editRouter.getInternetByStockNum.useQuery({ stockNum: stockNumProp });

  //Calling all locations
  const { data: workshopData } = api.editRouter.getAllWorkshops.useQuery();
  const { data: pannelBeaterData } = api.editRouter.getAllPannelBeaters.useQuery();
  const { data: interiorRepairData } = api.editRouter.getAllInteriorRepairers.useQuery();
  const { data: valetData } = api.editRouter.getAllValets.useQuery();

  //Calling all update mutations
  const { mutate: vehicleMutation } = api.editRouter.updateVehicle.useMutation()
  const { mutate: internetMutation } = api.editRouter.updateInternet.useMutation()


  // Vehicle Information State
  const [vin, setVin] = useState("")
  const [mmCode, setMmCode] = useState(0)
  const [registration, setRegistration] = useState("")
  const [model, setModel] = useState("")
  const [odometer, setOdometer] = useState(0)
  const [standInValue, setStandInValue] = useState(0)
  const [internetPrice, setInternetPrice] = useState(0)

  // Recon States
  const [workshop, setWorkshop] = useState(0)
  const [workshopDate, setWorkshopDate] = useState(new Date())
  const [panelBeater, setPanelBeater] = useState(0)
  const [panelBeaterDate, setPanelBeaterDate] = useState(new Date())
  const [interiorRepairer, setInteriorRepairer] = useState(0)
  const [interiorRepairDate, setInteriorRepairDate] = useState(new Date())
  const [valet, setValet] = useState(0)
  const [valetDate, setValetDate] = useState(new Date())
  const [dateOnFloor, setDateOnFloor] = useState(new Date())


  // Internet States
  const [picsTaken, setPicsTaken] = useState(false)
  const [picsOnPc, setPicsOnPc] = useState(false)
  const [onAutoTrader, setOnAutoTrader] = useState(false)
  const [onCars, setOnCars] = useState(false)
  const [onPMGUsed, setOnPMGUsed] = useState(false)
  const [onWhatsapp, setOnWhatsapp] = useState(false)
  const [onPinnacle, setOnPinnacle] = useState(false)
  // const [loadButtonPressed, setLoadButtonPressed] = useState(false)


  if (!vehicleData || !reconData || !internetData || !workshopData || !pannelBeaterData || !interiorRepairData || !valetData || vehicleLoading) return <>Loading...</>


  // const initVehicleValues = () => {
  //   setVin(vehicleData.VIN || "")
  //   setMmCode(vehicleData.MMCode || 0)
  //   setRegistration(vehicleData.Registration || "")
  //   setModel(vehicleData.Model || "")
  //   setOdometer(vehicleData.Odometer || 0)
  //   setStandInValue(vehicleData.StandInValue || 0)
  //   setInternetPrice(vehicleData.InternetPrice || 0)
  // }

  const handleVehicleSave = () => {

    const handledString = (inputString: string, dbString: string | null) => {
      if ((inputString == "" || inputString == null) && dbString != null) return dbString
      return inputString
    }

    const handledNumber = (dataNumber: number, dbNumber: number | null) => {
      if ((dataNumber == 0 || dataNumber == null) && dbNumber != null) return dbNumber
      return dataNumber
    }

    vehicleMutation({
      stockNum: stockNumProp, VIN: handledString(vin, vehicleData?.VIN), MMCode: handledNumber(mmCode, vehicleData?.MMCode), Model: handledString(model, vehicleData?.Model), Registration: handledString(registration, vehicleData?.Registration), Odometer: handledNumber(odometer, vehicleData?.Odometer), StandInValue: handledNumber(standInValue, vehicleData?.StandInValue), InternetPrice: handledNumber(internetPrice, vehicleData?.InternetPrice)
    })
  }

  const handleReconSave = () => {
    console.log('Saving Recon States', {
      workshop, workshopDate, panelBeater, panelBeaterDate, interiorRepairer, interiorRepairDate, valet, valetDate, dateOnFloor
    })
  }

  const handleInternetSave = () => {
    internetMutation({
      StockNum: stockNumProp, PicsTaken: picsTaken, PicsOnPc: picsOnPc, OnAutoTrader: onAutoTrader, OnCars: onCars, OnPMGUsed: onPMGUsed, OnWhatsapp: onWhatsapp, OnPinnacle: onPinnacle
    })
  }


  // if (!loadButtonPressed) return <Button onClick={() => {
  //   initVehicleValues()
  //   setLoadButtonPressed(true)
  // }
  // }>Load Recon States (Press this as soon as you open page!!!)</Button>


  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="StockNum">Stock Number</Label>
              <Input id="StockNum" placeholder={vehicleData?.StockNum} value={stockNumProp} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="VIN">VIN</Label>
              <Input id="VIN" placeholder={vehicleData?.VIN ?? ""} onChange={(e) => setVin(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="MMCode">MM Code</Label>
              <Input id="MMCode" placeholder={vehicleData?.MMCode?.toString() ?? ""} type="number" onChange={(e) => setMmCode(parseInt(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Registration">Registration</Label>
              <Input id="Registration" placeholder={vehicleData?.Registration?.toString()} onChange={(e) => setRegistration(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Model">Model</Label>
              <Input id="Model" placeholder={vehicleData?.Model ?? ""} onChange={(e) => setModel(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Odometer">Odometer</Label>
              <Input id="Odometer" placeholder={vehicleData?.Odometer?.toString()} type="number" onChange={(e) => setOdometer(parseInt(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="StandInValue">Stand In Value</Label>
              <Input id="StandInValue" placeholder={vehicleData?.StandInValue?.toString()} type="number" onChange={(e) => setStandInValue(parseInt(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="InternetPrice">Internet Price</Label>
              <Input id="InternetPrice" placeholder={vehicleData?.InternetPrice?.toString()} type="number" onChange={(e) => setInternetPrice(parseInt(e.target.value))} />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleVehicleSave}>Save Vehicle Information</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recon States</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="Workshop">Workshop</Label>
              <Select value={`${reconData?.WorkshopID}`} onValueChange={e => {
                setWorkshop(parseInt(e))
              }}>
                <SelectTrigger id="Workshop">
                  <SelectValue placeholder="Select Workshop" />
                </SelectTrigger>
                <SelectContent>
                  {workshopData?.map(e => {
                    return (
                      <SelectItem key={`${e.WorkshopID}`} value={`${e.WorkshopID}`}>{e.WorkshopName}</SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="WorkshopDate">Workshop Date</Label>
              <Input id="WorkshopDate" type="date" onChange={(e => {
                setWorkshopDate(new Date(e.target.value))
              })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="PanelBeater">Panel Beater</Label>
              <Select value={`${reconData?.PannelBeaterID}`} onValueChange={e => {
                setPanelBeater(parseInt(e))
              }}>
                <SelectTrigger id="PanelBeater">
                  <SelectValue placeholder="Select Panel Beater" />
                </SelectTrigger>
                <SelectContent>
                  {pannelBeaterData?.map(e => {
                    return (
                      <SelectItem key={`${e.PannelBeaterID}`} value={`${e.PannelBeaterID}`}>{e.PannelBeaterName}</SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="PanelBeaterDate">Panel Beater Date</Label>
              <Input id="PanelBeaterDate" type="date" onChange={(e => {
                setPanelBeaterDate(new Date(e.target.value))
              })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="InteriorRepairer">Interior Repairer</Label>
              <Select value={`${reconData?.InteriorRepairerID}`} onValueChange={e => {
                setInteriorRepairer(parseInt(e))
              }}>
                <SelectTrigger id="InteriorRepairer">
                  <SelectValue placeholder="Select Interior Repairer" />
                </SelectTrigger>
                <SelectContent>
                  {interiorRepairData?.map(e => {
                    return (
                      <SelectItem key={`${e.InteriorRepairerID}`} value={`${e.InteriorRepairerID}`}>{e.InteriorRepairerName}</SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="InteriorRepairDate">Interior Repair Date</Label>
              <Input id="InteriorRepairDate" type="date" onChange={(e => {
                setInteriorRepairDate(new Date(e.target.value))
              })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Valet">Valet</Label>
              <Select value={`${reconData?.ValetID}`} onValueChange={e => {
                setValet(parseInt(e))
              }}>
                <SelectTrigger id="Valet">
                  <SelectValue placeholder="Select Valet" />
                </SelectTrigger>
                <SelectContent>
                  {valetData?.map(e => {
                    return (
                      <SelectItem key={`${e.ValetID}`} value={`${e.ValetID}`}>{e.ValetName}</SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ValetDate">Valet Date</Label>
              <Input id="ValetDate" type="date" onChange={(e => {
                setValetDate(new Date(e.target.value))
              })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="DateOnFloor">Date On Floor</Label>
              <Input id="DateOnFloor" type="date" onChange={(e => {
                setDateOnFloor(new Date(e.target.value))
                console.log(dateOnFloor)
              })} />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleReconSave}>Save Recon States</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Internet States</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="PicsTaken" defaultChecked={internetData?.PicsTaken} onCheckedChange={() => {
                console.log(picsTaken)
                setPicsTaken(!picsTaken)
              }} />
              <Label htmlFor="PicsTaken">Pictures Taken</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="PicsOnPc" defaultChecked={internetData?.PicsOnPc} onCheckedChange={() => setPicsOnPc(!picsOnPc)} />
              <Label htmlFor="PicsOnPc">Pictures on PC</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="OnAutoTrader" defaultChecked={internetData?.OnAutoTrader} onCheckedChange={() => setOnAutoTrader(!onAutoTrader)} />
              <Label htmlFor="OnAutoTrader">On AutoTrader</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="OnCars" defaultChecked={internetData?.OnCars} onCheckedChange={() => setOnCars(!onCars)} />
              <Label htmlFor="OnCars">On Cars</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="OnPMGUsed" defaultChecked={internetData?.OnPMGUsed} onCheckedChange={() => setOnPMGUsed(!onPMGUsed)} />
              <Label htmlFor="OnPMGUsed">On PMG Used</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="OnWhatsapp" defaultChecked={internetData?.OnWhatsapp} onCheckedChange={() => setOnWhatsapp(!onWhatsapp)} />
              <Label htmlFor="OnWhatsapp">On Whatsapp</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="OnPinnacle" defaultChecked={internetData?.OnPinnacle} onCheckedChange={() => setOnPinnacle(!onPinnacle)} />
              <Label htmlFor="OnPinnacle">On Pinnacle</Label>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleInternetSave}>Save Internet States</Button>
        </CardFooter>
      </Card>
    </div>
  )
}