const router = require('express').Router();
const { Breeds } = require('../db');
const { v4: uuidv4 } = require('uuid');

router.post('/', async (req, res) => {

    const { nameB, weight, height, years, img, nameT } = req.body;

    try {
        const newBreed = await Breeds.create({
            nameB,
            weight,
            height,
            years,
            img,
            id: uuidv4(),
        })

        await newBreed.setTemperaments(nameT)  // sequelize pluraliza el nombre
    }
    catch (err){
        console.log(err)
    }

        return res.send("FUNCIONO")
    });


module.exports = router;