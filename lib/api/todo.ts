import axios from ".";
import { TodoType } from "../../types/todo";

// * 투두 추가하기 API Body
interface AddTodoAPIBody {
  text: string;
  color: TodoType["color"];
}

export const getTodosAPI = () => axios.get<TodoType[]>("api/todos");

export const checkTodoAPI = (id: number) => axios.patch(`api/todos/${id}`);

export const addTodoAPI = (body: AddTodoAPIBody) =>
  axios.post("api/todos", body);

export const deleteTodoAPI = (id: number) => axios.delete(`api/todos/${id}`);
