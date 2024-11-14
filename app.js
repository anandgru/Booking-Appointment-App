const express= require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');

const userRoutes = require("./routes/user");

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
  });

app.use( userRoutes);

//app.post('/add-user', addUser);

//app.use(errorController.get404);

sequelize.sync()
.then(result=>{
    app.listen(3000);
    console.log('Server started on port 3000');
    console.log('Connected to the database');
})
.catch(err => {
    console.log('Failed to connect to the database');
    console.log(err);
});
