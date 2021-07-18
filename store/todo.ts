import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoType } from "../types/todo";

// // ? 항상 npm-module-or-app/reducer/ACTION_TYPE 형태의 action 타입을 가져야 합니다.
// // * 액션타입 정의 (reducer명/ACTION_TYPE 으로 대부분의 정의가 가능)
// export const SET_TODO_LIST = "todo/SET_TODO_LIST";

// // ? 항상 모듈의 action 생성자들을 함수형태로 export 해야 합니다.
// // * 액션 생성자 정의 (컴포넌트에서 dispatch(setTodo({})) 를 통해 액션을 실행하면 아래 액션 생성자에서 액션 객체를 리턴)
// export const setTodo = (payload: TodoType[]) => {
//   return {
//     type: SET_TODO_LIST,
//     payload,
//   };
// };

// export const todoActions = { setTodo };

interface TodoReduxState {
  todos: TodoType[];
}

// * 초기 상태
const initialState: TodoReduxState = {
  todos: [],
};

const todo = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // * 투두 변경하기
    setTodo(state, action: PayloadAction<TodoType[]>) {
      state.todos = action.payload;
    },
  },
});

export const todoActions = { ...todo.actions };

export default todo;

// // ? 항상 reducer() 란 이름의 함수를 export default 해야 합니다.
// // * 리듀서 (이전 상태와 액션객체를 파라미터로 받아 새로운 상태를 만들어서 반환)
// export default function reducer(state = initialState, action: any) {
//   switch (action.type) {
//     case SET_TODO_LIST:
//       const newState = { ...state, todos: action.payload };
//       return newState;
//     default:
//       return state;
//   }
// }
