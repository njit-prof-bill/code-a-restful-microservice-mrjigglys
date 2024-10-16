const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

//Data
let users = [
    {id: 0, name: "First Last", email: "name@site.st"}
];

var usercount = 1;
//POST new user
app.post('/users', (req, res) => {
    const {name, email} = req.body;
    if (!name || !email) {
        return res.status(400).json({message: 'Missing name or email'});
    }
    const user = {id: usercount, name, email};
    usercount++;
    users.push(user);
    res.status(201).json(user);
});

//GET user from id
app.get('/users/:id', (req, res) => {
    const {id} = req.params;
    //Match ID to a user
    const user = users.find((user) => user.id === parseInt(id));
    if (!user) {
        return res.status(404).json({message: 'User not found'});
    }

    res.json(user);
});

//PUT update user by id
app.put('/users/:id', (req, res) => {
    const {id} = req.params;
    const {name, email} = req.body;
    if (!name || !email) {
        return res.status(400).json({message: 'Missing name or email'});
    }
    const user = users.find((user) => user.id === parseInt(id));
    if (!user) {

        return res.status(404).json({ message: 'User not found' });
    
      }
    user.name = name;
    user.email = email;

    res.json(user);
});

//DELETE user by id
app.delete('/users/:id', (req, res) => {
    const {id} = req.params;
    users = users.filter((user) => user.id !== parseInt(id));
    res.sendStatus(204);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing