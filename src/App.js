import React, { Component } from 'react';
import ListContacts from "./ListContacts"
import * as ContactAPI from "./utils/ContactsAPI"
import CreateContact from "./CreateContact"

export default class App extends Component {
  constructor(){
    super()
    this.state ={
      screen:"list",
      contacts: []
    }
    this.toNavigate = this.toNavigate.bind(this);
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
  toNavigate(loc){
    this.setState({screen:loc})
  }
  onCreateContact(contact){
    ContactAPI.create(contact).then(contact=>{
      let contactArray = this.state.contacts;
      contactArray.push(contact)
      this.setState({
        contacts: contactArray,
        screen:"list"
      })
    })
  }
  render() {
    console.log(this.state)
    return (
      <div>
        {this.state.screen === "list" && (

          <ListContacts 
          onDeleteContact={this.removeContact} 
          contacts={this.state.contacts}
          toNavigate={this.toNavigate}
          />
          )}
          {this.state.screen === "create" &&(
            <CreateContact
              toNavigate={this.toNavigate}
              onCreateContact={this.onCreateContact}
            />
          )}
      </div>
      
    )
  }
}