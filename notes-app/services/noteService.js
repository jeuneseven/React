import { ID, Query } from 'react-native-appwrite';
import databaseService from "./databaseService";

const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID;

const noteService = {
    // Get notes from the database
    async getNotes(userID) {
        if (!userID) {
            console.error("User ID is required to fetch notes");
            return { data: [], error: 'User ID is missing' };
        }

        try {
            const response = await databaseService.listDocuments(dbId, colId, [Query.equal('user_id', userID)]);
            return response
        } catch (error) {
            console.error("Error fetching notes:", error);
            return { data: [], error: 'Failed to fetch notes' };
        }
    },

    async addNote(user_id, noteData) {
        if (!noteData) {
            return { error: "Note data is invalid" };
        }
        const data  = { text: noteData, user_id: user_id };
        const response = await databaseService.createDocument(dbId, colId, data, ID.unique());
        if (response?.error) {
            return { error: response.error };
        }

        return { data: response };
    },

    async updateNote(noteId, noteData) {
        if (!noteId || !noteData) {
            return { error: "Note ID or data is invalid" };
        }

        const data = { text: noteData };
        const response = await databaseService.updateDocument(dbId, colId, noteId, data);
        if (response?.error) {
            return { error: response.error };
        }

        return { data: response };
    },

    async deleteNote(noteId) {
        const response = await databaseService.deleteDocument(dbId, colId, noteId);
        if (response?.error) {
            return { error: response.error };
        }

        return { success: true };
    },
};

export default noteService;