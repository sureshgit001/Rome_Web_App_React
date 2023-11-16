import React from "react";

function Memo(props){
   console.log("I am from Memo")
   return(
      <div>
         <h1>I am From Memo - {props.name}</h1>
      </div>
   )
}
export default React.memo(Memo)