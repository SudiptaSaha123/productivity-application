const express = require("express");
const Todo = require("../models/Todo");

exports.allTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user._id });
    return res.json({
      todos,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.createTodo = async (req, res) => {
  const { title } = req.body;
  try {
    const newTodo = await Todo.create({
      title,
      userId: req.user._id,
    });

    return res.json({
      message: "Todo created successfully",
      todo: newTodo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.editTodo = async (req, res) => {
  const todoId = req.params.id;
  const { title } = req.body;

  try {
    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    if (todo.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({
        message: "Unauthorized",
      });
    }

    let updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { title: title },
      { new: true }
    );

    res.json({
      message: "Todo updated successfully",
      updatedTodo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.deleteTodo = async (req, res) => {
  const todoId = req.params.id;

  try {
    const deletedTodo = await Todo.findById(todoId);

    if (!deletedTodo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    if (deletedTodo.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({
        message: "Unauthorized",
      });
    }

    await Todo.deleteOne(deletedTodo);
    return res.json({
      message: "Todo deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};
