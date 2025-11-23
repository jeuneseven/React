import AddNoteModal from "@/components/AddNoteModal";
import NoteList from "@/components/NoteList";
import { useAuth } from "@/contexts/AuthContext";
import noteService from "@/services/noteService";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const NoteScreen = () => {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [notes, setNotes] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newNoteText, setNewNoteText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/auth");
    }
  }, [user, authLoading]);

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    const response = await noteService.getNotes(user.$id);
    if (response.error) {
      setError(response.error);
      Alert.alert("Error", response.error);
    } else {
      // console.log("Fetched notes:", response.data);
      setNotes(response.data);
      setError(null);
    }

    setLoading(false);
  };

  const addNote = async () => {
    if (newNoteText.trim() === "") return;

    const response = await noteService.addNote(user.$id, newNoteText);
    if (response.error) {
      Alert.alert("Error", response.error);
    } else {
      setNotes([...notes, response.data]);
    }

    setNewNoteText("");
    setModalVisible(false);
  };

  const updateNote = async (noteId, text) => {
    if (text.trim() === "") {
      Alert.alert("Error", "Note text cannot be empty");
      return;
    }

    const response = await noteService.updateNote(noteId, text);
    if (response.error) {
      Alert.alert("Error", response.error);
    } else {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.$id === noteId ? { ...note, text: response.data.text } : note
        )
      );
    }
  };

  const deleteNote = async (noteId) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this note?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const response = await noteService.deleteNote(noteId);
            if (response.error) {
              Alert.alert("Error", response.error);
            } else {
              setNotes(notes.filter((note) => note.$id !== noteId));
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
      ) : (
        <>
          {error && <Text style={styles.errorText}>{error}</Text>}
          {notes.length === 0 && !error ? (
            <Text style={styles.noNotesText}>No notes available. Add one!</Text>
          ) : (
            <NoteList
              notes={notes}
              onDelete={deleteNote}
              onUpdate={updateNote}
            />
          )}
        </>
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Add Note</Text>
      </TouchableOpacity>

      <AddNoteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        newNoteText={newNoteText}
        setNewNoteText={setNewNoteText}
        addNote={addNote}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 16,
  },
  noNotesText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    marginTop: 15,
  },
});

export default NoteScreen;
