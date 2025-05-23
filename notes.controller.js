const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await saveNotes(notes);
  console.log(chalk.bgGreen("Note was added"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function printNotes() {
  const notes = await getNotes();

  console.log(chalk.bgBlue("Here is the list of notes:"));
  notes.forEach((note) => {
    console.log(chalk.blue(note.id, note.title));
  });
}

async function removeNote(id) {
  const notes = await getNotes();
  const indexToDelete = notes.findIndex((note) => note.id == id);

  if (indexToDelete !== -1) {
    notes.splice(indexToDelete, 1);
  } else {
    console.log(chalk.bgRed("Operaion failed"));
    return;
  }

  await saveNotes(notes);
  console.log(chalk.bgYellow("A note was deleted"));
}

async function updateNote(noteData) {
  const notes = await getNotes();
  const indexToEdit = notes.findIndex((note) => note.id == noteData.id);

  if (indexToEdit !== -1) {
    notes[indexToEdit] = { ...notes[indexToEdit], ...noteData };
    await saveNotes(notes);
    console.log(chalk.bgYellow("A note was edited"));
  } else {
    console.log(chalk.bgRed("Operaion failed"));
    return;
  }
}

module.exports = {
  addNote,
  getNotes,
  printNotes,
  removeNote,
  updateNote,
};
