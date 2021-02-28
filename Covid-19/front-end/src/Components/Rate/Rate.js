import React, { useState } from 'react'
import axios from 'axios'
import { Rating } from '@material-ui/lab';
import { MorphIcon, } from 'react-svg-buttons';


const Rate = () => {

    const [newNote, setNewNote] = useState('')
    const [value, setValue] = React.useState(0);
    const [loader, setLoader] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader(true);

        const noteObject = {
            text: newNote,
            likes: value,
        }

        axios
            .post('http://localhost:3001/api/blogs', noteObject)
            .then(response => {
                setNewNote('')
                setValue(0)
            })
            .then(() => {
                setLoader(false);
                alert("Kiitos Palautteesta!👍");
            })
            .catch((error) => {
                alert("");
                setLoader(false);
            });

    };

    const changeNewNote = event => {
        setNewNote(event.target.value)
    }

    return (
        <form onSubmit={handleSubmit} >
            <h1 style={{ display: 'flex', justifyContent: 'center' }}>Anna palaute 👍</h1>
            <Rating style={{ justifyContent: 'center' }}
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            />
            <textarea style={{ display: 'flex' }} onChange={changeNewNote} />
            <MorphIcon
                style={{ cursor: 'pointer' }}
                type="arrowRight"
                size={47}
                thickness={4}
                color="#11bb5b"
                onClick={handleSubmit} />
        </form>


    )
}

export default Rate;