const { Breeds, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Breeds.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Breeds.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Breeds.create({ name: 'Pug' });
      });
    });
    describe('Validations', function () {
      xit('should throw an error if contest is null', function (done) {
        Breeds.create({
          title: 'hola',
        })
          .then(() => done('No deberia haberse creado'))
          .catch(() => done());
      });
      xit('error con un status invalido', function (done) {
        Breeds.create({
          title: 'hola',
          content: 'hola',
          status: 'esto no es un status valido'
        })
          .then(() => done('No debería haberse creado'))
          .catch(() => done());
      });
    });


  });
});
