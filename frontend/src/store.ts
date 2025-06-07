import {createStore, combineReducers, compose, applyMiddleware} from "redux";
import { ICanvasState } from "./game/canvas/state";
import { ICanvasActions } from "./game/canvas/actions";
import {canvasReducer} from './game/canvas/reducers';
import { IAuthState } from "./auth/state";
import { authReducer } from "./auth/reducer";
import { IAuthActions } from "./auth/actions";
import thunk,{ThunkDispatch as OldThunkDispatch} from "redux-thunk";
import {RouterState, connectRouter, routerMiddleware, CallHistoryMethodAction} from 'connected-react-router'
import {createBrowserHistory} from 'history';
import { IHomeState } from "./public/state";
import { IHomeActions } from "./public/actions";
import { homeReducer } from "./public/reducers";
import {ILeaderBoardActions} from './leaderboard/action'
import { ILeaderboardState } from "./leaderboard/state";
import { leaderBoardReducer } from "./leaderboard/reducer";

export const history = createBrowserHistory();

export interface IRootState{
    canvas:ICanvasState
    auth:IAuthState
    home:IHomeState
    leaderBoard:ILeaderboardState
    router:RouterState
}

export type IRootAction = ICanvasActions | IAuthActions| ILeaderBoardActions | IHomeActions | CallHistoryMethodAction

declare global{
    /* tslint:disable:interface-name */
    interface Window{
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__:any
    }
}

const rootReducer = combineReducers<IRootState>({
    canvas:canvasReducer,
    auth: authReducer,
    home: homeReducer,
    leaderBoard:leaderBoardReducer,
    router:connectRouter(history),
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


export type ThunkDispatch = OldThunkDispatch<IRootState, null, IRootAction>;

export default createStore<IRootState,IRootAction,{},{}>(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk),
        applyMiddleware(routerMiddleware(history))
    ));
