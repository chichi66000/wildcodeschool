
const validator = require('validator');
const Argonaute = require('../model/argonautes')

exports.postArgonaute = (req,res,next) => {

    let nom = req.body.nom;
    console.log('type ' , typeof(nom));
    // validate name 
    if (validator.isEmpty(nom) || !validator.matches(nom, /^[a-zA-Z\s_\.\-,;:!]*$/gi) ) {
        return res.status(400).json({errors: "Le nom doit avoir au moins 2 charactes, ne doit pas être vide, contient seulement les lettres: A-Z, espace, -,;:!_"})
    }
    else {

        // console.log("date ", new Date());
        const argonaute = new Argonaute({
            nom: nom,
        })
        argonaute.save()
            .then(() => {
                return res.status(200).json(argonaute)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json({'error': 'Quelques choses clochent. Revenir plus tard'})})
        
    }
}

exports.getAllArgonautes = (req, res, next) => {
    Argonaute.find()
        .then(argonautes => {
            res.status(200).json({argonautes})
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({
                'error': 'Problème server. Veuillez tentez plus tard',
                err
            })
        })
}

exports.deleteArgonaute = (req,res,next) => {
    
}

