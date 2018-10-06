import { createStore as reduxCreateStore } from 'redux'

const reducer = (state, action) => {
  console.log(action)
  if (action.type === `SET_MARKET_DATA`) {
    return {
      ...state,
      marketData: action.payload,
    }
  }
  if (action.type === `SET_ALL_BOOTHS`) {
    return {
      ...state,
      allBooths: action.payload,
    }
  }
  if (action.type === `SET_ALL_MARKETS`) {
    return {
      ...state,
      allMarkets: action.payload,
    }
  }
  if (action.type === `SET_FILTER_DATA`) {
    return {
      ...state,
      filterData: action.payload,
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
  if (action.type === `SET_VIEWPORT`) {
    return {
      ...state,
      viewport: action.payload,
    }
  }
  return state
}

const initialState = {
  allMarkets: [],
  allBooths: [],
  filterData: [],
  selectedMarket: {},
  selectedBooth: {},
  viewport: {
    latitude: 51.962268,
    longitude: 7.625788,
    zoom: 15,
    bearing: 0,
    pitch: 0,
  },
}

const createStore = () =>
  reduxCreateStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
export default createStore
