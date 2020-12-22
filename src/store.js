import { createStore, combineReducers } from 'redux';
const LOAD = 'LOAD';
const UPDATE = 'UPDATE';
const CREATE = 'CREATE';
const SET_VIEW = 'SET_VIEW';

const groceriesReducer = (state = [], action)=>{
  if(action.type === LOAD){
    state = action.groceries;
  }
  if(action.type === UPDATE){
    state = state.map(grocery => grocery.id === action.grocery.id ? action.grocery : grocery );
  }
  if(action.type === CREATE){
    state = [...state, action.grocery ]
  }
  return state;
};

const viewReducer = (state = '', action)=>{
  if(action.type === SET_VIEW){
    state = action.view;
  }
  return state;
};


const reducer = combineReducers({
  groceries: groceriesReducer,
  view: viewReducer
})

const store = createStore(reducer);

const loadGroceries = (groceries) => {
  return {
    type: LOAD,
    groceries
  };
};

//cant believe this worked
const updateGrocery = (grocery) => {
  return {
    type: UPDATE,
    grocery
  };
};


const createGrocery = (grocery) => {
  return {
    type: CREATE,
    grocery
  };
};

const setView = (view) => {
  return {
    type: SET_VIEW,
    view
  };
};

export default store;
export { loadGroceries, createGrocery, updateGrocery, setView };


