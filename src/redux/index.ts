/**
 * @title: index
 * @projectName frontend-framework-simulation
 * @description: TODO
 * @author zhangyunpeng0126
 * @date 2022/4/710:54
 */

type CreateStore = (reducer: Function, initialState: {}, enhancer?: Function) => { dispatch: Function, getState: GetState }


type ActionParams = {
    type: string,
    payload?: any
}

type Action = (dispatch: Dispatch, getState: GetState) => void | ActionParams
type GetState = () => object

type Dispatch = (action: Action) => Action

type TmiddleWareParams = { dispatch: Dispatch, getState: GetState }

type TmiddleWare = (params: TmiddleWareParams) => Function

const compose = (...funcs: Function[]) => {
    // if (funcs.length === 0) {
    //     return arg => arg
    // }
    if (funcs && funcs.length === 1) {
        return funcs[0]
    }
    return funcs.reduce((a, b) => (...args: []) => a(b(...args)))
}

const applyMiddleware = (...middleWares: TmiddleWare[]) => {

    return (createStore: CreateStore) => (reducer: Function, initialState: {}) => {
        // 在中间件中createStore
        const store = createStore(reducer, initialState)
        let dispatch = store.dispatch
        const middleWaresAPI: TmiddleWareParams = {
            dispatch: (action: {}) => dispatch(action),
            getState: store.getState
        }
        // 调用中间件函数
        const chains = middleWares.map((middleWare: TmiddleWare) => middleWare(middleWaresAPI))
        // 给dispatch函数进行中间件函数执行绑定
        dispatch = compose(...chains)(dispatch)
        return {
            ...store,
            dispatch
        }
    }

}

// @ts-ignore
const createStore: CreateStore = (reducer: Function, initialState: {}, enhancer: Function) => {

    if (typeof enhancer === 'function') {
        // enhancer为中间件
        enhancer(createStore)(reducer, initialState)
    }
    let currentState = initialState
    let currentReducer = reducer

    const dispatch = (action: Action) => {
        currentState = currentReducer(action)
        return action
    }
    const getState = () => {
        return currentState
    }
    return {
        dispatch,
        getState
    }
}

const createThunkMiddleWare = () => {
    // 由于在48行绑定了，当dispatch(action) 会进入这边逻辑 并根据action函数认定其是否异步函数
    return ({dispatch, getState}: TmiddleWareParams) => (next: Dispatch) => (action: Action) => {
        if (typeof action === 'function') {
            return action(dispatch, getState)
        }
        return next(action)
    }
}
const initialList = {
    loading: false,
    dataList: [],
    totalPage: 0,
    totalCount: 0,
    currentPage: 0,
};

function reinsureList(state: {} = initialList, action: ActionParams) {
    switch (action.type) {
        default:
            return state
    }
}

const tempMiddles = [createThunkMiddleWare]
const middleware = compose(applyMiddleware(...tempMiddles));
const store = createStore(reinsureList, {}, middleware);