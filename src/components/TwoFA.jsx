import React, { Component } from 'react' 
import {Card, Row, Col, Divider, Typography, Input, Button, Tag, Icon} from 'antd'
import axios from 'axios'
const { Text } = Typography;

export default class TwoFA extends Component {
  constructor(props){
  super(props)
  this.state = {
    qrData: '',
    qrInputData: '',
    verified: undefined
  }
}

  UNSAFE_componentWillMount = async ()=>{
    try{
      const res = await axios.post('http://localhost:5000/users/login2fa',{rut: '1', password: '1'})
      if(res){
        this.setState({qrData: res.data})
      }

    }catch(error){
      console.log(error)
    }
  }

  handleChange = (value) => {
    //console.log(value.target.value)
    this.setState({qrInputData: value.target.value})
  }

  handleQrCode = async () =>{
    const { credentials, onLogin}  = this.props
     const rut = credentials.rut
    const password = credentials.password
    const secret = this.state.qrInputData
    try{
      const res = await axios.post('http://localhost:5000/users/login2fa/verifytoken',{rut, password, secret})
      this.setState({verified: res.data.verified})
      this.setState({qrInputData: ''})
      onLogin(res.data.verified)


    }catch(error){
      console.log('error', error)
    }
  }

  render(){
    console.log(this.state)
    return(
      <div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <Row type="flex" justify="center">
          <Col span={4}>
              <Card
              hoverable
              style={{ textAlign: 'center' }}
              >
                <Text strong>Current Qr Code</Text>
                <Divider />
                <img alt="example" src={this.state.qrData} />
                <Input size="large" 
                placeholder="QR Code" 
                onChange={this.handleChange}
                prefix={<Icon type="qrcode" 
                defaultValue={this.state.qrInputData}/>}>
              
                </Input>
              <Col span={11}> 
                <a href="">Login <Icon type="login" /></a> Or
               
              </Col>
              <Col span={12}> 
                <a href="">register now! <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" /></a>
                </Col> 
              </Card>
          </Col>
        </Row>

        <Row type="flex" justify="center" >
        <Col span={4}>
          <Button type="danger" block  onClick={this.handleQrCode}>Send Qr Code</Button>
        </Col>
        </Row>
      </div>
    )
  }
}