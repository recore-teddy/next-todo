import { NextPage } from "next";

import { wrapper } from "../store";
import TodoList from "../components/TodoList";
import { TodoType } from "../types/todo";

import { getTodosAPI } from "../lib/api/todo";
import { todoActions } from "../store/todo";

interface IProps {
  todos: TodoType[];
}

const app: NextPage<IProps> = ({ todos }) => {
  console.log(process.env.NEXT_PUBLIC_API_URL, "클라이언트");
  return <TodoList todos={todos} />;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, ...etc }) => {
      console.log(store);
      try {
        const { data } = await getTodosAPI();
        store.dispatch(todoActions.setTodo(data));
        return { props: { todos: data } };
      } catch (e) {
        console.log(e);
        return { props: { todos: [] } };
      }
    }
);

export default app;
