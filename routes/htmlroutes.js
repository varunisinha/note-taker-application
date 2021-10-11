const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
// const db = require('../db/db.json')
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
router.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

router.post('/', (req, res) => {
    console.log('data posted')
    // const note = req.body;
    // notes.push({ ...note, id: uuidv4() });
    // res.send(`Note with Title: ${note.title} has been added`);
    const { title, text } = req.body
    // console.log("req.body: ", req.body)
    // res.send(req.body);
    console.log(title, text)
    if (req.body) {
        const newNote = {
            id: uuidv4(),
            title,
            text
        }
        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully 🚀`);
    } else {
        res.error('Error in adding note');
    }
});
// To find data based on a parameter
// router.get('/:id', (req, res) => {
//     const { id } = req.params;
//     console.log(id);
//     readFromFile('./db/db.json').then((data) => JSON.parse(data))
//         .then((json) => {
//             const found = json.find((notesId) => notesId.id === id)
//             res.send(found)
//         })
// })

router.delete('/:id', (req, res) => {
    const noteid = req.params.id;
    readFromFile('./db/db.json').then((data) => JSON.parse(data))
        .then((json) => {
            const updatedNotes = json.filter((note) => note.id !== noteid)
            writeToFile('./db/db.json', updatedNotes);
            res.send('deletion successfull')
        })
});

module.exports = router;