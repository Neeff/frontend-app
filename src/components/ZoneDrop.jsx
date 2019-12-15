import React, { Component } from 'react'
import { Empty, Button } from 'antd'
import VisitForm from './VisitForm'

export default class ZoneDrop extends Component {

  constructor(props){
    super(props)
    this.state = {
      renderArchetypeVisit: false, 
      visitDataForm: {},
      dataFromVisitComponent: false,
      resetValuesForm: false

    }
  }

  onDragOver(e) {
    e.preventDefault()
    console.log('elemento arrastrado sobre ficha ')
  }

  onDrop(e){
    let data =  JSON.parse(e.dataTransfer.getData("data"));
      //console.log("esta es la info", data)
      if(data === 'Archetype Visit'){
        this.setState({renderArchetypeVisit: true})
      }
      if(data === 'Archetype Healt Services'){
        this.setState({renderArchetypeHealtService: true})
      }
  }

  handleVisitDataForm = (value, b) => {
    this.setState({visitDataForm: value, dataFromVisitComponent: b})
  }

  // componentDidUpdate = () => {
  //   const { dataFromVisitComponent, visitDataForm} = this.state
  //   const { sendDataToDetailsUser } = this.props
  //   if(dataFromVisitComponent){ 
  //     sendDataToDetailsUser(visitDataForm, true)

  //   }
  //}

  handleDataToDetailsPatient = () => {
    const { visitDataForm } = this.state
    const { sendDataToDetailsUser } = this.props
    sendDataToDetailsUser(visitDataForm, true )
  }

  
  handleDataFromVisitForm = () => {
    this.setState({dataFromVisitComponent: false})
  }

  render(){
    const { renderArchetypeVisit, dataFromVisitComponent, resetValuesForm } = this.state

    console.log('estoy en el component zone drop', this.state.dataFromVisitComponent)
    return(
      <div className="droppable" onDragOver={(e)=> this.onDragOver(e)} onDrop={(e) =>this.onDrop(e)}>
        { dataFromVisitComponent ? <Button block type="primary" onClick={ () => {
          this.handleDataToDetailsPatient()
          this.handleDataFromVisitForm()
          
        }}> Send Data </Button> : null}
        <br/>
        { renderArchetypeVisit ? <VisitForm dataForm={this.handleVisitDataForm} resetValuesForm={this.state.resetValuesForm} /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}

      </div>
    )
  }


}