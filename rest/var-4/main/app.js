const express = require('express')
const Sequelize = require('sequelize')
const { Op } = require("sequelize");

const sequelize = new Sequelize('sqlite:memory')

let Homework = sequelize.define('homework', {
    student : Sequelize.STRING,
    content : Sequelize.STRING,
    grade : Sequelize.INTEGER
},{
    timestamps : false
})

const app = express()
app.use(express.json())

app.get('/create', async (req, res) => {
    try{
        await sequelize.sync({force : true})
        const grades  = [2, 5, 7, 7, 3, 10, 9, 4, 10, 8]
        for (let i = 0; i < 10; i++){
            let homework = new Homework({
                student : `name${i}`,
                content : `some text here ${i}`,
                grade : grades[i]
            })
            await homework.save()
        }
        res.status(201).json({message : 'created'})
    }
    catch(err){
        console.warn(err.stack)
        res.status(500).json({message : 'server error'})
    }
})

app.get('/homeworks', async (req, res) => {
    let homeworks;
    try{
        console.log(req.query);
        if(req.query.pass == 'true') {
            homeworks = await Homework.findAll({
                where: {
                  grade: {
                    [Op.gte]: 5
                  }
                }
              });
        } else {
            homeworks = await Homework.findAll();
        }
        res.status(200).json(homeworks)
    }
    catch(err){
        console.warn(err.stack)
        res.status(500).json({message : 'server error'})        
    }
})

app.get('/homeworks/:id', async (req, res) => {
    try{
       const homework = await Homework.findAll({
            where: {
              id: req.params.id
            }
          });
        if(homework.length == 0) {
            res.sendStatus(404);
        }else {
            if(req.get('accept') == 'text/plain') {
                res.status(200).send(homework[0].content);
            } else {
                res.status(200).json(homework[0]);
            }
        }
    }
    catch(err){
        console.warn(err.stack)
        res.status(500).json({message : 'server error'})        
    }
})



module.exports = app