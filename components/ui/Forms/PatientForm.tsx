"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { account } from "@/lib/appwrite-client.config";
import { ID } from "appwrite";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datepicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try {
      // Generate a random password for the user (you might want to add a password field to your form instead)
      const password = Math.random().toString(36).slice(-8);
      
      const user = await account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (user.$id) {
        try {
          // Try to create session first
          await account.createSession(email, password);
          
          // If session creation succeeds, send verification email
          await account.createVerification(`${window.location.origin}/verify`);
          
          router.push(`/patients/${user.$id}/register`);
        } catch (error: any) {
          // If error is due to unverified email
          if (error?.code === 401) {
            // Just send verification email and proceed
            await account.createVerification(`${window.location.origin}/verify`);
            router.push(`/patients/${user.$id}/register?verify=true`);
          } else {
            console.error("Error in session/verification:", error);
            // Still proceed to registration since user was created
            router.push(`/patients/${user.$id}/register`);
          }
        }
      }
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1 text-white">
        <section className="mb-10 space-y-4">
          <h1 className="text-3xl font-bold">Hi There</h1>
          <p className="text-dark-700">Schedule Your First Appointment</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full name"
          placeholder="Sanchit Aggarwal"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="example@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />
        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone No"
          placeholder="+91 384 (781)"
        />

        <SubmitButton isLoading={isLoading} className="w-full bg-green-500 text-white hover:bg-primary/90">
          Get Started
        </SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
