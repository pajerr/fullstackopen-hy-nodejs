require('dotenv').config()
const mongoose = require('mongoose')

//get password from cli arguments
const password = process.argv[2]

if (process.argv.length < 3) {
    console.log(
        'Please provide the password as an argument: node mongo.js <password>'
    )
    process.exit(1)
}

const url = process.env.MONGODB_URI

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number
})

const Person = mongoose.model('Person', personSchema)

mongoose.connect(url).then((result) => {
    if (process.argv.length === 3) {
        console.log('phonebook:')
        Person.find({}).then((result) => {
            result.forEach((person) => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
        })
    }

    //if there are 3 arguments, then add a new person
    if (process.argv.length === 5) {
        const person = new Person({
            name: process.argv[3],
            number: process.argv[4],
            id: Math.floor(Math.random() * 999999)
        }) //close const person

        return person
            .save()

            .then(() => {
                console.log(
                    `added ${person.name} number ${person.number} to phonebook`
                )
                return mongoose.connection.close()
            })
            .catch((error) => console.log(error))
    }
})
