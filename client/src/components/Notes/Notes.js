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

    const _id = JSON.parse(localStorage.getItem('Id'))

    useEffect(() => {
        const getUser = async () => {
            try {
                const userObj = await axios.get(`/api/user?_id=${_id}`)
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
        const newNote = await axios.post(`/api/note?title=${title}&&content=${content}&&_id=${_id}`)
        setRefresh(!refresh)
        setTitle('')
        setContent('')
        toast.success('Note created')
    };

    const handleDelete = async (note) => {
        const email = user.email
        const noteid = note._id
        const deletedNote = await axios.delete(`/api/note?_id=${_id}&&noteid=${noteid}`)
        setRefresh(!refresh)
        toast.success('Note deleted')
    }

    const handleEdit = async (note) => {

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
                {notes && notes.map((note, index) => (
                    <div key={index} className="Note">
                        <div className='noteContent'>
                            <h2 className='noteHeader'>{note.title}</h2>
                            <textarea className='noteText forms' value={note.content} readOnly={true}></textarea>
                        </div>
                        <div>
                            <FaPen className='edit' onClick={() => handleEdit(note)}/>
                            <FaRegTimesCircle className='delete' onClick={() => handleDelete(note)} />
                        </div>
                    </div>
                ))}
            </div>
            <Toaster />
        </div>
    );
}



export default Notes;