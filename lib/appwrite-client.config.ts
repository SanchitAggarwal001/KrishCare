import { Client, Account } from 'appwrite';

const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!endpoint || !projectId) {
    throw new Error('Missing required environment variables NEXT_PUBLIC_ENDPOINT or NEXT_PUBLIC_PROJECT_ID');
}

const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId);

export const account = new Account(client);

export default client;
