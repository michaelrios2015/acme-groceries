import React from 'react';

import { connect } from 'react-redux';
import { createGroceryRandom, updateGrocery } from './store';

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
    toggle: (grocery)=>{
      //console.log(grocery);
      dispatch(updateGrocery(grocery));

    }, 
    create: ()=>{
      dispatch(createGroceryRandom());

    } 
  };
};

//of so the react-redux allows us to connect to components the store directly 
const Groceries = connect(state => state, mapDispatchToProps)(_Groceries);

export default Groceries;
