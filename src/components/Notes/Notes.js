import React, { useState } from 'react';
import { FaRegTimesCircle } from 'react-icons/fa'
import './Notes.css';

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setNotes([...notes, { title, content }]);
        setTitle('');
        setContent('');
    };

    const handleDelete = (note) => {
        const title = note.title
        console.log(note.title)
        setNotes((notes) => notes.filter((note) => {
            return note.title !== title
        }))
    }



    return (
        <div className="App">
            <div className='notesHeader'>
                <h1>Notes</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        className='forms'
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    <textarea
                        className='forms'
                        placeholder="Content"
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                    ></textarea>
                    <button type="submit">Add Note</button>
                </form>
            </div>
            <div className='notesDiv'>
                {notes.map((note, index) => (
                    <div key={index} className="Note">
                        <div className='noteContent'>
                            <h2>{note.title}</h2>
                            <textarea className='noteText forms' value={note.content} readOnly={true}></textarea>
                        </div>
                        <div>
                            <FaRegTimesCircle className='delete' onClick={() => handleDelete(note)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}



export default Notes;