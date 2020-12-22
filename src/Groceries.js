import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { createGrocery, updateGrocery } from './store';

//jsx part 
const _Groceries = ({ groceries, view, toggle, create })=> {
  return (
    <div>
      <button onClick={ create }>Create</button>
      <ul>
        {
          groceries.filter(grocery => !view || ( grocery.purchased && view === 'purchased') ||( !grocery.purchased && view === 'needs') ).map( grocery => {
            return (
              <li onClick={ ()=> toggle(grocery)} key={ grocery.id } className={ grocery.purchased ? 'purchased': ''}>{ grocery.name }</li>
            );
          })
        }
      </ul>
    </div>
  );
};

//allows us to change store 
const mapDispatchToProps = (dispatch)=> {
  return {
    toggle: async(grocery)=>{
      const updated = (await axios.put(`/api/groceries/${grocery.id}`, { purchased: !grocery.purchased })).data;
      dispatch(updateGrocery(updated));

    }, 
    create: async()=>{
      const grocery = (await axios.post('/api/groceries/random')).data;
      dispatch(createGrocery(grocery));

    } 
  };
};

//of so the react-redux allows us to connect to components the store directly 
const Groceries = connect(state => state, mapDispatchToProps)(_Groceries);

export default Groceries;
