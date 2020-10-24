const request = require('supertest');
const { set } = require('../app');
const app = require('../app');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;
const APIURI = '/api/v1'

// beforeAll(done => {
// 	logThis(`creating 1st user`, true);
// 	// create 1st customer
// 	User.create({
// 		name: nameCustomer1,
// 		email: emailCustomer1,
// 		role,
// 		password
// 	})
// 		.then(result => {
// 			idCustomer1 = result.id
// 			logThis(`1st user created`, true);
// 			// create 2nd customer
// 			logThis(`creating 2nd user`, true);
// 			return User.create({
// 				name: nameCustomer2,
// 				email: emailCustomer2,
// 				role,
// 				password
// 			})
// 		})
// 		.catch(err => {
// 			console.log('this is error from cart test', err);
// 		})
// 		.finally(() => {
// 			done()
// 		})
// })


// afterAll(done => {
// 	logThis('delete data after testing', true)
// 	queryInterface.bulkDelete('Carts', {})
// 		.then(_ => {
// 			return queryInterface.bulkDelete('Products', {})
// 		})
// 		.catch(err => {
// 			console.log(`oops something is wrong in deleting!`, err);
// 		})
// 		.finally(() => {
// 			logThis('deletion done', true)
// 			done()
// 		})
// })

describe('Characters Testing', () => {
  //#region POST
	describe('POST /characters => add a new character', () => {
		describe('success case', () => {
      test('use json; return status 201; success message; created character; wizard value', async (done) => {
        const res = await request(app)
        .post(`${APIURI}/characters`)
        .send({
          name: 'Vivi',
          character_code: 1,
          power: 100
        })
        .set('Accept', 'application/json')

        expect(res.error).toBe(false)
        expect(res.status).toEqual(201)
        expect(res.body).not.toHaveProperty('error')
        expect(res.body).toHaveProperty('message', 'Character successfully created')
        expect(res.body).toHaveProperty('created', expect.objectContaining({
          name: 'Vivi',
          character_code: 1,
          power: 100,
          value: 150
        }))
        done()
      })
			test('use www-form; return status 201; success message; created character; wizard value', async (done) => {
        const res = await request(app)
        .post(`${APIURI}/characters`)
        .type('form')
        .send({
          name: 'Vivi',
          character_code: 1,
          power: 100
        })
        
        expect(res.error).toBe(false)
        expect(res.status).toEqual(201)
        expect(res.body).not.toHaveProperty('error')
        expect(res.body).toHaveProperty('message', 'Character successfully created')
        expect(res.body).toHaveProperty('created', expect.objectContaining({
          name: 'Vivi',
          character_code: 1,
          power: 100,
          value: 150
        }))
			  done()
      })
      test('check create elf value', async (done) => {
        const res = await request(app)
        .post(`${APIURI}/characters`)
        .type('form')
        .send({
          name: 'Dobby',
          character_code: 2,
          power: 15
        })
        
        expect(res.body).toHaveProperty('created', expect.objectContaining({
          name: 'Dobby',
          character_code: 2,
          power: 15,
          value: 18.5
        }))
			  done()
      })
      test('check create hobbit value (pow < 20)', async (done) => {
        const res = await request(app)
        .post(`${APIURI}/characters`)
        .type('form')
        .send({
          name: 'Samwise Gamgee',
          character_code: 3,
          power: 10
        })
        
        expect(res.body).toHaveProperty('created', expect.objectContaining({
          name: 'Samwise Gamgee',
          character_code: 3,
          power: 10,
          value: 20
        }))
			  done()
      })
      test('check create hobbit value (pow >= 20)', async (done) => {
        const res = await request(app)
        .post(`${APIURI}/characters`)
        .type('form')
        .send({
          name: 'Samwise Gamgee',
          character_code: 3,
          power: 20
        })
        
        expect(res.body).toHaveProperty('created', expect.objectContaining({
          name: 'Peregrin Took',
          character_code: 3,
          power: 20,
          value: 60
        }))
			  done()
			})
		})

		describe('error case', () => {
      describe('Wrong URI', () => {
        test ('should return 404 message', async (done) => {
          const res = await request(app).post(`${APIURI}/character`)
          expect(res.error).toBe(true)
          expect(res.status).toEqual(404)
          expect(res.body).toHaveProperty('message', 'API not found!')
          done()
        })
      })
      //#region Character Name
      describe('Empty Character Name', () => {
        test('should return empty name error and code 400', async (done) => {
          const res = await request(app)
          .post(`${APIURI}/character`)
          .send({
            name: '',
            character_code: 1,
            power: 100
          })
          set('Accept', 'application/json')

          expect(res.error).toBe(true)
          expect(res.status).toEqual(400)
          expect(res.body).toHaveProperty('message', 'Please input Character\'s Name')
          done()
        })
      })
      describe('Null Character Name', () => {
        test('should return empty name error and code 400', async (done) => {
          const res = await request(app)
          .post(`${APIURI}/character`)
          .send({
            character_code: 1,
            power: 100
          })
          set('Accept', 'application/json')

          expect(res.error).toBe(true)
          expect(res.status).toEqual(400)
          expect(res.body).toHaveProperty('message', 'Please input Character\'s Name')
          done()
        })
      })
      //#endregion

      //#region Character Code
      describe('Empty Character Code', () => {
        test('should return invalid code error and code 400', async (done) => {
          const res = await request(app)
          .post(`${APIURI}/character`)
          .send({
            name: 'Shang Tsung',
            character_code: '',
            power: 100
          })
          set('Accept', 'application/json')

          expect(res.error).toBe(true)
          expect(res.status).toEqual(400)
          expect(res.body).toHaveProperty('message', 'Please input Character\'s Code. Available Code:\nCode\tClass\n1\tWizard\n2\tElf\n3\tHobbit')
          done()
        })
      })
      describe('Null Character Code', () => {
        test('should return invalid code error and code 400', async (done) => {
          const res = await request(app)
          .post(`${APIURI}/character`)
          .send({
            name: 'Shang Tsung',
            power: 100
          })
          set('Accept', 'application/json')

          expect(res.error).toBe(true)
          expect(res.status).toEqual(400)
          expect(res.body).toHaveProperty('message', 'Please input Character\'s Code. Available Code:\nCode\tClass\n1\tWizard\n2\tElf\n3\tHobbit')
          done()
        })
      })
      describe('Invalid Character Code (1)', () => {
        test('should return invalid code error and code 400', async (done) => {
          const res = await request(app)
          .post(`${APIURI}/character`)
          .send({
            name: 'Shang Tsung',
            character_code: 4,
            power: 100
          })
          set('Accept', 'application/json')

          expect(res.error).toBe(true)
          expect(res.status).toEqual(400)
          expect(res.body).toHaveProperty('message', 'Please input a valid Character\'s Code. Available Code:\nCode\tClass\n1\tWizard\n2\tElf\n3\tHobbit')
          done()
        })
      })
      describe('Invalid Character Code (2)', () => {
        test('should return invalid code error and code 400', async (done) => {
          const res = await request(app)
          .post(`${APIURI}/character`)
          .send({
            name: 'Shang Tsung',
            character_code: 'a',
            power: 100
          })
          set('Accept', 'application/json')

          expect(res.error).toBe(true)
          expect(res.status).toEqual(400)
          expect(res.body).toHaveProperty('message', 'Please input a valid Character\'s Code. Available Code:\nCode\tClass\n1\tWizard\n2\tElf\n3\tHobbit')
          done()
        })
      })
      //#endregion

      //#region Character Power
      describe('Empty Character Power', () => {
        test('should return empty power error and code 400', async (done) => {
          const res = await request(app)
          .post(`${APIURI}/character`)
          .send({
            name: 'Shang Tsung',
            character_code: 1,
            power: ''
          })
          set('Accept', 'application/json')

          expect(res.error).toBe(true)
          expect(res.status).toEqual(400)
          expect(res.body).toHaveProperty('message', 'Please input Character\'s Power (Greater than 0)')
          done()
        })
      })
      describe('Null Character Power', () => {
        test('should return empty power error and code 400', async (done) => {
          const res = await request(app)
          .post(`${APIURI}/character`)
          .send({
            name: 'Shang Tsung',
            character_code: 1,
          })
          set('Accept', 'application/json')

          expect(res.error).toBe(true)
          expect(res.status).toEqual(400)
          expect(res.body).toHaveProperty('message', 'Please input Character\'s Power (Greater than 0)')
          done()
        })
      })
      describe('Invalid Character Power (1)', () => {
        test('should return invalid power error and code 400', async (done) => {
          const res = await request(app)
          .post(`${APIURI}/character`)
          .send({
            name: 'Shang Tsung',
            character_code: 4,
            power: -100
          })
          set('Accept', 'application/json')

          expect(res.error).toBe(true)
          expect(res.status).toEqual(400)
          expect(res.body).toHaveProperty('message', 'Please input a valid Character\'s Code. Available Code:\nCode\tClass\n1\tWizard\n2\tElf\n3\tHobbit')
          done()
        })
      })
      describe('Invalid Character Power (2)', () => {
        test('should return invalid power error and code 400', async (done) => {
          const res = await request(app)
          .post(`${APIURI}/character`)
          .send({
            name: 'Shang Tsung',
            character_code: 4,
            power: 'a'
          })
          set('Accept', 'application/json')

          expect(res.error).toBe(true)
          expect(res.status).toEqual(400)
          expect(res.body).toHaveProperty('message', 'Please input a valid Character\'s Code. Available Code:\nCode\tClass\n1\tWizard\n2\tElf\n3\tHobbit')
          done()
        })
      })
      //#endregion
		})
	})
  //#endregion

  //#region GET
	describe('GET /characters => get all created characters', () => {
		describe('success case', () => {
			test('should return list of all characters in database; status 200', async () => {
				const res = await request(app).get(`${APIURI}/characters`)
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('characters')
        expect(res.body).not.toHaveProperty('error')
        expect(res.body).toHaveProperty('characters', expect.arrayContaining(expect.objectContaining({
          name: expect.any(String),
          character_code: expect.any(Number),
          power: expect.any(Number),
          value: expect.any(Number)
        })))
        // expect(res.body.characters[0]).toContain('name')
        // expect(res.body.characters[0]).toContain('character_code')
        // expect(res.body.characters[0]).toContain('power')
        // expect(res.body.characters[0]).toContain('value')

			})
		})

		describe('error case', () => {
      describe('wrong uri', () => {
        test('should give 404 message', async (done) => {
          const res = await request(app).get(`/character`)
          expect(res.error).toBe(true)
          expect(res.status).toBe(404)
          expect(res.body).toHaveProperty('message', 'API not found!')
          done()
        })
      })
		})
	})
  //#endregion 

  //#region PUT
	describe('PUT /carts/:id => update character name & power', () => {
		describe('success case', () => {
			test('should return success message; status 200; updated character', async (done) => {
        const res = await request(app).put(`${APIURI}/characters/1`)

				
			})
      
      // check empty name
      // check null name
      // check empty power
      // check null power
      // check elf update value
      // check hobbit update value
		})

		describe('error case', () => {
      // wrong uri
      // wrong char id
      // invalid pow (minus)
      // invalid pow (string)
		})
  })
  //#endregion
})