import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
import chat from "./modules/chat";

import User from "./modules/user";
import post from "./modules/post";
import recruit from "./modules/recruit";
import image from "./modules/image";
import comment from "./modules/comment";
import apply from "./modules/apply";
import myPage from "./modules/myPage";
// import Post from "./modules/post";
// import Image from "./modules/image";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  user: User,
  recruit: recruit,
  image: image,
  post: post,
  chat: chat,
  comment: comment,
  apply: apply,
  myPage: myPage,
  router: connectRouter(history),
});

const middlewares = [thunk.withExtraArgument({ history: history })];

// 지금이 어느 환경인 지 알려줘요. (개발환경, 프로덕션(배포)환경 ...)
const env = process.env.NODE_ENV;

// 개발환경에서의 logger 추가
if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

const store = createStore(rootReducer, enhancer);

export default store;
