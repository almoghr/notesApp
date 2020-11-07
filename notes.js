const fs = require('fs');
const chalk = require('chalk');

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title)
    if (!note){
        return console.log(chalk.red.inverse('no note found'))
    }else {
        return console.log(chalk.inverse.bgRed(note.title) + ' ' + chalk.bold.green(note.body))
    }
}

const listNotes = () => {
    const notes = loadNotes();
    notes.forEach(note => console.log(note));
    console.log(chalk.inverse('your notes'));
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)
    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)  
        console.log(chalk.green.inverse("note added"))  
    } else{
        console.log(chalk.bgRed('note title taken'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}
const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        const data = JSON.parse(dataJSON) 
        return data
    } catch(e){
        return []
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesTokeep = notes.filter((note) => note.title !== title)
    if (notesTokeep.length === notes.length){
        console.log(chalk.bgRed('no such note'))
    } else{
        saveNotes(notesTokeep)
        console.log(chalk.bgGreen('note removed'))
    }
}



module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote

}