import React,{ Component } from 'react'
import axios from 'axios'
import { Button, Row, Col, Card, Alert } from 'antd'
import { Input } from 'antd'
import DetailsMedicalForm  from './DetailsMedicalForm'
import MedicalRecord from './MedicalRecord'
import Archetype from './Archetype'
import _ from 'lodash'
//import  ReactDOM from  'react-dom'

const { Search } = Input;

const gridStyle1 = {
  width: '100%',
  textAlign: 'center',
};


export default class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLogged: true,
      detailsForm: {},
      recordForm: {},
      VisitForm: {},
      HealtForm: {},
      receivedDataFromDetailsForm: false,
      receivedDataFromMedicalRecordForm: false,
      renderError: false

    }
    this.handleDetailsForm = this.handleDetailsForm.bind(this)
    this.handleDataForms = this.handleDataForms.bind(this)
  }


  handleSubmitAllData = async () => {
    
    const {recordForm,detailsForm,HealtForm, VisitForm } = this.state
    const { ifCreateUser } = this.props
    console.log(" esta vacio Visit Form?", _.isEmpty(VisitForm))
    let data = {}
    if(_.isEmpty(VisitForm)){
       data = {
        ...recordForm,
        userDetails: { ...detailsForm },
        healtService: { ...HealtForm },
        visits: [ ] 
      }
    }else {
      data = {
        ...recordForm,
        userDetails: { ...detailsForm },
        healtService: { ...HealtForm },
        visits: [ { ...VisitForm } ]
      }
      
    }


   

     try {
       const res = await axios.post('http://localhost:5000/new_ficha',data)
       console.log(res.data)
        ifCreateUser(res.data, true)
     }catch(err){
       console.log('el error es:', err)
       this.setState({showErrorAlert: true})
     }

  }

  handleDataForms = (healtDataForm, visitDataForm, values, b) => {
    this.setState({HealtForm: { ...healtDataForm }, VisitForm: { ...visitDataForm }, recordForm: {...values}, receivedDataFromMedicalRecordForm: b })
  }
  
  handleDetailsForm = (value, b) => {
    this.setState({detailsForm: value, receivedDataFromDetailsForm: b})
  }
  
  logout = async () => {
    const token = localStorage.getItem("lastTokenAuth");
    const { onFlag } = this.props
    console.log("realizando peticion")
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 
      await axios.post('http://localhost:5000/users/me/logout')
      localStorage.removeItem("lastTokenAuth");
      this.setState({isLogged: false})
      onFlag(true)
    }catch(err){
      console.log(err)
    }
}


  searchMedicalRecord = async (identificationNumber) => {
    const { ifCreateUser } = this.props
    try {
     const res =  await axios.post('http://localhost:5000/ficha',{identificationNumber})
     console.log(res)
     ifCreateUser(res.data, true)
     
    }catch(err){
      console.log(err)
      this.setState({renderError: true})
    }

  }

  onClose = () => {
    this.setState({renderError: false})
  }




  render(){
    const { receivedDataFromDetailsForm, receivedDataFromMedicalRecordForm , renderError} = this.state
    localStorage.setItem("lastTokenAuth", this.props.dataUser.token )
    return(
      <div>
        {renderError ? <Alert
                        message="Error"
                        description="The search information provided did not yield results 😕"
                        type="error"
                        showIcon
                        closeText="Close Now"
                        onClose={this.onClose}
                      /> : null}
      <Row>
        <Col span={2} offset={22}>
        <Button key="1" type="danger" onClick={this.logout}>
          Log Out
        </Button>
    </Col>
    </Row>
      <br/>
      <Row type="flex" justify="center">
      {receivedDataFromDetailsForm && receivedDataFromMedicalRecordForm ? <Col span={8}>
        <Button block type="primary" onClick={this.handleSubmitAllData}>Save Data</Button>
      </Col>  : null }
      </Row>
      <br/>
    <Row>
    <Col span={10} offset={1}>
        <Card title="Archetypes" bordered={true}>
        <Archetype name="Archetype Visit"/>
        <Archetype name="Archetype Healt Services"/>
        </Card>
      </Col>
      <Col span={8} offset={4}>
      <Search placeholder="input search text" onSearch={value => this.searchMedicalRecord(value)} enterButton  style={gridStyle1}/>
      </Col>
    </Row>
    <br/>
    <Row>
      <Col span={10} offset={1}>
        <Card title="Medical Record" bordered={true}>
          <MedicalRecord dataFromForms={this.handleDataForms}></MedicalRecord>
        </Card>
      </Col>
      <Col span={10} offset={2}>
        <Card title=" Details Medical Record" bordered={true}>
          <DetailsMedicalForm dataForm={this.handleDetailsForm}/>
        </Card>
      </Col>
    </Row>
    </div>
    )
  }
}


