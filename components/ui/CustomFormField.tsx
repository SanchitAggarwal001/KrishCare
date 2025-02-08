'use-client'
import { Control } from "react-hook-form";
import { Input } from "@/components/ui/input"
import React from 'react'
import {FormFieldType} from './Forms/PatientForm'
import Image from 'next/image';

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Label } from "@radix-ui/react-label";

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
    const {fieldType, iconSrc, iconAlt, placeholder}= props;

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
