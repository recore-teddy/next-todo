import { NextPage } from "next";
import TodoList from "../components/TodoList";
import { TodoType } from "../types/todo";

const todos: TodoType[] = [
  { id: 1, text: "리덕스 툴킷 학습하기", color: "red", checked: false },
  { id: 2, text: "수도자처럼 생각하기", color: "orange", checked: false },
  {
    id: 3,
    text: "재택 근무 대비 책상 정리하기",
    color: "yellow",
    checked: false,
  },
  { id: 4, text: "오늘은 뭐 먹지 고민하기", color: "green", checked: true },
  { id: 5, text: "책 100페이지 읽기", color: "blue", checked: true },
  { id: 6, text: "일주일만 굶어보기", color: "navy", checked: false },
];

const app: NextPage = () => {
  return <TodoList todos={todos} />;
};

export default app;
