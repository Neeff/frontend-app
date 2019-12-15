import React, {Component} from 'react'
import { Row, Col } from 'antd';
import { Form, Icon, Input, Button} from 'antd';
import { Alert } from 'antd';
import axios from 'axios' 

export default class LoginForm extends Component {

  state = {
    errorLogin: false,
    isAuth: false,
    data: undefined
  }


  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.logIn(values)

      }
    })
  }
  

  logIn = async (info) => {
    //const info = {rut: '12929282-2', password: 'pass12345'}
    try{
      const res = await axios.post('http://localhost:5000/users/login', info) 
      console.log(res.data)  
      this.setState({isAuth: true, data: res.data})
      const { onLogin, dataUser } = this.props 
      onLogin(info)
      dataUser(this.state.data)
      
  }catch(err){
      console.log('el error es:', err)
      this.setState({errorLogin: true})
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { errorLogin } = this.state
    return (
    <div>
        { errorLogin ? <Alert message="Error, User name or Password is not correct try again" 
                      type="error" 
                      showIcon 
                      closeText="❌"/> : null }
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        
      <Row type="flex" justify="center">
        <Col span={5}>
        <img src={process.env.PUBLIC_URL + '/images/img.png'} alt="" width="350px" height="200px"/>
        </Col>
      </Row>
      <br/>
      <Row  type='flex' justify='center'>
        <Col span={5}>
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('rut', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Rut"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="/create-account">register now!</a>
        </Form.Item>
      </Form>
            </Col>
      </Row>
     </div>
    );
  }

}

LoginForm = Form.create({})(LoginForm)
