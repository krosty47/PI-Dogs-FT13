const router = require('express').Router();
const { Breeds } = require('../db');
const { v4: uuidv4 } = require('uuid');

router.post('/', async (req, res, next) => {

    //let name = req.body.name.toLowerCase();
    const { nameB, weight, height, years, img, nameT } = req.body;


    try {
        let newRaza = await Breeds.create({
            nameB,
            weight,
            height,
            years,
            img,
            id: uuidv4(),
            // EN CASO DE QUERER AGREGAR UNA IMAGEN:
            // reference_image_id 
        })
        await newRaza.setTemperaments(nameT)  // TEDRIAMOS QUE PASAR UN ARREGLO CON EL ID DE EL TEMPERAMENTO

        // LUEGO DE CREARLO HABRIA QUE MANDARLO A LA PANTALLA DEL DETALLER CON RES.REDIRECT
        return res.send("FUNCIONO")

    } catch (err) {
        console.error(err);
        next(err);
    }
});


module.exports = router;