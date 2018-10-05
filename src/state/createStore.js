import { createStore as reduxCreateStore } from 'redux'

const reducer = (state, action) => {
  if (action.type === `SET_MARKET_DATA`) {
    return {
      ...state,
      marketData: action.payload,
    }
  }
  if (action.type === `SET_SELECTED_MARKET`) {
    return {
      ...state,
      selectedMarket: action.payload,
    }
  }
  if (action.type === `SET_SELECTED_BOOTH`) {
    return {
      ...state,
      selectedBooth: action.payload,
    }
  }
  return state
}

const initialState = {
  marketData: {},
  selectedMarket: {},
  selectedBooth: {},
}

const createStore = () =>
  reduxCreateStore(
    reducer,
    initialState
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
export default createStore
