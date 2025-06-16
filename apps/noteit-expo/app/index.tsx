// apps/noteit-expo/app/index.tsx
import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback, memo, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';

interface Note {
  id: string;
  text: string;
}

// Memoized Footer Component
interface ListFooterProps {
  selectedNote: Note | null;
}
const ListFooter = memo(({ selectedNote }: ListFooterProps) => {
  console.log('ListFooter rendered'); // For debugging re-renders
  return (
    <>
      {selectedNote && (
        <View style={styles.selectedNoteContainer}>
          <Text style={styles.subHeader}>Selected Note:</Text>
          <Text style={styles.selectedNoteContent}>{selectedNote.text}</Text>
        </View>
      )}
      <Text style={styles.platformText}>Running on: {Platform.OS}</Text>
    </>
  );
});

export default function IndexPage() {
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', text: 'First sample note' },
    { id: '2', text: 'Another important idea' },
    { id: '3', text: 'Meeting notes for project X' },
  ]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [newNoteText, setNewNoteText] = useState('');

  // Ref to hold the current newNoteText for use in stable callbacks
  const newNoteTextRef = useRef(newNoteText);
  useEffect(() => {
    newNoteTextRef.current = newNoteText;
  }, [newNoteText]);

  const handleSelectNote = useCallback((note: Note) => {
    setSelectedNote(note);
  }, []);

  const handleAddNote = useCallback(() => {
    const currentText = newNoteTextRef.current;
    if (currentText.trim() === '') return;
    const newId = Date.now().toString();
    setNotes(prevNotes => [...prevNotes, { id: newId, text: currentText }]);
    setNewNoteText(''); // This will trigger re-render and update ref via useEffect
    setSelectedNote(null);
  }, []); // Empty dependency array makes handleAddNote stable

  // For ListFooterComponent, we pass down the selectedNote
  const listFooterComponent = useCallback(() => (
    <ListFooter selectedNote={selectedNote} />
  ), [selectedNote]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>NoteIt!</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter new note..."
          value={newNoteText}
          onChangeText={setNewNoteText} // Direct usage
          onSubmitEditing={handleAddNote} // Direct usage
        />
        <Button title="Add Note" onPress={handleAddNote} color="#6200ee" />
      </View>
      <Text style={styles.subHeader}>My Notes:</Text>
      <FlatList
        style={styles.list}
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.listItemContainer,
              selectedNote?.id === item.id && styles.selectedListItemContainer,
            ]}
            onPress={() => handleSelectNote(item)}
          >
            <Text style={styles.listItemText}>{item.text}</Text>
          </TouchableOpacity>
        )}
        ListHeaderComponent={null}
        ListFooterComponent={listFooterComponent}
        ListEmptyComponent={<Text style={styles.emptyNotesText}>No notes yet. Add one above!</Text>}
        contentContainerStyle={styles.listContentContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 25,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ced4da',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  subHeader: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 15,
    color: '#495057',
  },
  emptyNotesText: {
    textAlign: 'center',
    color: '#6c757d',
    fontSize: 16,
    marginTop: 20,
  },
  list: {
    flex: 1,
  },
  listContentContainer: {
    paddingBottom: 40, // Ensure space at the bottom
  },
  listItemContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    backgroundColor: '#fff',
    borderRadius: 6,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedListItemContainer: {
    backgroundColor: '#e7f3ff', // Highlight selected item
    borderColor: '#007bff',
    borderWidth:1,
  },
  listItemText: {
    fontSize: 18,
    color: '#495057',
  },
  selectedNoteContainer: {
    marginTop: 15,
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  selectedNoteContent: {
    fontSize: 16,
    color: '#212529',
    lineHeight: 24,
  },
  platformText: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 25,
    paddingBottom: 10,
  },
});
