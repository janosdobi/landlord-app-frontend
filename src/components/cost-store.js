import { writable } from 'svelte/store';

// Define the initial state of the store
const store = [];

// Create the writable store
export const aggregatedCostsStore = writable(store);
