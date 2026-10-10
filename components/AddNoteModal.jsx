import {
    ActivityIndicator,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

const AddNoteModal = ({
    newNote,
    setNewNote,
    setModalVisible,
    addNote,
    modalVisible,
    saving,
}) => {
    return (
        <Modal
            animationType="slide"
            transparent
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Add note</Text>
                    <TextInput
                        autoFocus
                        multiline
                        placeholder="Write your note..."
                        style={styles.input}
                        value={newNote}
                        onChangeText={setNewNote}
                    />
                    <View style={styles.actions}>
                        <Pressable
                            disabled={saving}
                            onPress={() => setModalVisible(false)}
                            style={[styles.button, styles.cancelButton]}
                        >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </Pressable>
                        <Pressable
                            disabled={saving || !newNote.trim()}
                            onPress={addNote}
                            style={[
                                styles.button,
                                styles.saveButton,
                                (saving || !newNote.trim()) && styles.disabledButton,
                            ]}
                        >
                            {saving ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.saveText}>Save</Text>
                            )}
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
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
});

export default AddNoteModal;
