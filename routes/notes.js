const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const ensureAuthenticated = require('../middleware/ensureAuth');

// Display the form to add a new note
router.get('/notes/new', ensureAuthenticated, (req, res) => {
  res.render('new_note', {title: 'New note'});  // Render the form to create a new note
});

// Handle form submission to add a new note
router.post('/new_note', ensureAuthenticated, async (req, res) => {
  const { content } = req.body;

  try {
    // Create a new note associated with the logged-in user
    const newNote = new Note({
      userId: req.session.userId,
      content,
    });

    await newNote.save();
    res.redirect('/notes');
  } catch (error) {
    console.error('Error adding note:', error);
    res.status(500).send('Server error while adding note.');
  }
});

// Display all notes for the logged-in user
router.get('/notes', ensureAuthenticated, async (req, res) => {
  try {
    // Fetch the notes that belong to the logged-in user
    const notes = await Note.find({ userId: req.session.userId });
    
    // Pass both notes and user information to the view
    res.render('notes', { title: 'My notes', user: req.user, notes });
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).send('Server error while fetching notes.');
  }
});


// Delete a note
router.post('/notes/delete/:id', ensureAuthenticated, async (req, res) => {
  const noteId = req.params.id;

  try {
    // Ensure the note belongs to the logged-in user before deleting
    await Note.findOneAndDelete({ _id: noteId, userId: req.session.userId });
    res.redirect('/notes');
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).send('Server error while deleting note.');
  }
});

module.exports = router;
