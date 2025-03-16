'use-client'
import { Control } from "react-hook-form";
import { Input } from "@/components/ui/input"

import React from 'react'
import { FormFieldType } from "./Forms/PatientForm";
import Image from 'next/image';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import ReactDatePicker from "react-datepicker";


import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Label } from "@radix-ui/react-label";
import { Select, SelectContent, SelectTrigger, SelectValue} from "@radix-ui/react-select";
import * as Checkbox from "@radix-ui/react-checkbox";

    

  interface CustomProps{
    control: Control<any>,
    fieldType: FormFieldType,
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?:string,
    iconAlt?:string,
    disabled?:boolean,
    dateFormat?:string,
    showTimeSelect?:boolean,
    children?: React.ReactNode,
    renderSkeleton?:(field:any)=>React.ReactNode
  }

  const RenderField =({field,props}:{field:any; props: CustomProps}) =>{
    const {fieldType, iconSrc, iconAlt, placeholder, showTimeSelect, dateFormat, renderSkeleton}= props;

    switch (fieldType){
        case FormFieldType.INPUT:
        return (
            <div className="flex rounded-md border border-dark-500 bg-dark-400">
            {iconSrc && (
                <Image
                src={iconSrc}
                height={24}
                width={24}
                alt={iconAlt || 'icon'}
                className='ml-2'
                />
            )}
            <FormControl>
                <Input
                placeholder={placeholder}
                {...field}
                className="shad-input border-0"
                />
            </FormControl>
            </div>
        )
        case FormFieldType.TEXTAREA:
          return (
            <FormControl>
              <textarea
                placeholder={props.placeholder}
                {...field}
                className="shad-textArea "
                disabled={props.disabled}
              />
            </FormControl>
          );
        

        case FormFieldType.PHONE_INPUT:
          return (
            <FormControl>
              <PhoneInput 
              defaultCountry="US"
              placeholder= {placeholder}
              international
              withCountryCallingCode
              value={field.value}
              onChange={field.onChange}
              className="input-phone"
              />
            </FormControl>
          )
          case FormFieldType.CHECKBOX:
            return (
              <FormControl>
                <div className="flex items-center gap-4">
                  <Checkbox.Root
                    id={props.name}
                    checked={Boolean(field.value)} // Ensure value is boolean
                    onCheckedChange={(checked) => field.onChange(checked === true)} // Normalize value
                    className="w-5 h-5 bg-gray-200 border border-gray-400 rounded focus:outline-none"
                  >
                    <Checkbox.Indicator className="flex items-center justify-center">
                      ✔
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <label htmlFor={props.name} className="checkbox-label">
                    {props.label}
                  </label>
                </div>
              </FormControl>
            );
          
          case FormFieldType.DATE_PICKER:
            return(
              <div className="flex rounded-md border border-dark-500 bg-dark-400">
                 <Image 
                 src='/assets/icons/calendar.svg'
                 height={24}
                 width={24}
                 alt="calendar"
                 className="ml-2"
                 />
                 <FormControl>
                 <ReactDatePicker
              showTimeSelect={props.showTimeSelect ?? false}
              selected={field.value}
              onChange={(date: Date | null) => field.onChange(date)}
              timeInputLabel="Time:"
              dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
              wrapperClassName="date-picker"
            />
                 </FormControl>
              </div>
            )
            case FormFieldType.SELECT:
              return (
                <FormControl>
                  <Select
                    value={field.value} // Bind the value to the form state
                    onValueChange={field.onChange} // Update the form state when changed
                  >
                    <SelectTrigger className="shad-select-trigger">
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    
                    <SelectContent className="shad-select-content">
                      {props.children} {/* Ensure children are valid <SelectItem> elements */}
                    </SelectContent>
                  </Select>
                </FormControl>
              );
            
            case FormFieldType.SKELETON:
              return renderSkeleton ? renderSkeleton
              (field): null
              

        default:
            break;
    }
}

const CustomFormField = (props: CustomProps)=>{
 const { control, fieldType, name, label } =props ;
  return (
    <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex-1">
        {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
        )}

        <RenderField field={field} props={props} />
      
<FormMessage className="shad-error"  />   
</FormItem>
    )}
  />
  )
}

export default CustomFormField
