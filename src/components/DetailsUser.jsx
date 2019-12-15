import React, { Component } from 'react'
import { Tabs, Row, Col, Button, Icon, Empty, Descriptions, List, Tag, Modal } from 'antd'
import axios from 'axios'
import { Card, Alert } from 'antd'
import Archetype from './Archetype'
import ZoneDrop from './ZoneDrop'
import _ from 'lodash'
import EditPatient from './EditPatient'
const { TabPane } = Tabs


export default class DetailsUser extends Component {
  constructor(props){
    super(props) 
    const { detailsPatient } = this.props
    this.state = { 
      modalVisible: false,
      detailVisit: {},
      dataFromZoneDrop: false,
      dataFromEditPatient: false,
      detailsPatient: detailsPatient,
      visits: detailsPatient.ficha.visits,
      dataUpdatedFromEditPatient: {},
      showAlert: false

      
    }

  }
  

  showModal = ()=> {
    
    this.setState({
      modalVisible: true
    })
  }

  handleOk = e => {
    console.log(e);
    this.setState({
      modalVisible: false,
      detailVisit: {}
    })
  }

  handleCancel = e => {
    
    this.setState({
      modalVisible: false
    })
  }


  setDetailsVisit = (dateVisit) => {
    const { visits } = this.state
    const detailVisit = _.find(visits, o => o.date === dateVisit)
    this.setState({detailVisit: detailVisit})
  }

  returnToDashboard = () => {
    const { returnToDashboard } = this.props
    returnToDashboard({}, false)
  }

  handleDataFromZoneDrop = async (visitDataForm) => {
    const newArray = this.state.visits
    newArray.push(visitDataForm)
    this.setState({visits: newArray, dataFromZoneDrop: true})
    const {detailsPatient } = this.state
    const data = {
      identificationNumber: detailsPatient.ficha.identificationNumber,
      newValues: detailsPatient
    }
    try {
      const res = await axios.patch('http://localhost:5000/update_ficha', data)
      console.log('info desde la api', res.data)

    }catch(error){
      console.log('error', error)
    }
  }

  handleDataFromEditPatient = (data, b) => {
    this.setState({dataUpdatedFromEditPatient: data, dataFromEditPatient: b})
    
  }

  handleAlert = () => {
    this.setState({dataFromZoneDrop: false, showAlert: false})
  }

  updatePatient = async () => {
    const { dataUpdatedFromEditPatient, visits} = this.state 
    const ficha = {
      ficha: {
        identificationNumber: dataUpdatedFromEditPatient.identificationNumber,
        name: dataUpdatedFromEditPatient.name,
        lastName: dataUpdatedFromEditPatient.lastName,
        email: dataUpdatedFromEditPatient.email,
        userDetails: {
          address: dataUpdatedFromEditPatient.address,
          birthData: dataUpdatedFromEditPatient.birthData,
          deathData: dataUpdatedFromEditPatient.deathData,
          gender:    dataUpdatedFromEditPatient.gender,
          bloodType: dataUpdatedFromEditPatient.bloodType,
          heigth: dataUpdatedFromEditPatient.heigth,
          weigth: dataUpdatedFromEditPatient.weigth,
          legalRepresentative: dataUpdatedFromEditPatient.legalRepresentative,
          occupation: dataUpdatedFromEditPatient.occupation,
          allergies: dataUpdatedFromEditPatient.allergies,
          maritalStatus: dataUpdatedFromEditPatient.maritalStatus,
          region: dataUpdatedFromEditPatient.region,
          city: dataUpdatedFromEditPatient.city

        },
        visits: visits,
        healtService: {
          healtInsurance: dataUpdatedFromEditPatient.healtInsurance,
          healthCareAgreement: dataUpdatedFromEditPatient.healthCareAgreement
        }


      }
    }
    console.log('ficha para actualizar', ficha)
    const data = {
      identificationNumber: dataUpdatedFromEditPatient.identificationNumber,
      newValues: ficha
    }
    try {
      const res = await axios.patch('http://localhost:5000/update_ficha', data)
      console.log('info de la api ', res)
      this.setState({detailsPatient: res.data, visits: res.data.ficha.visits, dataFromEditPatient: false, showAlert: true})

    }catch(error){
      console.log('error', error)

    }
    
  }
  
