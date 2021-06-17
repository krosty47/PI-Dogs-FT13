const router = require('express').Router();
const { Breeds } = require('../db');
const { v4: uuidv4 } = require('uuid');

router.post('/', async (req, res, next) => {

    const { nameB, weight, height, years, img, nameT } = req.body;

    try {
        let newRaza = await Breeds.create({
            nameB,
            weight,
            height,
            years,
            img,
            id: uuidv4(),
        })
        await newRaza.setTemperaments(nameT)  // el nombre es en plural porque sequelize la pluraliza

        return res.send("FUNCIONO")

    } catch (err) {
        console.error(err);
        next(err);
    }
});


module.exports = router;