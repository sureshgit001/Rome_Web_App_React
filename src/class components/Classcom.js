import React,{Component} from "react";

class Classcom extends Component{
   constructor(){
      console.log('Constructor')
      super();
      this.state={
         name:'suresh',
         count:0
      }
   }

   HandleCount=()=>{
      setInterval(()=>{
         this.setState({
            count:this.state.count+1
         }

         )
      },1000)
   }

   componentDidMount(){
      console.log('componentDid');
   }
   componentDidUpdate(){
      console.log('componentDidUpdate')
   }
  
   render(){
      console.log('render')
      return(
         <>
         <h1>{this.state.count}</h1>
         <button onClick={this.HandleCount}>Count</button>
         </>
      )
   }
}
export default Classcom;
