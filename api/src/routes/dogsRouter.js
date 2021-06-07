const router = require('express').Router();
const axios = require('axios')
const { Breeds, Temperaments } = require('../db');

const {
    API_KEY
} = process.env;


router.get('/', async (req, res) => {
    const { nameFront } = req.query;

    if (!nameFront) {  // SI EL NOMBRE NO LLEGA HABRA QUE MOSTRAR LAS PRIMERAS 8 RAZAS

        try {
            const apiData = await axios.get(`https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`)
            const dbBreeds = await Breeds.findAll({ include: [{ model: Temperaments, required: true }] });

            // Model.toJSON()
            dbBreeds.filter(el => {
                if (el.dataValues.nameB.toLowerCase().includes(nameFront.toLowerCase())) {
                    let temp = el.dataValues.temperaments.map(temp => {
                        return temp.dataValues.nameT;
                    })
                    // luego de obtener solo el array de temperamentos y modificar el valor del elemento, lo pusheo a la data
                    el.dataValues.temperaments = temp.join(', ');
                    apiData.data = [el.dataValues, ...apiData.data]
                }
            }
            );
            const final8Result = apiData.data.map(el => {
                return {
                    id: el.id,
                    name: el.nameB || el.name,
                    img: el.image && el.image.url || "imagen no encontrada",  // SI AGREGAMOS IMAGEN AL CREAR, MODIFICAR EN ESTA RUTA
                    temperament: el.temperament || el.temperaments // PODRIAMOS AGREGAR TEMPERAMENTOS POR SI NO SE ENCUENTRAN
                }
            })
            // SORT : SI COMPARAMOS 1RA OPCION MAYOR, TENEMOS QUE RETORNAR 1 PARA ORDENAR POR KEY NAME
            final8Result.sort((a, z) => (a.name > z.name) ? 1 : -1)

            return res.json(final8Result)
        }
        catch (err) {
            console.log(err)
        }
    }

    if (nameFront) {
        try {

            const apiData2 = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${nameFront}`)
            const dbBreeds2 = await Breeds.findAll({ include: [{ model: Temperaments, required: true }] });

            // INCLUDE NOS ASOCIA EL PRIMARY KEY DE Breeds CON EL DE Temperaments Y NOS MUESTRA EL RESULTADO EN UN ARRAY AGREGADO COMO KEY A 
            // LA RAZA CREADA
            // VER SI ES NECESARIO DEVOLVER 1 SOLO ID UNICO EN VEZ DE 2

            // RAW: TRUE PARA RECIBIR EL ARRAY "PLANO", NO lE ENCONTRE LA SOLUCION, LA UNICA FORMA FUE USAR DATAVALUES

            dbBreeds2.filter(el => {
                if (el.dataValues.nameB.toLowerCase().includes(nameFront.toLowerCase())) {
                    let temp = el.dataValues.temperaments.map(temp => {
                        return temp.dataValues.nameT;
                    })
                    // luego de obtener solo el array de temperamentos y modificar el valor del elemento, lo pusheo a la data
                    el.dataValues.temperaments = temp.join(', ');
                    apiData2.data = [el.dataValues, ...apiData2.data]
                }
            }
            );

            //return res.status(404).json({message: "The breed you are looking for is not found "}) 

            const finalQueryResult = apiData2.data.map(el => {
                return {
                    id: el.id,
                    name: el.nameB || el.name,
                    img: `https://cdn2.thedogapi.com/images/${el.reference_image_id}.jpg`, // PODRIAMOS AGREGAR UNA IMAGEN POR DEFECTO ACA SI NO SE ENCUENTRA
                    temperament: el.temperaments || el.temperament  // PODRIAMOS AGREGAR TEMPERAMENTOS POR SI NO SE ENCUENTRAN
                }
            })

            finalQueryResult.sort((a, z) => (a.name > z.name) ? 1 : -1)

            return res.json(finalQueryResult)
        }
        catch (err) {
            console.log(err)
        }
    }
});

router.get('/detail/:idBreed', async (req, res) => {

    const { idBreed } = req.params;
    
    try {
        const apiData = await axios.get(`https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`)
        const dbBreeds3 = await Breeds.findAll({ include: [{ model: Temperaments, required: true }] });

        dbBreeds3.filter(el => {
            if (el.dataValues.nameB.toLowerCase()) {
                let temp = el.dataValues.temperaments.map(temp => {
                    return temp.dataValues.nameT;
                })
                // luego de obtener solo el array de temperamentos y modificar el valor del elemento, lo pusheo a la data
                el.dataValues.temperaments = temp.join(', ');
                apiData.data = [el.dataValues, ...apiData.data]
            }
        }
        );

        const breed = apiData.data.find(el => el.id === parseInt(idBreed) || el.id === idBreed)

        if (breed === undefined || breed === null || breed === '') {
            return res.status(404).json({ message: "The breed you are looking for is not found " })
        }
        if (breed.name) {
            return res.json({
                img: breed.image && breed.image.url,
                name: breed.name,
                temperament: breed.temperament,
                weight: breed.weight.metric,
                height: breed.height.metric,
                life_span: breed.life_span
            })
        };

        if (breed.nameB) {
            return res.json({
                name: breed.nameB,
                temperament: breed.temperaments,
                weight: breed.weight,
                height: breed.height,
                life_span: breed.years + " years"
            })
        }
    }
    catch (err) {
        console.log(err)
    }
});



module.exports = router;