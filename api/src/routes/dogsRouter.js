const router = require('express').Router();
const axios = require('axios')
const { Breeds, Temperaments } = require('../db');

const {
    API_KEY
} = process.env;


// PROBLEMAS: AL PONER UN NOMBRE EN EL END POINT https://api.thedogapi.com/v1/breeds/search?q=${nameFront},
// ENCUENTRA RAZAS QUE NO APARECEN EN EL END POINT https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY},
// AL INGRESAR AL ULTIMO END POINT DESDE LA WEB, ESAS RAZAS NO APARECEN, SOLO BUSCANDOLAS EN EL 1ER END POINT
// EJ: BUSCAR EN EL END POINT https://api.thedogapi.com/v1/breeds/search?q=${nameFront} , LA RAZA BASSADOR
// TAMBIEN, AL INGRESAR AL END POINT CON LA API KEY QUE BRINDA LA PAGINA EN https://docs.thedogapi.com/api-reference/breeds/breeds-list
// NO NOS TRAE TODAS LAS RAZAS

// POSIBLES SOLUCIONES PLANTEADAS:
// QUE LA API KEY SE DEPRECO //  NO LO SOLUCIONO
// CAMBIAR EL ORDEN EN QUE ENTRA A LA RUTA, 1RO COMPROBAR QUE HAYA NOMBRE Y LUEGO NO // NO LO SOLUCIONO



let image = (a) => {
    if (a === undefined) {
        return 'https://criptoaldia.com/wp-content/uploads/2021/02/Elon-Musk-and-Dogecoin-650x375.jpg'
    } else {
        return `https://cdn2.thedogapi.com/images/${a}.jpg`
    }
}

//el.reference_image_id

router.get('/', async (req, res) => {
    const { nameFront } = req.query;

    try {
        if (!nameFront) {  // SI EL NOMBRE NO LLEGA HABRA QUE MOSTRAR LAS PRIMERAS 8 RAZAS
            const apiData = await axios.get(`https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`)
            const dbBreeds = await Breeds.findAll({ include: [{ model: Temperaments, required: true }] });


            dbBreeds.filter(el => {
                let temp = el.dataValues.temperaments.map(temp => {
                    return temp.dataValues.nameT;
                })
                // luego de obtener solo el array de temperamentos y modificar el valor del elemento, lo pusheo a la data
                el.dataValues.temperaments = temp.join(', ');
                apiData.data = [...apiData.data, el.dataValues]
            }
            );
            const final8Result = apiData.data.map(el => {
                return {
                    id: el.id,
                    name: el.nameB || el.name,
                    img: el.image && el.image.url || 'https://criptoaldia.com/wp-content/uploads/2021/02/Elon-Musk-and-Dogecoin-650x375.jpg',  // SI AGREGAMOS IMAGEN AL CREAR, MODIFICAR EN ESTA RUTA
                    temperament: el.temperament || el.temperaments || 'This breed have a really rare temperament'// PODRIAMOS AGREGAR TEMPERAMENTOS POR SI NO SE ENCUENTRAN
                }
            })
            // SORT : SI COMPARAMOS 1RA OPCION MAYOR, TENEMOS QUE RETORNAR 1 PARA ORDENAR POR KEY NAME
            //final8Result.sort((a, z) => (a.name > z.name) ? 1 : -1)

            console.log("LLEGUE A !NAME")
            res.json(final8Result)
        }
        else if (nameFront) {
            const apiData2 = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${nameFront}`) 
            const dbBreeds2 = await Breeds.findAll({ include: [{ model: Temperaments, required: true }] });



            // INCLUDE NOS ASOCIA EL PRIMARY KEY DE Breeds CON EL DE Temperaments Y NOS MUESTRA EL RESULTADO EN UN ARRAY AGREGADO COMO KEY A 
            // LA RAZA CREADA

            // RAW: TRUE PARA RECIBIR EL ARRAY "PLANO", NO lE ENCONTRE LA SOLUCION, LA UNICA FORMA FUE USAR DATAVALUES

            dbBreeds2.filter(el => {
                if (el.dataValues.nameB.toLowerCase().includes(nameFront.toLowerCase())) {
                    let temp = el.dataValues.temperaments.map(temp => {
                        return temp.dataValues.nameT;
                    })
                    // luego de obtener solo el array de temperamentos y modificar el valor del elemento, lo pusheo a la data
                    el.dataValues.temperaments = temp.join(', ');
                    apiData2.data = [...apiData2.data, el.dataValues]
                }
            });
            //return res.status(404).json({message: "The breed you are looking for is not found "}) 
            const finalQueryResult = apiData2.data.map(el => {
                return {
                    id: el.id,
                    name: el.nameB || el.name,
                    img: image(el.reference_image_id), // PODRIAMOS AGREGAR UNA IMAGEN POR DEFECTO ACA SI NO SE ENCUENTRA
                    temperament: el.temperaments || el.temperament || 'This breed have a really rare temperament' // PODRIAMOS AGREGAR TEMPERAMENTOS POR SI NO SE ENCUENTRAN
                }
            })

            finalQueryResult.sort((a, z) => (a.name > z.name) ? 1 : -1)

            console.log("LLEGUE A BUSCAR UNO O MAS")
            return res.json(finalQueryResult)
        }
    }
    catch (err) {
        console.log(err)
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
        });

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