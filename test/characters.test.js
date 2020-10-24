const request = require('supertest');
const { set } = require('../app');
const app = require('../app');
const APIURI = '/api/v1'

describe('Characters Testing', () => {
  //#region POST
	describe.skip('POST /characters => add a new character', () => {
		describe('success case', () => {
      test('use json; return status 201; success message; created character; check wizard value', async (done) => {
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
			test('use www-form; return status 201; success message; created character', async (done) => {
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
          expect(res.body).toHaveProperty('message', 'Character\'s Power must be a number greater than 0')
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
          expect(res.body).toHaveProperty('message', 'Character\'s Power must be a number greater than 0')
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
	describe.skip('PUT /carts/:id => update character name & power', () => {
		describe('success case', () => {
			test('should return success message; status 200; updated character; check wizard value', async (done) => {
        const res = await request(app)
        .put(`${APIURI}/characters/1`)
        .send({
          name: 'Gandalf The Grey',
          power: 90
        })
        .set('Accept', 'application/json')

        expect(res.error).toEqual(false)
        expect(res.status).toEqual(200)
        expect(res.body).toHaveProperty('message', 'Character successfully updated')
        expect(res.body).toHaveProperty('updated', expect.objectContaining({
          name: 'Gandalf The Grey',
          character_code: expect.any(Number),
          power: 90,
          value: 135
        }))
        done()
      })
      test('use www-form; return success message; status 200; updated character', async (done) => {
        const res = await request(app)
        .put(`${APIURI}/characters/1`)
        .type('form')
        .send({
          name: 'Gandalf The Grey',
          power: 90
        })

        expect(res.error).toEqual(false)
        expect(res.status).toEqual(200)
        expect(res.body).toHaveProperty('message', 'Character successfully updated')
        expect(res.body).toHaveProperty('updated', expect.objectContaining({
          name: 'Gandalf The Grey',
          character_code: expect.any(Number),
          power: 90,
          value: 135
        }))
        done()
      })
      describe('Empty power', () => {
        test('should return success message; status 200; updated character', async (done) => {
          const res = await request(app)
          .put(`${APIURI}/characters/1`)
          .send({
            name: 'Gandalf the White',
            power: ''
          })
          .set('Accept', 'application/json')
  
          expect(res.error).toEqual(false)
          expect(res.status).toEqual(200)
          expect(res.body).toHaveProperty('message', 'Character successfully updated')
          expect(res.body).toHaveProperty('updated', expect.objectContaining({
            name: 'Gandalf The White',
            character_code: expect.any(Number),
            power: 90,
            value: 135
          }))
          done()
        })
      })
      describe('Null power', () => {
        test('should return success message; status 200; updated character', async (done) => {
          const res = await request(app)
          .put(`${APIURI}/characters/1`)
          .send({
            name: 'Gandalf the White'
          })
          .set('Accept', 'application/json')
  
          expect(res.error).toEqual(false)
          expect(res.status).toEqual(200)
          expect(res.body).toHaveProperty('message', 'Character successfully updated')
          expect(res.body).toHaveProperty('updated', expect.objectContaining({
            name: 'Gandalf The White',
            character_code: expect.any(Number),
            power: 90,
            value: 135
          }))
          done()
        })
      })
      describe('Empty name', () => {
        test('should return success message; status 200; updated character', async (done) => {
          const res = await request(app)
          .put(`${APIURI}/characters/1`)
          .send({
            name: '',
            power: 200
          })
          .set('Accept', 'application/json')
  
          expect(res.error).toEqual(false)
          expect(res.status).toEqual(200)
          expect(res.body).toHaveProperty('message', 'Character successfully updated')
          expect(res.body).toHaveProperty('updated', expect.objectContaining({
            name: 'Gandalf The Grey',
            character_code: expect.any(Number),
            power: 200,
            value: 300
          }))
          done()
        })
      })
      describe('Null name', () => {
        test('should return success message; status 200; updated character', async (done) => {
          const res = await request(app)
          .put(`${APIURI}/characters/1`)
          .send({
            power: 150
          })
          .set('Accept', 'application/json')
  
          expect(res.error).toEqual(false)
          expect(res.status).toEqual(200)
          expect(res.body).toHaveProperty('message', 'Character successfully updated')
          expect(res.body).toHaveProperty('updated', expect.objectContaining({
            name: 'Gandalf The Grey',
            character_code: expect.any(Number),
            power: 150,
            value: 225
          }))
          done()
        })
      })
      describe('Check elf update value', () => {
        test('should return success message; status 200; updated character', async (done) => {
          const res = await request(app)
          .put(`${APIURI}/characters/2`)
          .send({
            power: 50
          })
          .set('Accept', 'application/json')
  
          expect(res.error).toEqual(false)
          expect(res.status).toEqual(200)
          expect(res.body).toHaveProperty('message', 'Character successfully updated')
          expect(res.body).toHaveProperty('updated', expect.objectContaining({
            name: 'Legolas',
            character_code: expect.any(Number),
            power: 50,
            value: 57
          }))
          done()
        })
      })
      describe('Check hobbit update (1)', () => {
        test('should return success message; status 200; updated character', async (done) => {
          const res = await request(app)
          .put(`${APIURI}/characters/3`)
          .send({
            power: 20
          })
          .set('Accept', 'application/json')
  
          expect(res.error).toEqual(false)
          expect(res.status).toEqual(200)
          expect(res.body).toHaveProperty('message', 'Character successfully updated')
          expect(res.body).toHaveProperty('updated', expect.objectContaining({
            name: 'Frodo',
            character_code: expect.any(Number),
            power: 20,
            value: 60
          }))
          done()
        })
      })
      describe('Check hobbit update (2)', () => {
        test('should return success message; status 200; updated character', async (done) => {
          const res = await request(app)
          .put(`${APIURI}/characters/3`)
          .send({
            power: 20
          })
          .set('Accept', 'application/json')
  
          expect(res.error).toEqual(false)
          expect(res.status).toEqual(200)
          expect(res.body).toHaveProperty('message', 'Character successfully updated')
          expect(res.body).toHaveProperty('updated', expect.objectContaining({
            name: 'Frodo',
            character_code: expect.any(Number),
            power: 10,
            value: 20
          }))
          done()
        })
      })
		})

		describe ('error case', () => {
      describe ('Wrong URI', () => {
        test ('return 404 message', async (done) => {
          const res = await request(app).put(`${APIURI}/character/3`)
          expect(res.error).toEqual(true)
          expect(res.status).toEqual(404)
          expect(res.body).toHaveProperty('message', 'API not found')
          done()
        })
      })
      describe('Wrong character ID', () => {
        test('return 404 character not found message', async (done) => {
          const res = await request(app).put(`${APIURI}/characters/100`)
          expect(res.error).toEqual(true)
          expect(res.status).toEqual(404)
          expect(res.body).toHaveProperty('message', 'Character not found!')
          done()
        })
      })
      describe('Wrong character ID', () => {
        test('return invalid power message; status 400', async (done) => {
          const res = await request(app)
          .put(`${APIURI}/characters/3`)
          .send({ power: -10 })
          .set('Accept', 'application/json')
          
          expect(res.error).toEqual(true)
          expect(res.status).toEqual(400)
          expect(res.body).toHaveProperty('message', 'Character\'s Power must be a number greater than 0')
          done()
        })
      })
      describe('Wrong character ID', () => {
        test('return invalid power message; status 400', async (done) => {
          const res = await request(app)
          .put(`${APIURI}/characters/3`)
          .send({ power: 'a' })
          .set('Accept', 'application/json')
          
          expect(res.error).toEqual(true)
          expect(res.status).toEqual(400)
          expect(res.body).toHaveProperty('message', 'Character\'s Power must be a number greater than 0')
          done()
        })
      })
      describe('Update Character Code', () => {
        test('return action forbidden message; status 403', async (done) => {
          const res = await request(app)
          .put(`${APIURI}/characters/3`)
          .send({ character_code: 1 })
          .set('Accept', 'application/json')
          
          expect(res.error).toEqual(true)
          expect(res.status).toEqual(403)
          expect(res.body).toHaveProperty('message', 'Requested Action is Forbidden!')
          done()
        })
      })
      describe('Update Character Value', () => {
        test('return action forbidden message; status 403', async (done) => {
          const res = await request(app)
          .put(`${APIURI}/characters/3`)
          .send({ value: 1 })
          .set('Accept', 'application/json')
          
          expect(res.error).toEqual(true)
          expect(res.status).toEqual(403)
          expect(res.body).toHaveProperty('message', 'Requested Action is Forbidden!')
          done()
        })
      })
		})
  })
  //#endregion
})