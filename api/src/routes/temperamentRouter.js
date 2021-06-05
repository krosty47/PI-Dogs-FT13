const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const axios = require('axios')

const { TemperamentDb } = require('../db');

const {
    YOUR_API_KEY
  } = process.env;
  

  let temp = [];
          axios.get(`https://api.thedogapi.com/v1/breeds/?api_key=${YOUR_API_KEY}`)
          .then((response) => response.data.results)
          .then((json) => {
          json?.forEach(el => {
              let temps = el.temperament?.split(', '); 
              temps?.forEach(t => {
                  if (!temp.find(tp => tp.name === t)) {
                      temp.push({ nameT: t });
                      console.log(temp)
                  }
              });
          })
      })
      .then(() => {
          temp.forEach(t => {
            TemperamentDb.findOrCreate({
                  where: {
                      nameT: t.name
                  }
              })
          })
      })
      .catch(err => console.error(err));
  

router.get('/', async (req, res) => {

    await TemperamentDb.findAll()
    .then(final => res.json(final))

});


module.exports = router;