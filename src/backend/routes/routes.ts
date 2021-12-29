import { response } from 'express'
import express from 'express'
const router = express.Router()
import mongoose from 'mongoose';

const characterModel = require('../database/models/character')

router.post('/characters/create', (req, res) => {
    console.log('Calling out to /api/create')

    const newCharacter = new characterModel({
        name: req.body.name,
        description: req.body.description,
        link: req.body.link
    })

    newCharacter.save()
    .then( (data: any) => {
        res.json(data)
        console.log('Call to /create was successful! Reponse: ')
        console.log(data)
    }).catch( (e: any) => {
        console.log('Call to /create failed. Error: ')
        response.json(e)
    })

})

router.get('/characters/list', async (req, res) => {
    console.log('Calling out to /api/characters/list')

    const filter = {};
    const all = await characterModel.find(filter)
    .then(( data: any) => {
        res.send(data)
        console.log('Successfully retreived all characters');
        console.log(data);
    }).catch( (e: any) => {
        console.error(e.messsage());
    });
});

router.get('/characters/:name', async (req, res) => {
    console.log(`Calling out to /api/character/${req.params.name}`);

    let filter = {name: req.params.name};
    let toFind = await characterModel.findOne(filter)
    .then(( data: any) => {
        res.send(data)
        console.log('Successfully retreived all characters');
        console.log(data);
    }).catch( (e: any) => {
        console.error(e.messsage());
    });
});


export default router;