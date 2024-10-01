"use client"
import { useState,ChangeEvent } from "react";
import { Button } from "./ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectItem,
  } from "@/components/ui/select";

  const conversionRates: Record <string, Record<string,number>> = {
    length:{
        "Millimeters (mm)":1,
        "Centimeters (cm)":10,
        "Meters (m)":1000,
        "Feet (ft)":304.8,
        "Kilometers (km)":1000000,
        "Inches (in)":25.4,
        "Yards (yd)":914.4,
        "Miles (mi)":1609344,

    },
    weight:{
        "Grams (g)": 1,
        "Kilograms (kg)": 1000,
        "Ounces (oz)": 28.3495,
        "Pounds (lb)": 453.592,
    },
    volume:{
        "Milliliters (ml)": 1,
        "Liters (l)": 1000,
        "Fluid Ounces (fl oz)": 29.5735,
        "Cups (cup)": 240,
        "Pints (pt)": 473.176,
        "Quarts (qt)": 946.353,
        "Gallons (gal)": 3785.41,
    },
            
  };

  const unitTypes: Record<string, string[]> = {
    length: [
      "Millimeters (mm)",
      "Centimeters (cm)",
      "Meters (m)",
      "Kilometers (km)",
      "Inches (in)",
      "Feet (ft)",
      "Yards (yd)",
      "Miles (mi)",
    ],
    weight: ["Grams (g)", "Kilograms (kg)", "Ounces (oz)", "Pounds (lb)"],
    volume: [
      "Milliliters (ml)",
      "Liters (l)",
      "Fluid Ounces (fl oz)",
      "Cups (cup)",
      "Pints (pt)",
      "Quarts (qt)",
      "Gallons (gal)",
    ],
  };
  

  
  export default function UnitConvertor(){

    // State hooks for managing input value, selected units, and the converted value
  const [inputValue, setInputValue] = useState<number | null>(null);
  const [inputUnit, setInputUnit] = useState<string | null>(null);
  const [outputUnit, setOutputUnit] = useState<string | null>(null);
  const [convertedValue, setConvertedValue] = useState<number | null>(null);

   // Handler for updating the input value state on input change
   const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(parseFloat(e.target.value));
  };

  // Handler for updating the input unit state on select change
  const handleInputUnitChange = (value: string): void => {
    setInputUnit(value);
  };

  // Handler for updating the output unit state on select change
  const handleOutputUnitChange = (value: string): void => {
    setOutputUnit(value);
  };

  // Function to convert the input value to the selected output unit
  const convertValue = (): void => {
    if (inputValue !== null && inputUnit && outputUnit) {
      let unitCategory: string | null = null;

      // Determine the unit category (length, weight, volume)
      for (const category in unitTypes) {
        if (
          unitTypes[category].includes(inputUnit) &&
          unitTypes[category].includes(outputUnit)
        ) {
          unitCategory = category;
          break;
        }
      }

      // Perform the conversion if the units are compatible
      if (unitCategory) {
        const baseValue = inputValue * conversionRates[unitCategory][inputUnit];
        const result = baseValue / conversionRates[unitCategory][outputUnit];
        setConvertedValue(result);
      } else {
        setConvertedValue(null);
        alert("Incompatible unit types selected."); // Alert if units are incompatible
      }
    } else {
      setConvertedValue(null);
      alert("Please fill all fields."); // Alert if any field is empty
    }
  };
    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-amber-500 dark:bg-gray-900">
        {/* Center the unit converter card within the screen */}
        <div className="max-w-md w-full p-6 bg-card rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-1 text-center text-amber-900 ">Unit Converter</h1>
          <p className="text-sm mb-8 text-center text-amber-950 font-semibold">
            Convert values between different units.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Select for input unit */}
            <div className="space-y-2">
              <Label htmlFor="input-unit" className="text-amber-950 font-bold">From</Label>
              <Select onValueChange={handleInputUnitChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(unitTypes).map(([category, units]) => (
                    <SelectGroup key={category}>
                      <SelectLabel>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectLabel>
                      {units.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Select for output unit */}
            <div className="space-y-2">
              <Label htmlFor="output-unit" className="text-amber-950 font-bold">To</Label>
              <Select onValueChange={handleOutputUnitChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(unitTypes).map(([category, units]) => (
                    <SelectGroup key={category}>
                      <SelectLabel>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectLabel>
                      {units.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Input for value to convert */}
            <div className="space-y-2 col-span-2">
              <Label htmlFor="input-value" className="text-amber-950 font-semibold">Value</Label>
              <Input
                id="input-value"
                type="number"
                placeholder="Enter value"
                value={inputValue || ""}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
            {/* Button to trigger conversion */}
            <Button
              type="button"
              className="col-span-2 bg-amber-950 text-amber-50 hover:bg-amber-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              onClick={convertValue}
            >
              Convert
            </Button>
          </div>
          {/* Display the converted value */}
          <div className="mt-6 text-center">
            <div className="text-4xl font-bold text-amber-950">
              {convertedValue !== null ? convertedValue.toFixed(2) : "0"}
            </div>
            <div className="text-muted-foreground">
              {outputUnit ? outputUnit : "Unit"}
            </div>
          </div>
        </div>
      </div>
    
        
        
    )
  }