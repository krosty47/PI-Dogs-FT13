const router = require('express').Router();
const axios = require('axios')
const { v4: uuidv4 } = require('uuid');
const { Breeds, Temperaments } = require('../db');

const {
    API_KEY
} = process.env;

// Únicos Endpoints/Flags que pueden utilizar
// GET https://api.thedogapi.com/v1/breeds
// GET https://api.thedogapi.com/v1/breeds/search?q={raza_perro}


router.get('/', async (req, res) => {
    const { nameFront } = req.query;

    if (nameFront) {
        try {
            let apiBreeds = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${nameFront}`)

            let dbBreeds = await Breeds.findAll({
                include: [         // INCLUDE NOS ASOCIA EL PRIMARY KEY DE Breeds CON EL DE Temperaments Y NOS MUESTRA EL RESULTADO EN UN ARRAY AGREGADO COMO KEY A 
                    {              // LA RAZA CREADA
                        model: Temperaments,
                        required: true
                        // VER SI ES NECESARIO DEVOLVER 1 SOLO ID UNICO EN VEZ DE 2
                    }
                ]
            });

            // //AGARRAMOS EL ARRAY DE LA BASE DE DATOS PARA ORDENARLO Y LUEGO PUSHEARLO EN EL ARRAY DE LA API
            //     dbBreeds.forEach(el => {
            //     if(el.nameB.includes(nameFront)) {
            //         // A CADA ELEMNTO DEL ARRAY LE PREGUNTAMOD SI INCLUYE EL NOMBRE QUE VIENE POR PARAMS
            //     let temp = el.temperaments.map(e => {
            //         return e.nameT;
            //         // SI LO INCLUYE GUARDAMOS EN TEMP EL ARREGLO CON LOS TEMPERAMENTOS
            //     })
            //     el.temperaments = temp;
            //     apiBreeds.data.push(el.temperaments) }
            //     }
            // );


            res.json(dbBreeds)

        } catch (err) {
            console.log(err)
        }
    }

    // let apiBreeds = await axios.get(`https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`)

});

module.exports = router;