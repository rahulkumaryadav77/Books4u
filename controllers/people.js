const People = require('../models/peoples');
const Book = require('../models/books');

module.exports = {
    async getAllPeople(req, res) {
        const people = await People.find({});
        res.render('people', { title: 'People', people });
    },
    async peopleForm(req, res) {
        res.render('admin/newPeopleForm', { title: 'Admin'});
    },
    async newPeople(req, res){  
        const description = req.body.description;
        const name = req.body.name;
        const image = req.body.image;
        const field = req.body.field;
        const recomendation = req.body.recomendation;
        const peopleDetails = { description: description, name: name, image: image, field: field, recomendation: recomendation };
        const peopleExists = await People.findOne({name: name});
        if(peopleExists) {
            // console.log('This personality already exixts!');
            req.flash('warning', 'This personality already exixts !')
            return res.redirect('/addPeople');
        }
        const newPeople = await People.create(peopleDetails);
        // const book = await Book.find({title: newPeople.recomendation});
        // if(book.length > 0) {
        //     book.recommendedBy = newPeople;
        // }
        // console.log(book.recommendedBy);
        // await book.save();
        res.redirect('/admin/people');
    },
    async peopleDetails(req, res) {
        const people = await People.findOne({name: req.params.name});
        const books = await Book.find({recommendedBy: people});
        //console.log(books);
        res.render('peopleDetails', { title: 'People', people, books });
    },
    async editPeople(req, res) {
        const people = await People.findOne({name: req.params.name});
        res.render('admin/editPeople', { title: 'Admin', people, p: people.recomendation });
    },
    async updatePeople(req, res) {
        const people = await People.findOne({name: req.params.name});
        people.description = req.body.description;
        people.name = req.body.name;
        people.image = req.body.image;
        people.field = req.body.field;
        people.recomendation = req.body.recomendation;
        await people.save();
        req.flash('success', 'People updated successfully !');
        res.redirect('/admin/people');
    },
    async deletePeople(req, res) {
        await People.findOneAndDelete({name: req.params.name});
        req.flash('success', 'People deleted successfully !');
        res.redirect('/admin/people');
    }
}