  render(){
    console.log(this.state)
    const { detailsPatient, dataFromEditPatient, showAlert } = this.state
    const visits  = detailsPatient.ficha.visits
    const allergies = detailsPatient.ficha.userDetails.allergies
    const { detailVisit, dataFromZoneDrop } = this.state 
    const renderVisits = visits.map((visit) => 
      <div key={visit.date}>
        <Tag onClick={ 
          () => {
            this.showModal()
            this.setDetailsVisit(visit.date)
          }
      } color="#87d068" > view Visit  </Tag>                                          
      </div>
    )
  
  
    return(
    <div>
      <Button onClick={this.returnToDashboard}>
          <Icon type="left"/>
            back
          </Button>

       <Row > 
        <Col span={20} offset={2}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Patient Info" key="1">
    
              <Descriptions title="Patient Info" layout="vertical" bordered size="small"  >
                <Descriptions.Item label="Identification Number"> 
                  { detailsPatient.ficha.identificationNumber }
                </Descriptions.Item>
                <Descriptions.Item label="Name">
                  { detailsPatient.ficha.name }
                </Descriptions.Item>
                <Descriptions.Item label="Last Name">
                  { detailsPatient.ficha.lastName}
                </Descriptions.Item>
                <Descriptions.Item label="Email 📧">
                  { detailsPatient.ficha.email}
                </Descriptions.Item>
                <Descriptions.Item label="Healt Insurance">
                  { detailsPatient.ficha.healtService.healtInsurance}
                </Descriptions.Item>
                <Descriptions.Item label="Healt Care Agreement">
                  { detailsPatient.ficha.healtService.healthCareAgreement}
                </Descriptions.Item>
                <Descriptions.Item label="Address 🏠">
                  { detailsPatient.ficha.userDetails.address }
                </Descriptions.Item>
                <Descriptions.Item label="Birth Date 🎂">
                  { detailsPatient.ficha.userDetails.birthData }
                </Descriptions.Item>
                <Descriptions.Item label="Gender ♂♀">
                  { detailsPatient.ficha.userDetails.gender }
                </Descriptions.Item>
                <Descriptions.Item label="Death Data ⚰️"> 
                  { detailsPatient.ficha.userDetails.deathData ? detailsPatient.ficha.userDetails.deathData : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> }
                </Descriptions.Item>
                <Descriptions.Item label="Blood Type 🩸">
                  { detailsPatient.ficha.userDetails.bloodType }
                </Descriptions.Item>
                <Descriptions.Item label="Heigth">
                  { detailsPatient.ficha.userDetails.heigth }
                </Descriptions.Item>
                <Descriptions.Item label="Weigth">
                  { detailsPatient.ficha.userDetails.weigth}
                </Descriptions.Item>
                <Descriptions.Item label="Legal Representative">
                  { detailsPatient.ficha.userDetails.legalRepresentative}
                </Descriptions.Item>
                <Descriptions.Item label="Ocuppation">
                  { detailsPatient.ficha.userDetails.occupation }
                </Descriptions.Item>
                <Descriptions.Item label="Allergies 🦠" span={1}>
                  <List
                    size="small"
                    dataSource={allergies}
                    renderItem={allergie => <List.Item> <Tag color="blue">{allergie}</Tag></List.Item>}
                  />
                  </Descriptions.Item>
                <Descriptions.Item label="Marital Status 👫 ">
                  { detailsPatient.ficha.userDetails.maritalStatus}
                </Descriptions.Item>
                <Descriptions.Item label="City 🏙">
                  { detailsPatient.ficha.userDetails.city}
                </Descriptions.Item>
                <Descriptions.Item label="Region 🌎" span={3}>
                  { detailsPatient.ficha.userDetails.region }
                </Descriptions.Item>
                  { _.isEmpty(visits[0]) ? <Descriptions.Item label="Visits Patient ">
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></              Descriptions.Item>
                                         : 
                                        
                                         <Descriptions.Item label="Visits Patient ">
                                           {renderVisits}
                                         </Descriptions.Item> 
                                          }
                </Descriptions>
            </TabPane>
            <TabPane tab="Edit Patient" key="2">
            {showAlert ? <Alert
                                    message="Record Update with succefully"
                                    description="The information is already persistent in bd"
                                    type="success"
                                    showIcon
                                    closeText="Close Now"
                                    onClose={this.handleAlert}
                                  /> : null}
            {dataFromEditPatient ? <Button type="primary" onClick={this.updatePatient}> Update Patient</Button> : null}
            <EditPatient data={ this.state.detailsPatient } dataForm={this.handleDataFromEditPatient}/>

              
            </TabPane>
            <TabPane tab="Add Visit" key="3"> 
            { dataFromZoneDrop ?  <Alert
                                    message="Data Received with succefuly"
                                    description="The information is already persistent"
                                    type="success"
                                    showIcon
                                    closeText="Close Now"
                                    onClose={this.handleAlert}
                                  /> : null}
            <br/>      
                <Col span={6} offset={0}>
                    <Card title="Archetypes" bordered={true}>
                    <Archetype name="Archetype Visit"/>
                    </Card>

                  </Col>

    
                <Col span={8} offset={6} >
                  <Card title="Add Visit" bordered={true}>
                      <ZoneDrop sendDataToDetailsUser={this.handleDataFromZoneDrop}/>
                  </Card>
                </Col>

            </TabPane>
          </Tabs>
          </Col>
        </Row>

        <Modal
          title={ 'Details Visit with date' + ' ' + detailVisit.date }
          visible={this.state.modalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Tag color="magenta">Name Doctor 👨🏻‍⚕️👩🏻‍⚕️</Tag>
          <p> { detailVisit.doctorName } </p>
          <Tag color="magenta"> Cause 😷</Tag>
          <p> { detailVisit.cause } </p>
          <Tag color="magenta"> Observations 📒</Tag>
          <p> { detailVisit.observations} </p>
          <Tag color="magenta">Medicines 💊</Tag>
          <List
            size="small"
            bordered={true}
            dataSource={detailVisit.nameMedicines}
            renderItem={medicine => <List.Item> <Tag color="#87d068" >{medicine}</Tag> </List.Item>}
          />                           
      
        </Modal>
        
    </div>
    )
  }
}