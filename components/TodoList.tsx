import React, { useMemo, useState } from "react";
// import { useRouter } from "next/dist/client/router";
import styled from "styled-components";
import { TodoType } from "../types/todo";
import palette from "../styles/palette";

import { checkTodoAPI } from "../lib/api/todo";

import TrashCanIcon from "../public/statics/svg/trash_can.svg";
import CheckMarkIcon from "../public/statics/svg/check_mark.svg";

interface IProps {
  todos: TodoType[];
}

type ObjectIndexType = {
  [key: string]: number | undefined; // ObjectIndexType 타입에 [key] 의 값으로 number | undefined 라는 타입 지정.
};

const Container = styled.div`
  width: 100%;
  .todo-list-header {
    padding: 12px;
    position: relative;
    border-bottom: 1px solid ${palette.gray};
    .todo-list-last-todo {
      font-size: 14px;
      margin: 0 0 8px;
      span {
        margin-left: 12px;
      }
    }
  }

  .todo-list-header-colors {
    display: flex;
    .todo-list-header-color-num {
      display: flex;
      margin-right: 8px;
      p {
        font-size: 14px;
        line-height: 16px;
        margin: 0;
        margin-left: 6px;
      }
      .todo-list-header-round-color {
        width: 16px;
        height: 16px;
        border-radius: 50%;
      }
    }
  }

  .bg-blue {
    background-color: ${palette.blue};
  }
  .bg-green {
    background-color: ${palette.green};
  }
  .bg-navy {
    background-color: ${palette.navy};
  }
  .bg-orange {
    background-color: ${palette.orange};
  }
  .bg-red {
    background-color: ${palette.red};
  }
  .bg-yellow {
    background-color: ${palette.yellow};
  }

  .todo-list {
    .todo-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 52px;
      border-bottom: 1px solid ${palette.gray};
      .todo-left-side {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        .todo-color-block {
          width: 12px;
          height: 100%;
        }
        .checked-todo-text {
          color: ${palette.gray};
          text-decoration: line-through;
        }
        .todo-text {
          margin-left: 12px;
          font-size: 16px;
        }
      }

      .todo-right-side {
        display: flex;
        margin-right: 12px;

        svg {
          &:first-child {
            margin-right: 16px;
          }
        }

        .todo-trash-can {
          width: 26px;
          path {
            fill: ${palette.deep_red};
          }
        }
        .todo-check-mark {
          path {
            fill: ${palette.deep_green};
          }
        }

        .todo-button {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1px solid ${palette.gray};
          background-color: transparent;
          outline: none;
        }
      }
    }
  }
`;

const TodoList: React.FC<IProps> = ({ todos }) => {
  const [localTodos, setLocalTodos] = useState(todos);

  const todoColorNums = useMemo(() => {
    const colors: ObjectIndexType = {};
    // * 서버에서 받아오던 todos 를 localTodos 로 변경
    localTodos.forEach((todo) => {
      const value = colors[todo.color];
      if (!value) {
        // * 존재하지 않던 key 라면
        colors[`${todo.color}`] = 1;
      } else {
        // * 존재하는 key 라면
        colors[`${todo.color}`] = value + 1;
      }
    });
    return colors;
  }, [todos]);

  // const router = useRouter();

  const checkTodo = async (id: number) => {
    try {
      await checkTodoAPI(id);
      console.log("체크하였습니다.");

      // * 체크를 뷰에 적용하는 방법 1 (데이터 다시 받기)
      // router.reload();

      // * 체크를 뷰에 적용하는 방법 2 (클라이언트 측 내비게이션으로 전체를 다시 불러오지 않게 하기)
      // router.push("/");

      // * 체크를 뷰에 적용하는 방법 3 (data 를 local 로 저장하여 사용하기, useState)
      const newTodos = localTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked: !todo.checked };
        }
        return todo;
      });
      setLocalTodos(newTodos);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <div className="todo-list-header">
        <p className="todo-list-last-todo">
          남은 TODO<span>{localTodos.length}개</span>
        </p>
        <div className="todo-list-header-colors">
          {Object.keys(todoColorNums).map((color, index) => (
            <div className="todo-list-header-color-num" key={index}>
              <div className={`todo-list-header-round-color bg-${color}`} />
              <p>{todoColorNums[color]}개</p>
            </div>
          ))}
        </div>
      </div>
      <ul className="todo-list">
        {localTodos.map((todo) => (
          <li className="todo-item" key={todo.id}>
            <div className="todo-left-side">
              <div className={`todo-color-block bg-${todo.color}`} />
              <p
                className={`todo-text ${
                  todo.checked ? "checked-todo-text" : ""
                }`}
              >
                {todo.text}
              </p>
            </div>
            <div className="todo-right-side">
              {todo.checked && (
                <>
                  <TrashCanIcon className="todo-trash-can" onClick={() => {}} />
                  <CheckMarkIcon
                    className="todo-check-mark"
                    onClick={() => checkTodo(todo.id)}
                  />
                </>
              )}
              {!todo.checked && (
                <button
                  type="button"
                  className="todo-button"
                  onClick={() => checkTodo(todo.id)}
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default TodoList;
