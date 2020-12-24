import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import Nav from './Nav';
import store, { loadGroceries, setView } from './store';
import Groceries from './Groceries';
import CreateForm from './CreateForm';


//this was my regular app component
class _App extends Component{
  componentDidMount(){
    this.props.bootstrap();
    window.addEventListener('hashchange', ()=> {
      this.props.setView(window.location.hash.slice(1));
    })
    this.props.setView(window.location.hash.slice(1));
  }
  render(){
    return (
      <div>
        <h1>Acme Groceries</h1>
        <Nav />
        <CreateForm />
        <Groceries />
      </div>
    );
  }
}

//this is the new guy that helps me connect to the store/state
const App = connect(
  state => state,
  (dispatch)=> {
    return {
      setView: (view)=> dispatch(setView(view)), 
      bootstrap: ()=> {
        dispatch(loadGroceries());
      } 
    }
  }
)(_App);

//don't really understand need to learn it connects the app to the store but confused about the details
render(<Provider store={ store }><App /></Provider>, document.querySelector('#root'));
