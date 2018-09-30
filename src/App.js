import React, { Component } from 'react';
import ListContacts from "./ListContacts"
import * as ContactAPI from "./utils/ContactsAPI"
import CreateContact from "./CreateContact";
import {Route} from "react-router-dom";

export default class App extends Component {
  constructor(){
    super()
    this.state ={
      screen:"list",
      contacts: []
    }
    // this.toNavigate = this.toNavigate.bind(this);
    this.onCreateContact = this.onCreateContact.bind(this)
  }
    componentDidMount(){
    ContactAPI.getAll().then((contacts)=>{
      this.setState({contacts:contacts})
    })
  }
  removeContact = (contact)=>{
    this.setState((state)=>({
      contacts: state.contacts.filter((c)=> c.id !== contact.id)
    }))
    ContactAPI.remove(contact);
  }
  // toNavigate(loc){
  //   this.setState({screen:loc})
  // }
  onCreateContact(contact){
    ContactAPI.create(contact).then(contact=>{
      let contactArray = this.state.contacts;
      contactArray.push(contact)
      this.setState({
        contacts: contactArray
      })
    })
  }
  render() {
    console.log(this.state)
    return (
      <div>
        <Route exact path="/" render={()=>(
          <ListContacts 
          onDeleteContact={this.removeContact} 
          contacts={this.state.contacts}
          toNavigate={this.toNavigate}
          />

        )}/>

          
          <Route path="/create" render={({history})=>(
            <CreateContact
              toNavigate={this.toNavigate}
              onCreateContact={(contact=>{
                this.onCreateContact(contact)
                history.push("/")
              })

              }
            />
          )}/>
      </div>
      
    )
  }
}