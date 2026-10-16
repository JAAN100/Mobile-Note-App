import { ID, Permission, Query, Role } from "react-native-appwrite";
import { account, tablesDB } from "../lib/appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID;
const TITLE_ATTRIBUTE = "Title";

// Throws if nobody is logged in. Sessions come from the auth service.
const requireUser = async () => {
  try {
    return await account.get();
  } catch {
    throw new Error("Not logged in");
  }
};

// Appwrite rows use `$id`; the UI components expect `id`.
const toNote = (row) => ({
  id: row.$id,
  text: row[TITLE_ATTRIBUTE],
  createdAt: row.$createdAt,
});

export const getMyNotes = async () => {
  await requireUser();

  const result = await tablesDB.listRows({
    databaseId: DATABASE_ID,
    tableId: TABLE_ID,
    queries: [Query.orderDesc("$createdAt")],
  });

  return result.rows.map(toNote);
};

export const createNote = async (text) => {
  const user = await requireUser();

  const row = await tablesDB.createRow({
    databaseId: DATABASE_ID,
    tableId: TABLE_ID,
    rowId: ID.unique(),
    data: { [TITLE_ATTRIBUTE]: text },
    permissions: [
      Permission.read(Role.user(user.$id)),
      Permission.update(Role.user(user.$id)),
      Permission.delete(Role.user(user.$id)),
    ],
  });

  return toNote(row);
};

export const deleteNote = async (id) => {
  await requireUser();

  await tablesDB.deleteRow({
    databaseId: DATABASE_ID,
    tableId: TABLE_ID,
    rowId: id,
  });

  return await getMyNotes();
};

export const updateNote = async (id, title) => {
  await requireUser();

  await tablesDB.updateRow({
    databaseId: DATABASE_ID,
    tableId: TABLE_ID,
    rowId: id,
    data: { [TITLE_ATTRIBUTE]: title },
  });

  return await getMyNotes();
};
