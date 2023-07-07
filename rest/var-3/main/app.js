const e = require('express');
const express = require('express')
const Sequelize = require('sequelize')

const sequelize = new Sequelize('sqlite:memory')

class Device extends Sequelize.Model { };

Device.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
    },
    price: {
        type: Sequelize.FLOAT,
    }
}, {
    sequelize,
    modelName: 'devices',
    timestamps: false
});

const app = express();
app.use(express.json());

app.get('/create', async (req, res) => {
    await sequelize.sync({force: true});
    for(let i = 0; i < 10; i++) {
        await Device.create({name: `Device-${i}`, price: `${Math.random() * 100 + i + 10}`});
    }
    res.status(201).json({message: 'devices created'});
})

app.get('/device', async (req, res) => {
    const devices = await Device.findAll();
    res.status(200).send(devices);
})

app.post('/device', async (req, res) => {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).json({message: "bad request"}); 
    } else if(req.body.price < 0) {
        res.status(400).json({message: "bad request"}); 
    } else if(req.body.name.length < 4) {
        res.status(400).json({message: "bad request"});
    } else {
        await Device.create({name: req.body.name, price: req.body.price});
        res.status(201).json({message: "device created"});
    }
})

app.delete('/device/:id', async (req, res) => {
    await Device.destroy({ where: { id: req.params.id} });
    res.status(202).json({message: "device deleted"});
})

module.exports = app;