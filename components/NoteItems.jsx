import { useRef, useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
const NoteItem = ({ note, onDelete, onEdit }) => {
    const [editing, setEditing] = useState(false);
    const [editedText, setEditedText] = useState(note.text);
    const inputRef = useRef(null);
    const handleSave = () => {
        if (editedText.trim() === "") {
            setEditedText(note.text);
            return;
        }

        onEdit(note.id, editedText);
        setEditing(false);
    };
    return (
        <View style={styles.noteItem}>
            {
                editing ? (
                    <TextInput
                        ref={inputRef}
                        style={styles.inputEdit}
                        value={editedText}
                        onChangeText={setEditedText}
                        autoFocus
                        onSubmitEditing={handleSave}
                        returnKeyType="done"
                    ></TextInput>
                ) : (

                    <Text style={styles.noteText}>{note.text}</Text>
                )
            }
            <View style={{ flexDirection: "row", gap: 20 }}>
                {
                    editing ? (
                        <TouchableOpacity onPress={() => {
                            handleSave();
                            inputRef.current.blur()
                        }}>
                            <Text style={styles.edit}>💾</Text>
                        </TouchableOpacity>

                    ) : (
                        <TouchableOpacity onPress={() => setEditing(true)}>
                            <Text style={styles.edit}>✏️</Text>
                        </TouchableOpacity>

                    )
                }
                <TouchableOpacity onPress={() => onDelete(note.id)}>
                    <Text style={styles.delete}>❌</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    noteItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#f5f5f5",
        padding: 15,
        borderRadius: 5,
        marginVertical: 5,
    },
    noteText: {
        fontSize: 18,
        fontWeight: "600",
    },
    delete: {
        fontSize: 18,
        color: "red",
    },
    edit: {
        fontSize: 18,
        color: "blue",
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    container: {
        padding: 20,
        borderRadius: 12,
        backgroundColor: '#fff',
    },
    title: {
        marginBottom: 12,
        fontSize: 20,
        fontWeight: '700',
    },
    input: {
        minHeight: 120,
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        textAlignVertical: 'top',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
        marginTop: 16,
    },
    button: {
        minWidth: 90,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#eee',
    },
    saveButton: {
        backgroundColor: '#007bff',
    },
    disabledButton: {
        opacity: 0.5,
    },
    cancelText: {
        color: '#333',
        fontWeight: '600',
    },
    saveText: {
        color: '#fff',
        fontWeight: '600',
    },
    inputEdit: {
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        textAlignVertical: 'top',
    },
});
export default NoteItem;
