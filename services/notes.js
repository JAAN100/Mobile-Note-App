import { ID, Permission, Query, Role } from "react-native-appwrite";
import { account, tablesDB } from "../lib/appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID;
const TITLE_ATTRIBUTE = "Title";

// There is no login screen yet, so make sure there is always a session.
// Reuses an existing session, otherwise creates an anonymous one.
let userPromise = null;
const ensureUser = () => {
  if (!userPromise) {
    userPromise = account.get().catch(async () => {
      await account.createAnonymousSession();
      return account.get();
    });
    userPromise.catch(() => {
      userPromise = null;
    });
  }
  return userPromise;
};

// Appwrite rows use `$id`; the UI components expect `id`.
const toNote = (row) => ({
  id: row.$id,
  text: row[TITLE_ATTRIBUTE],
  createdAt: row.$createdAt,
});

export const getMyNotes = async () => {
  await ensureUser();

  const result = await tablesDB.listRows({
    databaseId: DATABASE_ID,
    tableId: TABLE_ID,
    queries: [Query.orderDesc("$createdAt")],
  });

  return result.rows.map(toNote);
};

export const createNote = async (text) => {
  const user = await ensureUser();

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
  await ensureUser();

  await tablesDB.deleteRow({
    databaseId: DATABASE_ID,
    tableId: TABLE_ID,
    rowId: id,
  });

  return await getMyNotes();
};
