const express = require("express");
const Todo = require("../models/todolist.js");
const mongoose = require("mongoose");

const todo = {
  readAll: async (req, res) => {
    try {
      const { date } = req.query;
      let query = {};

      if (date) {
        const parsedDate = new Date(date);

        query.date = {
          $gte: parsedDate,
          $lt: new Date(parsedDate.getTime() + 24 * 60 * 60 * 1000), // 하루 단위
        };
      }

      const todos = await Todo.find(query);

      if (!todos.length) {
        return res.status(404).send({
          err: "Todo not found",
        });
      }
      res.json(todos);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  read: async (req, res) => {
    const todoId = req.params.todoId;
    const todo = await Todo.find(todoId);
    try {
      if (!todo.length)
        return res.status(404).send({
          err: "Todo not found",
        });
      res.json(todo);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  write: async (req, res) => {
    try {
      const result = await Todo.create(req.body);
      res.json(result);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  delete: async (req, res) => {
    try {
      const todoId = req.params.todoId;

      // _id가 유효한 ObjectId인지 확인 및 변환
      if (!mongoose.Types.ObjectId.isValid(todoId)) {
        return res.status(400).send({ error: "Invalid ID format" });
      }

      const objectId = new mongoose.Types.ObjectId(todoId);

      // 문서 삭제
      const result = await Todo.findByIdAndDelete(objectId);

      if (!result) {
        return res.status(404).send({ error: "Todo not found" });
      }

      res.sendStatus(200);
    } catch (err) {
      console.error(`Error during deletion: ${err.message}`);
      res.status(500).send({ error: "Internal server error" });
    }
  },
  update: async (req, res) => {
    try {
      const todoId = req.params.todoId;
      const updateFields = req.body;

      if (!mongoose.Types.ObjectId.isValid(todoId)) {
        return res.status(400).send({ error: "Invalid ID format" });
      }

      // _id 필드 제거
      delete updateFields._id;

      // 문서 업데이트
      const result = await Todo.findByIdAndUpdate(todoId, updateFields, {
        new: true,
      });

      if (!result) {
        return res.status(404).send({ error: "Todo not found" });
      }

      res.json(result);
    } catch (err) {
      console.error(`Error during update: ${err.message}`);
      res.status(500).send({ error: "Internal server error" });
    }
  },
};

module.exports = todo;
