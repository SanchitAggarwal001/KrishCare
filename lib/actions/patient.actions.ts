'use server'
import { Query, ID } from 'node-appwrite';
import { users } from '../appwrite.config';
import { parseStringify } from '../utils';

import {
    BUCKET_ID,
    DATABASE_ID,
    ENDPOINT,
    PATIENT_COLLECTION_ID,
    PROJECT_ID,
    databases,
    storage,
  } from "../appwrite.config";


export const createUser = async (user: CreateUserParams) => {
    try {
        const newUser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            // user.password,  
            user.name
        );
        console.log({ newUser });

        return parseStringify(newUser);
    } catch (error: any) {
        if (error?.code === 409) {
            const documents = await users.list([
                Query.equal("email", user.email) 
            ]);

            return documents.users.length > 0 ? documents.users[0] : null;
        }

        console.error("Error creating user:", error);
        return null; 
    }
};

export const getUser = async (userId: string) =>{
    try{
    const user = await users.get(userId);

    return parseStringify(user)
    } catch(error){
        console.log(error)
    }
}

export const registerPatient = async ({
    identificationDocument,
    ...patient
  }: RegisterUserParams) => {
    try {
      let file;
      if (identificationDocument) {
        const inputFile =
          identificationDocument &&
          InputFile.fromBlob(
            identificationDocument?.get("blobFile") as Blob,
            identificationDocument?.get("fileName") as string
          );
  
        file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
      }
  
      // Create new patient document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
      const newPatient = await databases.createDocument(
        DATABASE_ID!,
        PATIENT_COLLECTION_ID!,
        ID.unique(),
        {
          identificationDocumentId: file?.$id ? file.$id : null,
          identificationDocumentUrl: file?.$id
            ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
            : null,
          ...patient,
        }
      );
  
      return parseStringify(newPatient);
    } catch (error) {
      console.error("An error occurred while creating a new patient:", error);
    }
  };
  
