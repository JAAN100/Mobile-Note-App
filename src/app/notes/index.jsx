
import { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';

import NoteList from '../../../components/NoteList';
import AddNoteModal from '../../../components/AddNoteModal';
import { getMyNotes, createNote, deleteNote } from '../../../services/notes';
const NoteScreen = () => {
    const [notes, setNotes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newNote, setNewNote] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Load saved notes from Appwrite
    useEffect(() => {
        const loadNotes = async () => {
            try {
                const savedNotes = await getMyNotes();
                setNotes(savedNotes);
            } catch (error) {
                console.error('Load notes error:', error);
                Alert.alert(
                    'Unable to load notes',
                    error.message || 'Please try again.'
                );
            } finally {
                setLoading(false);
            }
        };

        loadNotes();
    }, []);

    // Save a note to Appwrite
    const addNote = async () => {
        const text = newNote.trim();

        if (!text || saving) return;

        try {
            setSaving(true);

            const savedNote = await createNote(text);

            setNotes((previousNotes) => [
                savedNote,
                ...previousNotes,
            ]);

            setNewNote('');
            setModalVisible(false);
        } catch (error) {
            console.error('Save note error:', error);
            Alert.alert(
                'Unable to save note',
                error.message || 'Please try again.'
            );
        } finally {
            setSaving(false);
        }
    };

    const onDelete = (id) => {
        Alert.alert(
            "Delete Note",
            "Are you sure you wanna delete this note?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const response = await deleteNote(id);
                            setNotes(response);
                        } catch (error) {
                            Alert.alert(
                                "Error",
                                error.message || "Failed to delete note."
                            );
                        }
                    },
                },
            ]
        );
    };


    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#007bff" />
            ) : notes.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                        No notes yet. Add your first note!
                    </Text>
                </View>
            ) : (
                <NoteList notes={notes} onDelete={onDelete} />
            )}

            <TouchableOpacity
                style={styles.addButton}
                activeOpacity={0.8}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.addbuttonText}>+ Add Note</Text>
            </TouchableOpacity>

            <AddNoteModal
                newNote={newNote}
                setNewNote={setNewNote}
                setModalVisible={setModalVisible}
                addNote={addNote}
                modalVisible={modalVisible}
                saving={saving}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        alignItems: 'center',
    },
    addbuttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        color: '#666',
        fontSize: 16,
    },
});

export default NoteScreen;