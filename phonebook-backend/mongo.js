const mongoose = require('mongoose')
//get password from cli arguments
const password = process.argv[2]

if (process.argv.length < 3) {
    console.log(
        'Please provide the password as an argument: node mongo.js <password>'
    )
    process.exit(1)
}

const url = `mongodb+srv://fullstack:${password}@cluster0.isxty0d.mongodb.net/noteApp?retryWrites=true&w=majority`

//The schema tells Mongoose how the note objects are to be stored in the database.
/*
const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})
*/
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number
})

//Mongoose automatically name collections as the plural (e.g. notes)
//const Note = mongoose.model('Note', noteSchema)
const Person = mongoose.model('Person', personSchema)

mongoose.connect(url).then((result) => {
    console.log('connected')

    //if there are 3 arguments, then add a new person
    if (process.argv.length === 5) {
        const person = new Person({
            name: process.argv[3],
            number: process.argv[4],
            id: Math.floor(Math.random() * 1000000)
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
