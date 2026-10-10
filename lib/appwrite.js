import "react-native-url-polyfill/auto";

import { Client, Account, TablesDB } from "react-native-appwrite";

// Expo only inlines EXPO_PUBLIC_* variables when they are written out as
// `process.env.NAME` (dynamic access like process.env[name] won't work).
const config = {
  EXPO_PUBLIC_APPWRITE_ENDPOINT: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  EXPO_PUBLIC_APPWRITE_PROJECT_ID: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  EXPO_PUBLIC_APPWRITE_PLATFORM: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM,
};

const missing = Object.keys(config).filter((key) => !config[key]);

const client = new Client()
  .setEndpoint(config.EXPO_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(config.EXPO_PUBLIC_APPWRITE_PROJECT_ID)
  .setPlatform(config.EXPO_PUBLIC_APPWRITE_PLATFORM);

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
