const router = require('express').Router();
const axios = require('axios')

const { Temperaments } = require('../db');

const {
    API_KEY
} = process.env;


let temp = [];
try {

    // llamo a la API, map para seleccionar los temperamentos. Usamos split para separarlos con , y guardarlos como array (temps) 
    // Teniendo todos los temperamentos mapeamos devuelta pero esta vez pusheandolos a temp como un objeto {nameT: t} y haciendo un find para que no se repitan
    // luego mapeamos temp para crear la tabla de tempereramentos.

    axios.get(`https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`)
        .then((response) => response.data)
        .then((json) => {
            json?.map(el => {
                let temps = el.temperament?.split(', ');
                temps?.map(t => {
                    if (!temp.find(tp => tp.nameT === t)) {
                        temp.push({ nameT: t });
                    }
                })
            })
        })
        .then(() => {
            temp.map(t => {
                Temperaments.findOrCreate({
                    where: {
                        nameT: t.nameT
                    }
                })
            })
        })
}
catch {
    (err => console.error(err));
}

router.get('/', async (req, res) => {

    try {
        await Temperaments.findAll()
            .then(final => res.json(final))
    }
    catch {
        (err => console.error(err));
    }

});


module.exports = router;