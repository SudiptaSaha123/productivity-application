const express = require('express')
const Note = require('../models/Note')

exports.allNotes = async(req, res) => {
    try{
        const notes = await Note.find({userId: req.user._id})
        return res.json({
            notes
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

exports.createNote = async(req, res) => {
    const {content} = req.body
    try{
        const newNote = await Note.create({
            content,
            userId: req.user._id
        })

        return res.json({
            message: "Note created successfully",
            note: newNote
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

exports.editNote = async(req, res) => {
    const noteId = req.params.id
    const {content} = req.body

    try{
        let note = await Note.findById(noteId)

        if(!note){
            return res.status(404).json({
                message: "Note not found"
            })
        }

        if(note.userId.toString() !== req.user._id.toString()){
            return res.status(404).json({
                message: "Unauthorized"
            })
        }

       let updatedNote = await Note.findByIdAndUpdate(noteId, {content: content}, {new: true})

       res.json({
        message: "Note updated successfully",
        updatedNote
    })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

exports.deleteNote = async(req, res) => {
    let noteId = req.params.id

    try{
        const deletedNote = await Note.findById(noteId)

        if(!deletedNote){ 
            return res.status(404).json({
                message: 'Note not found'
            })
        }

        if(deletedNote.userId.toString() !== req.user._id.toString()){
            return res.status(404).json({
                message: "Unauthorized"
            })
        }

        await Note.deleteOne(deletedNote)
        return res.json({
            message: "Note deleted successfully"
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            message: "Server Error"
        })  
    }
}