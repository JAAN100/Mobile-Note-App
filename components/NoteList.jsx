import { Alert, FlatList } from "react-native";
import { deleteNote } from "../services/notes";
import NoteItem from "./NoteItems";

const NoteList = ({ notes, onDelete }) => {
    return (
        <FlatList
            style={{ flex: 1 }}
            // extra bottom space so the floating "+ Add Note" button doesn't cover the last note
            contentContainerStyle={{ paddingBottom: 80 }}
            data={notes}
            keyExtractor={(item) => String(item.id ?? item.$id)}
            renderItem={({ item }) => <NoteItem note={item} onDelete={onDelete} />}
        />
    );
};

export default NoteList;