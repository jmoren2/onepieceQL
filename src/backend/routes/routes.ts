import { response } from 'express'
import express from 'express'
const router = express.Router()

const characterTemplateCopy = require('../database/models/character')

router.post('/create', (req, res) => {
    console.log('Calling out to /api/create')

    const newCharacter = new characterTemplateCopy({
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

router.get('/test', () => {console.log('testing!!!');})


export default router;