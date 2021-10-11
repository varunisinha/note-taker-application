// const { response } = require("../../../routes");

let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;

if (window.location.pathname === '/notes') {
    noteTitle = document.querySelector('.note-title');
    noteText = document.querySelector('.note-textarea');
    saveNoteBtn = document.querySelector('.save-note');
    newNoteBtn = document.querySelector('.new-note');
    noteList = document.querySelector('.list-group');

}

// Show an element
const show = (elem) => {
    elem.style.display = 'inline';
};

// Hide an element
const hide = (elem) => {
    elem.style.display = 'none';
};

async function getNotes() {
    let response = await fetch('./api')
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

function saveNote(note) {
    return fetch('./api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
    });
}

const deleteNote = (id) =>
    fetch(`/api/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
function handleNoteSave() {
    const newNote = {
        title: noteTitle.value,
        text: noteText.value
    }
    saveNote(newNote).then(() => {
        getAndRenderNotes()
        renderActiveNote()
        noteTitle.value = ''
        noteText.value = ''
    })


}


const handleRenderSaveBtn = () => {
    if (!noteTitle.value.trim() || !noteText.value.trim()) {
        hide(saveNoteBtn);
    } else {
        show(saveNoteBtn);
    }
};

const handleNewNoteView = (e) => {
    noteTitle.focus()
    activeNote = {}
    renderActiveNote()
}

function renderActiveNote(activeNote) {
    if (activeNote) {
        hide(saveNoteBtn)
        noteTitle.setAttribute('readonly', true)
        noteText.setAttribute('readonly', true)
        console.log("My active Note=", activeNote);
        getNotes().then(data => {
            // console.log(data[0].title);
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == activeNote) {
                    noteTitle.value = data[i].title;
                    noteText.value = data[i].text;
                }
            }
        })
    } else {
        noteTitle.removeAttribute('readonly');
        noteText.removeAttribute('readonly');
        noteTitle.value = '';
        noteText.value = '';
    }
}
function handleNoteView() {
    const storedNotes = document.querySelectorAll('.Notes');
    console.log("storedNotes", storedNotes.length);

    for (let x = 0; x < storedNotes.length; x++) {
        // console.log(storedNotes[x])
        storedNotes[x].addEventListener('click', function (e) {
            e.preventDefault();
            renderActiveNote(storedNotes[x].getAttribute("data-name"))
            // console.log(storedNotes[x].getAttribute("data-name"));
        }, false)
    }
}

const handleNoteDelete = (e) => {
    e.stopPropagation()
    const note = e.target
    const noteId = note.parentNode.getAttribute("data-name")

    deleteNote(noteId).then(() => {
        getAndRenderNotes()
    })
}

async function renderNoteList() {
    let response = await fetch('./api')
    let myresponse = response.json()
    while (noteList.firstChild) {
        noteList.removeChild(noteList.firstChild);
    }
    myresponse.then((data) => {
        for (let i = 0; i < data.length; i++) {
            var li = document.createElement('li');
            var trash = document.createElement('i');
            li.innerHTML = `${data[i]['title']}`;
            li.appendChild(trash)
            trash.classList.add('fas', 'fa-trash-alt', 'float-right', 'delete-note')
            noteList.appendChild(li);
            li.setAttribute('class', 'list-group-item');
            li.classList.add('Notes')
            li.setAttribute('data-name', data[i]['id'])
            console.log("id=", data[i]['id'])
            trash.addEventListener('click', handleNoteDelete)
            handleNoteView()
        }
    })

}


function getAndRenderNotes() {
    // console.log(getNotes().then(data => console.log(data)));
    return getNotes().then(renderNoteList())
}
getAndRenderNotes()


if (window.location.pathname === '/notes') {
    saveNoteBtn.addEventListener('click', handleNoteSave);
    newNoteBtn.addEventListener('click', handleNewNoteView);
    if (!handleNoteView()) {
        noteTitle.addEventListener('keyup', handleRenderSaveBtn);
        noteText.addEventListener('keyup', handleRenderSaveBtn);
    }

}
setTimeout(function () { handleNoteView(); }, 1000);



    // const getNotes = () =>
    //     fetch('/api', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     });

    // const saveNote = (note) =>
    //     fetch('/api/', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(note),
    //     });

    // const deleteNote = (id) =>
    //     fetch(`/api/${id}`, {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     });

    // const renderActiveNote = () => {
    //     hide(saveNoteBtn);

    //     if (activeNote.id) {
    //         noteTitle.setAttribute('readonly', true);
    //         noteText.setAttribute('readonly', true);
    //         noteTitle.value = activeNote.title;
    //         noteText.value = activeNote.text;
    //     } else {
    //         noteTitle.removeAttribute('readonly');
    //         noteText.removeAttribute('readonly');
    //         noteTitle.value = '';
    //         noteText.value = '';
    //     }
    // };

    // const handleNoteSave = () => {
    //     const newNote = {
    //         title: noteTitle.value,
    //         text: noteText.value,
    //     };
    //     saveNote(newNote).then(() => {
    //         getAndRenderNotes();
    //         renderActiveNote();
    //     });
    // };

    // // Delete the clicked note
    // const handleNoteDelete = (e) => {
    //     // Prevents the click listener for the list from being called when the button inside of it is clicked
    //     e.stopPropagation();

    //     const note = e.target;
    //     const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

    //     if (activeNote.id === noteId) {
    //         activeNote = {};
    //     }

    //     deleteNote(noteId).then(() => {
    //         getAndRenderNotes();
    //         renderActiveNote();
    //     });
    // };

    // // Sets the activeNote and displays it
    // const handleNoteView = (e) => {
    //     e.preventDefault();
    //     activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
    //     renderActiveNote();
    // };

    // // Sets the activeNote to and empty object and allows the user to enter a new note
    // const handleNewNoteView = (e) => {
    //     activeNote = {};
    //     renderActiveNote();
    // };

    // const handleRenderSaveBtn = () => {
    //     if (!noteTitle.value.trim() || !noteText.value.trim()) {
    //         hide(saveNoteBtn);
    //     } else {
    //         show(saveNoteBtn);
    //     }
    // };
    // // Render the list of note titles
    // const renderNoteList = async (notes) => {
    //     let jsonNotes = await notes.json();
    //     if (window.location.pathname === '/notes') {
    //         noteList.forEach((el) => (el.innerHTML = ''));
    //     }

    //     let noteListItems = [];

    //     // Returns HTML element with or without a delete button
    //     const createLi = (text, delBtn = true) => {
    //         const liEl = document.createElement('li');
    //         liEl.classList.add('list-group-item');

    //         const spanEl = document.createElement('span');
    //         spanEl.classList.add('list-item-title');
    //         spanEl.innerText = text;
    //         spanEl.addEventListener('click', handleNoteView);

    //         liEl.append(spanEl);

    //         if (delBtn) {
    //             const delBtnEl = document.createElement('i');
    //             delBtnEl.classList.add(
    //                 'fas',
    //                 'fa-trash-alt',
    //                 'float-right',
    //                 'text-danger',
    //                 'delete-note'
    //             );
    //             delBtnEl.addEventListener('click', handleNoteDelete);

    //             liEl.append(delBtnEl);
    //         }

    //         return liEl;
    //     }
    //     if (jsonNotes.length === 0) {
    //         noteListItems.push(createLi('No saved Notes', false));
    //     }

    //     jsonNotes.forEach((note) => {
    //         const li = createLi(note.title);
    //         li.dataset.note = JSON.stringify(note);

    //         noteListItems.push(li);
    //     });

    //     if (window.location.pathname === '/notes') {
    //         noteListItems.forEach((note) => noteList[0].append(note));
    //     }
    // };


    // const getAndRenderNotes = () => {
    //     return getNotes().then(renderNoteList);
    // };
    // console.log(getNotes())


