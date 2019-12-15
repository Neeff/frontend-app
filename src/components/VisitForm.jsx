import React, {Component} from 'react'
import {Form, Icon, Tag, Input, DatePicker, Select, Button, } from 'antd'
import moment from 'moment'
const { TextArea } = Input;


const medicines = []

export default class VisitForm extends Component{
  
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
    //this.props.errorsForm(Object.keys(err).length)
      if (!err) {
        // envia la infomacion al componente padre en este caso dashboard
        // esto sucede cuando no hay errores en el form 
        this.props.dataForm(values, true)
        console.log('Received values of form: ', values);
        this.props.form.resetFields()
      }
    })
  }



  render(){
    const { getFieldDecorator } = this.props.form
    return(
      <div>
        <Tag color="magenta"> Visit Data <Icon type="medicine-box" /></Tag>
        <Form onSubmit={this.handleSubmit}>
        
          <Form.Item label="Doctor Name">
            {getFieldDecorator('doctorName', {
              rules: [
                {
                  message: 'The input is not valid for Doctor Name ',
                },
                {
                  required: true,
                  message: 'Please input Doctor Name',
                }
              ],
            })(<Input />)}
          </Form.Item>

          <Form.Item label="Date">
            {getFieldDecorator('date', {
              initialValue: moment(),
              rules: [
                {
                  required: true,
                  message: 'Please input Date!',
                }
              ],
            })(<DatePicker disabled />)}
          </Form.Item>

          <Form.Item label="Cause">
            {getFieldDecorator('cause', {
              rules: [
                {
                  required: true,
                  message: 'Please input Cause',
                }
              ],
            })(<Input />)}
          </Form.Item>

          <Form.Item label="Observations">
            {getFieldDecorator('observations', {
              rules: [
                {
                  required: true,
                  message: 'Please input Observation',
                }
              ],
            })( <TextArea
              placeholder="Enter Cause for Visit "
              autoSize={{ minRows: 2, maxRows: 6 }}
            />)}
          </Form.Item>

          <Form.Item label="Medicines">
            {getFieldDecorator('nameMedicines', {
              rules: [
                {
                  required: false,
                }
              ],
            })( <Select mode="tags" style={{ width: '100%' }} placeholder="Medicines">
            {medicines}
          </Select>)}
          </Form.Item>

            <Button htmlType="submit">Verify</Button>


        </Form>
      </div>
    )
  }
}

VisitForm = Form.create({})(VisitForm)