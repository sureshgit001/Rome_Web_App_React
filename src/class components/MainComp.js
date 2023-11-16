import React,{Component} from "react";
import NormalComp from "./NormalComp";
import PureComp from "./PureComp";
import Memo from "./Memo";

class MainComp extends Component{
   constructor(){
      super()
      this.state={
         name:"Naresh",
         age:30
      }
   }
   componentDidMount(){
      setInterval(()=>{
         this.setState({
            name:"Naresh"
         })
      },2000)
   }
   render(){
      console.log("I am frrom Main Component")
      return(
         <div>
            <h2>Main Component</h2>
            <Memo name={this.state.name}/>
            {/* <NormalComp name={this.state.name} age={this.state.age}/>
            <PureComp name={this.state.name} age={this.state.age}/> */}
            </div>
      )
   }
}
export default MainComp