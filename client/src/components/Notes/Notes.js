import React, { useState, useEffect } from 'react';
import { FaRegTimesCircle, FaPen } from 'react-icons/fa'
import toast, { Toaster } from 'react-hot-toast'
import axios from '../../utils/axiosConfig'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle'
import { Input, Button } from "antd";
import './Notes.css';


const Notes = () => {
    const [notes, setNotes] = useState([])
    const [user, setUser] = useState('')
    const [refresh, setRefresh] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [openNote, setOpenNote] = useState(false)
    const [selectedNote, setselectedNote] = useState()
    const [newNote, setNewNote] = useState({
        title: '',
        content: ''
    })

    const users = JSON.parse(localStorage.getItem('User'))

    useEffect(() => {
        const getUser = async () => {
            try {
                const userObj = await axios.get(`/user?_id=${users._id}`)
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
        await axios.post(`/note?title=${title}&&content=${content}&&_id=${users._id}`)
        setRefresh(!refresh)
        setTitle('')
        setContent('')
        toast.success('Note created')
    };

    const handleDelete = async (note) => {
        const noteid = note._id
        await axios.delete(`/note?_id=${users._id}&&noteid=${noteid}`)
        setRefresh(!refresh)
        toast.success('Note deleted')
        handleClose()
    }

    const handleNoteSelected = (note) => {
        setselectedNote(note)
        setNewNote({
            title: note.title,
            content: note.content
        })
        setOpenNote(true)
    }

    const handleNotesChange = async () => {
        await axios.put(`/note?_id=${selectedNote._id}&&title=${newNote.title}&&content=${newNote.content}`)
        handleClose()
        setRefresh(!refresh)
        toast.success("Note updated")
    }

    const handleClose = () => {
        setOpenNote(false)
    }

    return (
        <div className="App">
            <Dialog
                onClose={handleClose}
                open={openNote}
            >
                <DialogTitle>Note Details</DialogTitle>
                <DialogContent className='dialogContent'>
                    <Input
                        style={{ width: "200px", height: '30px', marginBottom: '10px' }}
                        value={newNote.title}
                        onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                        placeholder="Enter Task Name"
                    />
                    <br />
                    <Input.TextArea
                        style={{ width: "500px", height: '90px', marginBottom: '10px' }}
                        value={newNote.content}
                        onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                        placeholder="Content"
                    />
                </DialogContent>
                <DialogActions>
                    <Button type="primary" onClick={() => handleDelete(selectedNote)} style={{ marginLeft: '10px', backgroundColor: 'red' }}>
                        Delete
                    </Button>
                    <Button type="primary" onClick={handleClose} style={{ marginLeft: '10px' }}>
                        Cancel
                    </Button>
                    <Button type="primary" onClick={(selectedNote) => handleNotesChange(selectedNote)} style={{ marginLeft: '10px' }}>
                        Update Note
                    </Button>
                </DialogActions>
            </Dialog>
            <div className='notesHeader'>
                <h1 style={{color: '#e74c3c'}}>Notes</h1>
                <div className='add-notes'>
                    <form onSubmit={handleSubmit} className='notes-form'>
                        <input
                            className='noteText newContent'
                            type="text"
                            placeholder="Title"
                            style={{color: 'white'}}
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                        <textarea
                            className='noteText newContent'
                            placeholder="Content"
                            value={content}
                            style={{color: 'white'}}
                            onChange={(event) => setContent(event.target.value)}
                        ></textarea>
                        <button type="submit">Add Note</button>
                    </form>
                </div>
            </div>
            <div className='notesDiv'>
                {notes && notes.map((note, index) => (
                    <div key={index}
                        className="Note">
                        <form style={{ textAlign: 'start' }} className='noteContent' onClick={() => handleNoteSelected(note)}>
                            <div style={{ display: 'flex', flexDirection: 'row-reverse', width: '100%' }}>
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