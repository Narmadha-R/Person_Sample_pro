import React, { Component } from 'react';
import logo from './logo.svg';
import './Style/style.css';
import Para from './Components/Para';

class App extends Component {

  constructor(){
   super();
   this.state = {
     name : [
       {id:'1234',name : "Narmadha" ,age : 25},
       {id:'5678',name : "Suganya" , age :24 },
       {id:'9012', name : "Tina" , age : 21}
     ],
     showperson : false,
     length :0
   }
   
  }
  render() {
    const style = {
      backgroundColor: 'green',
      Color:'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
     
      marginLeft : '600px'

    };
      this.toggleChange = () =>{
        const doesperson = this.state.showperson;
        this.setState({showperson : !doesperson})
          }
          
          this.handleEvent = (event,id) => {
            const nameIndex = this.state.name.findIndex(p =>{
              return p.id ===id;
              console.log(nameIndex +"+++" +id);
            })
            
          
const persons = {
              ...this.state.name[nameIndex]
            }
            persons.name = event.target.value;

            const newPerson = [...this.state.name];
            newPerson[nameIndex] = persons;
          
            const lengthval = event.target.value;
            const length1 = lengthval.length;

           this.setState({
             length : length1
            })
           
          

        }

       this.deleteEvent = (index) =>{
       const name = [...this.state.name];
       name.splice(index,1);
       this.setState({
       name : name
       })
        } 
      
        let person = null;

        if(this.state.showperson){
          person = (
     <div >
       {this.state.name.map((person,index)=> {
       return <Para  
       name = {person.name} 
       age = {person.age}
       key = {person.id}
       change ={(event) => this.handleEvent(event,person.id)}
       delete ={()=>this.deleteEvent(index)}
       />
      })}
     
     </div>
          );
          style.backgroundColor = 'red';
        }
       

     return (
      <div className="App">
             <button style= {style} onClick ={this.toggleChange} type="button">Toggle Button</button>
             {person}
      </div>
    );
  }
}

export default App;
