import react,{Component} from "react";

class ClassComponent extends react.Component{
   constructor(){
      super()
     this.state={
      name:"Naresh",
      count: 0,
      isBoy:true,
      isGirl:false,
     
     }
     console.log("I am from Constructor")
   }
    handleName =()=>{
      this.setState({
         count:this.state.count+1
      })
    } 

    componentDidMount(){
      console.log("I am from componentDidMount")
    }
    componentDidUpdate(){
      console.log("I am from componentDidUpdate")
    }
   render(){
      console.log("I am from render")
      // if(this.state.isBoy){
      //    return <div>This is boy</div>
      // }else if(this.state.isGirl){
      //    return <div>This is Girl</div>
      // }else{
      //    return <div>Condition Not match</div>
      // }
      return(
         <div>
            {this.state.isBoy && <div>This is boy</div>  }
{this.state.count}
<button onClick={this.handleName}>Change count</button>
         </div>
      )
   }

      
   
}
export default ClassComponent