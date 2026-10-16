import { ID } from "react-native-appwrite";
import { account } from "../lib/appwrite";

export const getCurrentUser = async () => {
  try {
    return await account.get();
  } catch (error) {
    if (error?.code === 401) {
      return null;
    }

    throw error;
  }
};

export const signIn = async (email, password) => {
  const normalizedEmail = email.trim().toLowerCase();
  await account.createEmailPasswordSession({
    email: normalizedEmail,
    password,
  });
  return account.get();
};

export const signUp = async (name, email, password) => {
  const normalizedName = name.trim();
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedName) {
    throw new Error("Please enter your name.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    throw new Error("Please enter a valid email address.");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters.");
  }

  await account.create({
    userId: ID.unique(),
    email: normalizedEmail,
    password,
    name: normalizedName,
  });

  return signIn(normalizedEmail, password);
};

export const signOut = async () => {
  await account.deleteSession({ sessionId: "current" });
};
