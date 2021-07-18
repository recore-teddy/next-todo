import { createStore, applyMiddleware, combineReducers } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import todo from "./todo";

// * with-redux-wrapper 예제를 참고하여 만든 Redux Store
const rootReducer = combineReducers({
  todo,
});

// * 서버에서 생성한 스토어의 상태를 'HYDRATE' 라는 액션을 통해서 클라이언트에 합쳐주는 작업
const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  }
  return rootReducer(state, action);
};

// * 스토어의 타입
export type RootState = ReturnType<typeof rootReducer>;

// * 미들웨어 적용을 위한 스토어 enhancer (리덕스 데브툴 확장 프로그램을 사용하기 위함)
const bindMiddleWare = (middleware: any) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

// * 리듀서와 미들웨어로 리덕스 스토어를 만들어 리턴
const initStore = () => {
  return createStore(reducer, bindMiddleWare([]));
};

// * 공통 페이지 App 컴포넌트에서 wrapper 로 사용하기 위해,
// * 'next-redux-wrapper' 에서 createWrapper 를 import 하여 wrapper를 만듬
export const wrapper = createWrapper(initStore);
