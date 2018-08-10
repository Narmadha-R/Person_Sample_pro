import React, { Component } from 'react';

const para = (props) => {
    return(
        <div className="displayblock">
<input type="text" placeholder="Enter The Name" className="infield" delete={props.delete} name={props.name} age={props.age} onChange = {props.change}></input>
<div className="ParaColor">
<p className = "Parastyle">  I'm {props.name},I'm {props.age} years old {props.change}.
</p><span><button onClick={props.delete}>Delete</button></span>

</div>
</div>
);
}
export default para;