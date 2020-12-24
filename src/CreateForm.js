import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createGrocery } from './store';

//a react form 
class CreateForm extends Component{
  constructor(){
    super();
    this.state = {
      name: ''
    };
  }
  render(){
    const { name } = this.state;
    return (
      <form>
        <input value={ name } onChange={ ev => this.setState({ name: ev.target.value})}/>
        <button onClick={()=> this.props.create(this.state.name)}>Create</button>
      </form>
    );
  }
}

//the famous match to dispatch to props method
const mapDispatchToProps = (dispatch)=> {
  return {
    create: (name)=> {
      dispatch(createGrocery(name));
    }
  };
}


//hmmm so we are already connected and now in a slightly nicer way 
export default connect(null, mapDispatchToProps)(CreateForm);
