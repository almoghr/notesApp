const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js')

yargs.version('1.1.0')
yargs.command({
    command: 'add',
    describe: 'add a new note',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title, argv.body)
    }
})
yargs.command({
    command: 'remove',
    describe: 'removing an existing note',
    builder: {
        title: {
            describe: 'titles note to remove',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})
yargs.command({
    command: 'read',
    describe: 'reading a new note',
    builder: {
        title: {
            describe: 'reading a single note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})
yargs.command({
    command: 'list',
    describe: 'listing all notes by date of occurence',
    handler(){
        notes.listNotes()
    }
})

yargs.parse()