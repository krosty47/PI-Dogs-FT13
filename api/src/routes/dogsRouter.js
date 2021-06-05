const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {BreedDb, TemperamentDb} = require('../db');

const {
    YOUR_API_KEY
} = process.env;

// Únicos Endpoints/Flags que pueden utilizar
// GET https://api.thedogapi.com/v1/breeds
// GET https://api.thedogapi.com/v1/breeds/search?q={raza_perro}


router.post('/', async (req, res) =>{
    const { nameB, height, weight, years, nameT, sexo} = req.body;
    try {
        let newRaza = await BreedDb.create({
            id: uuidv4,
            nameB,
            height,
            weight,
            years,
            sexo

        })
        

        await newRaza.setTemperamentDb(nameT)

    } catch (error) {
        res.status(500).send(error)
    }
});

module.exports = router;