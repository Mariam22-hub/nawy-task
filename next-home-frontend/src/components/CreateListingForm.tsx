"use client";

import React, { useActionState, useEffect, useState } from "react";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ActionResponse } from "@/models/types";
import { createListingAction } from "@/lib/actions";
import { useRouter } from "next/navigation";

const initialState: ActionResponse = {
  success: false,
  message: '',
}

export default function CreateListingForm() {
  const [state, action, isPending] = useActionState(createListingAction, initialState);
  const router = useRouter();  // Correct usage

  useEffect(() => {
    if (state.success) {
      router.push("/");
    }
  }, [state.success, router]);

  return (
    <Card className="w-full max-w-4xl mx-auto mt-7">
      <CardHeader>  
        <CardTitle>Listing Information</CardTitle>
        <CardDescription>Please enter your listing details below.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-6" autoComplete="on">
          <div className="space-y-4">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Listing Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Luxury Apartment with Sea View"
                defaultValue={state.fields?.title}
                autoComplete="off"
                aria-describedby="title-error"
                className={state?.errors?.title ? 'border-red-500' : ''}
              />
              {state?.errors?.title && (
                <p id="title-error" className="text-sm text-red-500">
                  {state.errors.title[0]}
                </p>
              )}
            </div>

            {/* Unit Number */}
            <div className="space-y-2">
              <Label htmlFor="unitNumber">Unit Number</Label>
              <Input
                id="unitNumber"
                name="unitNumber"
                placeholder="A-200"
                defaultValue={state.fields?.unitNumber}
                autoComplete="unit-number"
                aria-describedby="unitNumber-error"
                className={state?.errors?.unitNumber ? 'border-red-500' : ''}
              />
              {state?.errors?.unitNumber && (
                <p id="unitNumber-error" className="text-sm text-red-500">
                  {state.errors.unitNumber[0]}
                </p>
              )}
            </div>

            {/* Project */}
            <div className="space-y-2">
              <Label htmlFor="project">Project</Label>
              <Input
                id="project"
                name="project"
                placeholder="Palm Heights"
                defaultValue={state.fields?.project}
                autoComplete="off"
                aria-describedby="project-error"
                className={state?.errors?.project ? 'border-red-500' : ''}
              />
              {state?.errors?.project && (
                <p id="project-error" className="text-sm text-red-500">
                  {state.errors.project[0]}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                name="price"
                placeholder="1,250,000"
                defaultValue={state.fields?.price ?? ""}
                autoComplete="off"
                aria-describedby="price-error"
                className={state?.errors?.price ? 'border-red-500' : ''}
              />
              {state?.errors?.price && (
                <p id="price-error" className="text-sm text-red-500">
                  {state.errors.price[0]}
                </p>
              )}
            </div>

            {/* Bedrooms & Bathrooms Row */}
            <div className="grid grid-cols-3 gap-10">
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  name="bedrooms"
                  type="number"
                  placeholder="2"
                  defaultValue={state.fields?.bedrooms !== undefined ? String(state.fields.bedrooms) : ""}
                  aria-describedby="bedrooms-error"
                  className={state?.errors?.bedrooms ? 'border-red-500' : ''}
              />
              {state?.errors?.bedrooms && (
                <p id="bedrooms-error" className="text-sm text-red-500">
                  {state.errors.bedrooms[0]}
                </p>
              )}
              </div>

              {/* Bathrooms */}
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  name="bathrooms"
                  type="number"
                  placeholder="2"
                  defaultValue={state.fields?.bathrooms !== undefined ? String(state.fields.bathrooms) : ""}
                  aria-describedby="bathrooms-error"
                  className={state?.errors?.bathrooms ? 'border-red-500' : ''}
              />
                {state?.errors?.bathrooms && (
                  <p id="bathrooms-error" className="text-sm text-red-500">
                    {state.errors.bathrooms[0]}
                  </p>
                )}
              </div>
              <div className="space-y-2 w-full">
                <Label htmlFor="type">Listing Type</Label>
                <Select name="type" defaultValue={state.fields?.type || ""}>
                  <SelectTrigger id="type" className={`w-full ${state?.errors?.type ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rent">Rent</SelectItem>
                    <SelectItem value="sale">Sale</SelectItem>
                  </SelectContent>
                </Select>
                {state?.errors?.type && (
                  <p id="type-error" className="text-sm text-red-500">
                    {state.errors.type[0]}
                  </p>
                )}
              </div>
            </div>

            {/* Area */}
            <div className="space-y-2">
              <Label htmlFor="area">Area (sq ft)</Label>
              <Input
                id="area"
                name="area"
                type="number"
                placeholder="1200"
                defaultValue = {state.fields?.area !== undefined ? String(state.fields.area) : ""}
                aria-describedby="area-error"
                className={state?.errors?.area ? 'border-red-500' : ''}
              />
              {state?.errors?.area && (
                <p id="area-error" className="text-sm text-red-500">
                  {state.errors.area[0]}
                </p>
              )}
            </div>

            {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="Downtown, Miami"
                  defaultValue={state.fields?.location}
                  autoComplete="address-level2"
                  aria-describedby="location-error"
                  className={state?.errors?.location ? 'border-red-500' : ''}
                />
                {state?.errors?.location && (
                  <p id="location-error" className="text-sm text-red-500">
                    {state.errors.location[0]}
                  </p>
                )}
              </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe the property..."
                defaultValue={state.fields?.description}
                aria-describedby="description-error"
                className={state?.errors?.description ? 'border-red-500' : ''}
              />
              {state?.errors?.description && (
                <p id="description-error" className="text-sm text-red-500">
                  {state.errors.description[0]}
                </p>
              )}
            </div>

            {/* Image URL */}
            {/* <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                type="url"
                placeholder="https://example.com/property-image.jpg"
                defaultValue={state.fields?.image}
                aria-describedby="image-error"
                className={state?.errors?.image ? 'border-red-500' : ''}
              />
              {state?.errors?.image && (
                <p id="image-error" className="text-sm text-red-500">
                  {state.errors.image[0]}
                </p>
              )}
            </div> */}
          </div> 

          {state.message && (
            <Alert className={state.success ? "bg-green-50" : "bg-red-50"}>
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}

          <Button 
            type="submit" 
            className="w-full bg-blue-950"
            disabled={isPending}
          >
            {isPending ? 'Adding Listing...' : 'Add Listing'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}