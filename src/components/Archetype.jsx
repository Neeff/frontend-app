import React, { Component } from 'react'
import {Card} from 'antd'

const gridStyle = {
  width: '50%',
  textAlign: 'center',
};

export default class Archetype extends Component {

  onDragStart(e, data){
    let j = JSON.stringify(data);
    e.dataTransfer.setData("data", j);

}

  render(){
    const {name} = this.props
    return(
      <div draggable className="draggable" onDragStart={(e)=>this.onDragStart(e,name)}>
          <Card.Grid style={gridStyle}>{name}</Card.Grid>
      </div>
    )
  }
}