'use client'

import { useState } from 'react'
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/components/ui/card"
import { api } from "~/trpc/react";

export function VehicleEntryFormComponent() {
  const [formData, setFormData] = useState({
    stockNumber: '',
    vinNumber: '',
    registration: '',
    model: '',
    mileage: '',
    mmCode: '',
    cost: ''
  })

  const createVehicleMutation = api.createVehicle.createVehicleWithReconAndInternet.useMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await createVehicleMutation.mutateAsync({
        StockNum: formData.stockNumber,
        VIN: formData.vinNumber,
        Registration: formData.registration,
        Model: formData.model,
        Odometer: Number(formData.mileage),
        MMCode: Number(formData.mmCode),
        StandInValue: Number(formData.cost),
        InternetPrice: Number(formData.cost),
      })
      console.log('Vehicle created:', result)
      // Reset form after successful submission
      setFormData({
        stockNumber: '',
        vinNumber: '',
        registration: '',
        model: '',
        mileage: '',
        mmCode: '',
        cost: ''
      })
    } catch (error) {
      console.error('Error creating vehicle:', error)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Vehicle Entry Form</CardTitle>
        <CardDescription>Enter the details for a new vehicle entry.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stockNumber">Stock Number</Label>
              <Input
                id="stockNumber"
                name="stockNumber"
                value={formData.stockNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vinNumber">VIN Number</Label>
              <Input
                id="vinNumber"
                name="vinNumber"
                value={formData.vinNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="registration">Registration</Label>
            <Input
              id="registration"
              name="registration"
              value={formData.registration}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mileage">Mileage</Label>
              <Input
                id="mileage"
                name="mileage"
                type="number"
                value={formData.mileage}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mmCode">MMCode</Label>
              <Input
                id="mmCode"
                name="mmCode"
                value={formData.mmCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cost">Cost</Label>
            <Input
              id="cost"
              name="cost"
              type="number"
              step="0.01"
              value={formData.cost}
              onChange={handleChange}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            {'Submit Vehicle Entry'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}