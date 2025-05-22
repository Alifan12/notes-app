import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001/notes';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    axios.get(API_URL).then(res => setNotes(res.data));
  }, []);

  const addNote = async () => {
    if (!newNote.trim()) return;
    const res = await axios.post(API_URL, { text: newNote });
    setNotes([...notes, res.data]);
    setNewNote('');
  };

  const deleteNote = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '100%', margin: 'auto' }}>
      <h1>📝 Simple Notes</h1>
      <textarea
        value={newNote}
        onChange={e => setNewNote(e.target.value)}
        placeholder="Write a note..."
      ></textarea>
      <br />
      <button className='btn-sm' onClick={addNote}>Add</button>

      <ul>
        {notes.map(note => (
          <li key={note.id}>
            {note.text}
            <button onClick={() => deleteNote(note.id)} style={{ marginLeft: '1rem' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
