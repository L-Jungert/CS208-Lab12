var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next){
  try {
    req.db.query('SELECT * FROM todos;', (err, results) => {
      if (err) {
        console.error('Error fetching todos:', err);
        return res.status(500).send('Error fetching todos');
      }
      res.render('index', { title: 'My Simple TODO', todos: results });
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Error fetching items');
  }
});

router.post('/create', function (req, res, next) {
    const { task } = req.body;
    // Reject blank / whitespace-only tasks
    if (!task || task.trim() === '') {
      return res.redirect('/');
    }
    try {
      req.db.query('INSERT INTO todos (task) VALUES (?);', [task.trim()], (err, results) => {
        if (err) {
          console.error('Error adding todo:', err);
          return res.status(500).send('Error adding todo');
        }
        console.log('Todo added successfully:', results);
        res.redirect('/');
      });
    } catch (error) {
      console.error('Error adding todo:', error);
      res.status(500).send('Error adding todo');
    }
});

router.post('/delete', function (req, res, next) {
    const { id } = req.body;
    try {
      req.db.query('DELETE FROM todos WHERE id = ?;', [id], (err, results) => {
        if (err) {
          console.error('Error deleting todo:', err);
          return res.status(500).send('Error deleting todo');
        }
        console.log('Todo deleted successfully:', results);
        res.redirect('/');
    });
    }catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).send('Error deleting todo:');
    }
});

/* GET edit form for a single todo. */
router.get('/edit/:id', function (req, res, next) {
    const { id } = req.params;
    try {
      req.db.query('SELECT * FROM todos WHERE id = ?;', [id], (err, results) => {
        if (err) {
          console.error('Error fetching todo:', err);
          return res.status(500).send('Error fetching todo');
        }
        if (results.length === 0) {
          return res.redirect('/');
        }
        res.render('edit', { title: 'Edit Task', todo: results[0] });
      });
    } catch (error) {
      console.error('Error fetching todo:', error);
      res.status(500).send('Error fetching todo');
    }
});

/* POST updated todo (description + completed state). */
router.post('/edit/:id', function (req, res, next) {
    const { id } = req.params;
    const { task, completed } = req.body;
    // Reject blank / whitespace-only tasks
    if (!task || task.trim() === '') {
      return res.redirect('/edit/' + id);
    }
    // Checkbox only sends a value when checked; otherwise it's undefined
    const isCompleted = completed ? 1 : 0;
    try {
      req.db.query(
        'UPDATE todos SET task = ?, completed = ? WHERE id = ?;',
        [task.trim(), isCompleted, id],
        (err, results) => {
          if (err) {
            console.error('Error updating todo:', err);
            return res.status(500).send('Error updating todo');
          }
          console.log('Todo updated successfully:', results);
          res.redirect('/');
        }
      );
    } catch (error) {
      console.error('Error updating todo:', error);
      res.status(500).send('Error updating todo');
    }
});

module.exports = router;
