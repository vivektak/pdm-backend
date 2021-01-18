const express = require('express');
const bodyParser= require('body-parser')
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const instanceController = require('./controller/instance.controller');

app.use(express.static('public'))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

mongoose.connect('mongodb://127.0.0.1:27017/pdm', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
},(err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
  });



app.get('/api/instances', instanceController.findInstances)

app.post('/api/create-instance', instanceController.createInstance)

app.delete('/api/instances/:id', instanceController.deleteInstance)

app.listen(PORT, function() {
    console.log('listening on', PORT)
})