import { FlatList } from "react-native";
import NoteItem from "./NoteItems";

const NoteList = ({ notes, onDelete, onEdit }) => {
    return (
        <FlatList
            style={{ flex: 1 }}
            // extra bottom space so the floating "+ Add Note" button doesn't cover the last note
            contentContainerStyle={{ paddingBottom: 80 }}
            data={notes}
            keyExtractor={(item) => String(item.id ?? item.$id)}
            renderItem={({ item }) => <NoteItem note={item} onDelete={onDelete} onEdit={onEdit} />}
        />
    );
};

export default NoteList;