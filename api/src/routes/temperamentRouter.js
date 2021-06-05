const router = require('express').Router();
const axios = require('axios')

const { Temperaments } = require('../db');

const {
    API_KEY
} = process.env;


let temp = [];
try {
    axios.get(`https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`)
        .then((response) => response.data)
        .then((json) => {
            json?.forEach(el => {
                let temps = el.temperament?.split(', ');
                temps?.forEach(t => {
                    if (!temp.find(tp => tp.nameT === t)) {
                        temp.push({ nameT: t });
                    }
                });
            })
        })
        .then(() => {
            temp.forEach(t => {
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