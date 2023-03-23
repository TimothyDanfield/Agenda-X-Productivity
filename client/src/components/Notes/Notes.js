import React, { useState, useEffect } from 'react';
import { FaRegTimesCircle, FaPen } from 'react-icons/fa'
import toast, { Toaster } from 'react-hot-toast'
import axios from '../../utils/axiosConfig'
import './Notes.css';


const Notes = () => {
    const [notes, setNotes] = useState([])
    const [user, setUser] = useState('')
    const [refresh, setRefresh] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [newNote, setNewNote] = useState({
        title: '',
        content: ''
    })

    const users = JSON.parse(localStorage.getItem('User'))

    useEffect(() => {
        const getUser = async () => {
            try {
                const userObj = await axios.get(`/api/user?_id=${users._id}`)
                setUser(userObj.data)
                setNotes(userObj.data.notes)
            } catch (error) {
                console.log(error)
            }
        }
        getUser()
    }, [refresh])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const newNote = await axios.post(`/api/note?title=${title}&&content=${content}&&_id=${users._id}`)
        setRefresh(!refresh)
        setTitle('')
        setContent('')
        toast.success('Note created')
    };

    const handleDelete = async (note) => {
        const email = user.email
        const noteid = note._id
        const deletedNote = await axios.delete(`/api/note?_id=${users._id}&&noteid=${noteid}`)
        setRefresh(!refresh)
        toast.success('Note deleted')
    }

    const handleNoteSelected = (note) => {
        setNewNote({
            title: note.title,
            content: note.content
        })
    }
    const handleNotesChange = async (event, note) => {
        setNewNote({ ...newNote, [event.target.name]: event.target.value })
        console.log(note._id)
        const updateTask = await axios.put(`/api/note?_id=${note._id}&&title=${newNote.title}&&content=${newNote.content}`)
        console.log(updateTask.data)
        setRefresh(!refresh)
        toast.success("Note updated")
    }

    return (
        <div className="App">
            <div className='notesHeader'>
                <h1>Notes</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        className='noteText'
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    <textarea
                        className='noteText newContent'
                        placeholder="Content"
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                    ></textarea>
                    <button type="submit">Add Note</button>
                </form>
            </div>
            <div className='notesDiv'>
                {notes && notes.map((note, index) => (
                    <div key={index}
                        className="Note">
                        <form style={{textAlign: 'start'}} className='noteContent' onClick={() => handleNoteSelected(note)} onSubmit={(event) => handleNotesChange(event, note)}>
                            <div style={{display: 'flex', flexDirection: 'row-reverse', width: '100%'}}>
                                <FaRegTimesCircle className='delete' onClick={() => handleDelete(note)} />
                                <h2 className='noteHeader editable header'>{note.title}</h2>
                            </div>
                            <p className='noteText editable'>{note.content}</p>
                        </form>
                    </div>
                ))}
            </div>
            <Toaster />
        </div>
    );
}



export default Notes;