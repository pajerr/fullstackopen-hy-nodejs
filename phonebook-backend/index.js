require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

var morgan = require('morgan')
const middleware = morgan('tiny')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware)

app.get('/api/persons', (request, response) => {
    //response.json(persons)
    Person.find({}).then((persons) => {
        response.json(persons)
    })
})

app.get('/info', (request, response) => {
    const date = new Date()
    response.send(
        `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`
    )
})

app.get('/api/persons/:id', (request, response) => {
    /*const id = Number(request.params.id)
    const person = persons.find((person) => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }*/
    Person.findById(request.params.id).then((person) => {
        response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter((person) => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
    min = Math.ceil(9)
    max = Math.floor(19352)
    return Math.floor(Math.random() * (max - min) + min)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }
    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }
    if (persons.find((person) => person.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    morgan_log = morgan.token('type', function (req, res) {
        return req.body.name
    })

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)

    console.log(morgan_log)
    response.json(person)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
