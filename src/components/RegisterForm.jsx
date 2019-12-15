import React, { Component } from 'react'
import axios from 'axios'
import {Form, Input, Row, Col, Button, Select, InputNumber, Alert} from 'antd';
const { Option } = Select;

export default class RegisterForm extends Component {

  state = {
    confirmDirty: false,
    confirmUserCreate: false
  }

  createUser = async (info) => {
    try {
      const res = await axios.post('http://localhost:5000/users',info)
      localStorage.setItem('Token',res.data.token)
      this.setState({confirmUserCreate: true})
    } catch(err){
      console.log("el error es:", err)
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        delete values.confirm
        this.createUser(values)
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  };

  closeAlert = () => {
    this.setState({confirmUserCreate: false})
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const {confirmUserCreate} = this.state
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return(
      <Row>
        { confirmUserCreate ? <Alert message="Success your account was created with success 👍🏻" 
                      type="success" 
                      showIcon 
                      closeText="❌"
                      onClose={ this.closeAlert }
                /> : null }
        <br/>
        <br/>
        <br/>

      <Col span={12}>
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        
      <Form.Item label="Rut">
          {getFieldDecorator('rut', {
            rules: [
              {
                message: 'The input is not valid for Rut ',
              },
              {
                required: true,
                message: 'Please input your Rut or Dni',
              }
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Name">
          {getFieldDecorator('name', {
            rules: [
              {
                message: 'The input is not valid for Name ',
              },
              {
                required: true,
                message: 'Please input your Name',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Last Name">
          {getFieldDecorator('lastName', {
            rules: [
              {
                message: 'The input is not valid for Last Name ',
              },
              {
                required: true,
                message: 'Please input your Last Name',
              },
            ],
          })(<Input />)}
        </Form.Item>

        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Gender">
          {getFieldDecorator('gender', {
            rules: [{ required: true, message: 'Please select your gender!' }],
          })(
            <Select
              placeholder="Select a option of Gender"
              onChange={this.handleSelectChange}
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>,
          )}
        </Form.Item>

        <Form.Item label="Nº College Medical">
          {getFieldDecorator('nCollegeMedical', {
            rules: [
              {
                required: true,
                message: 'Please input your Nº College Medical',
              },
            ],
          })(<InputNumber min={0} max={9999999} />)}
        </Form.Item>

        <Form.Item label="Profession">
          {getFieldDecorator('profession', {
            rules: [
              {
                message: 'The input is not valid for Profession ',
              },
              {
                required: true,
                message: 'Please input your Profession',
              },
            ],
          })(<Input/>)}
        </Form.Item>

        

        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
           You have an account <a href="/">Log In</a>
        </Form.Item>
      </Form>
      </Col>
      <Col span={10} offset={2}>
        <img src={process.env.PUBLIC_URL + '/images/img1.png'} alt="" width="600px" height="700px"/>
      </Col>
    </Row>
    
    )
  }
}

RegisterForm = Form.create({})(RegisterForm)