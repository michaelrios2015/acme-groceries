import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const LOAD = 'LOAD';
const UPDATE = 'UPDATE';
const CREATE = 'CREATE';
const SET_VIEW = 'SET_VIEW';


//yeah gotta redo more lectures
const viewReducer = (state = '', action)=>{
  if(action.type === SET_VIEW){
    state = action.view;
  }
  return state;
};

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


const reducer = combineReducers({
  groceries: groceriesReducer,
  view: viewReducer
})

const store = createStore(reducer, applyMiddleware(thunk, logger));

//tells the reducer what to do I believe 
const _loadGroceries = (groceries) => {
  return {
    type: LOAD,
    groceries
  };
};

//this is where we want all our api calls
const loadGroceries = () => {
  return async(dispatch) => {
    const groceries = (await axios.get('/api/groceries')).data;
    dispatch(_loadGroceries(groceries));
  };
};


//cant believe this worked
const _updateGrocery = (grocery) => {
  return {
    type: UPDATE,
    grocery
  };
};

const updateGrocery = (grocery) => {
  return async (dispatch) =>{
    //console.log(grocery);
    const updated = (await axios.put(`/api/groceries/${grocery.id}`, { purchased: !grocery.purchased })).data;
    dispatch(_updateGrocery(updated));
  };
};

const _createGrocery = (grocery) => {
  return {
    type: CREATE,
    grocery
  };
};

const createGroceryRandom = () => {
  return async (dispatch)=> {
    const grocery = (await axios.post('/api/groceries/random')).data;
    dispatch(_createGrocery(grocery))
  }
}

const createGrocery = (name) => {
  return async (dispatch)=> {
    const grocery = (await axios.post('/api/groceries', { name })).data;
    dispatch(_createGrocery(grocery))
  }
}

//don't see this is answer???
const setView = (view) => {
  return {
    type: SET_VIEW,
    view
  };
};

export default store;
export { loadGroceries, createGroceryRandom, createGrocery, updateGrocery, setView };


