const express = require("express");
const Todo = require("../models/todolist.js");
const mongoose = require("mongoose");

const todo = {
  readAll: async (req, res) => {
    try {
      // 쿼리 파라미터에서 날짜를 가져옴
      const { date } = req.query;
      let query = {};

      // 날짜가 제공된 경우 필터링
      if (date) {
        // 날짜를 ISO Date 문자열로 변환
        const parsedDate = new Date(date);

        // 필터링 조건 설정 (ISO Date 범위)
        query.date = {
          $gte: parsedDate,
          $lt: new Date(parsedDate.getTime() + 24 * 60 * 60 * 1000), // 하루 단위
        };
      }

      // 필터링 조건을 기반으로 투두리스트 조회
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
  // todo 모듈 중 read 비동기 함수
  read: async (req, res) => {
    // 파라미터로 받은 todoId를 변수에 담는다. (localhost:3000/todolist/5e6e4743ea803ad69a8f82b8)
    const todoId = req.params.todoId;
    // Todo(models/todolist.js) 모듈의 find()함수에 todoId를 인자로 넣어 실행한다.
    const todo = await Todo.find(todoId);
    try {
      // 만약, 결과값이 존재하지 않는다면 존재하지 않는 글을 보려 시도한 것.
      if (!todo.length)
        return res.status(404).send({
          err: "Todo not found",
        });
      // 존재한다면 find successfully와 함께 성공한 객체 출력
      res.json(todo);
    } catch (err) {
      // 서버 오류 발생시 500 status 반환
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

      // ObjectId 인스턴스 생성
      const objectId = new mongoose.Types.ObjectId(todoId);

      // 문서 삭제
      const result = await Todo.findByIdAndDelete(objectId);

      if (!result) {
        // 항목이 존재하지 않을 경우 404 오류
        return res.status(404).send({ error: "Todo not found" });
      }

      res.sendStatus(200);
    } catch (err) {
      console.error(`Error during deletion: ${err.message}`);
      res.status(500).send({ error: "Internal server error" });
    }
  },
};

module.exports = todo;
