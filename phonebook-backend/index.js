const express = require('express')
const app = express()

var morgan = require('morgan')
const middleware = morgan('tiny')

let persons = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: '040-123456'
    },
    {
        id: 2,
        name: 'Ada Lovelace',
        number: '39-44-5323523'
    },
    {
        id: 3,
        name: 'Dan Abramov',
        number: '12-43-234345'
    },
    {
        id: 4,
        name: 'Mary Poppendieck',
        number: '39-23-6423122'
    }
]

app.use(express.json())
app.use(middleware)

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const date = new Date()
    response.send(
        `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`
    )
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find((person) => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
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

const PORT = 3009
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
