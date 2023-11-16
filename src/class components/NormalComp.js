import React,{Component} from "react";

class NormalComp extends Component{
   render(){
      console.log("I am frrom Normal Component")
      return(
         <div>Normal Component {this.props.name}</div>
      )
   }
}
export default NormalComp