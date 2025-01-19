// src/api/index.ts
import axios from 'axios';

export const API_ENDPOINT = 'http://localhost:3000';

export async function fetchRecipientByUsername(username: string) {
    const response = await axios.get(`${API_ENDPOINT}/username/${username}`);
    return response.data;
}

export async function getTransaction(sender: string, recipient: string, amount: number) {
    const response = await axios.post(`${API_ENDPOINT}/transaction`, {
        sender: sender,
        recipient: recipient,
        amount: amount
    })
    return response.data;
}
