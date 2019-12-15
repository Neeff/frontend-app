//modificar la api para que no acepte el medicalForeCast
import React, {Component} from 'react'
import {Form, Select, Tag, Icon, Button} from 'antd'
const { Option } = Select

const healtInsurances = ['Fonasa', 'Isapre']

const healthCareAgreement = {
  "Fonasa": ['A', 'B', 'C', 'D'],
  "Isapre": ['Banmédica', 'Consalud', 'Colmena', 'CruzBlanca', ' Nueva Masvida', 'Vida Tres',
              'Chuquicamata', 'Fundación BancoEstado', 'Fusat', 'Ríoblanco', 'SanLorenzo', 'Cruz del Norte'
            ]

}

export default class HealtServiceForm extends Component{

  state = {
    healthCareAgreements: healthCareAgreement[healtInsurances[0]],
    secondhealthCareAgreement: healthCareAgreement[healtInsurances[0]][0]
  };


  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
    //this.props.errorsForm(Object.keys(err).length)
      if (!err) {
        // envia la infomacion al componente padre en este caso MedicalRecord
        // esto sucede cuando no hay errores en el form 
        this.props.dataForm(values, true)
        console.log('Received values of form: ', values);
      }
    })
  }


  handleHealtInsuranceChange = value => {
    console.log(value)
    this.setState({
      healthCareAgreements: healthCareAgreement[value],
      secondhealthCareAgreement: healthCareAgreement[value][0],
    })
  }

  onSecondHealthCareAgreementChange = value => {
    this.setState({
      secondhealthCareAgreement: value,
    });
  };

  render(){
    const { getFieldDecorator } = this.props.form;
    const {healthCareAgreements} = this.state
    return(
      <div>
          <Tag color="magenta">Healt Services <Icon type="medicine-box" /></Tag>
        <Form onSubmit={this.handleSubmit}>

          <Form.Item label="Healt Insurance">
          {getFieldDecorator('healtInsurance', {
            rules: [{ required: true, message: 'Please select Healt Insurance!' }],
            initialValue: healtInsurances[0]
          })(
            <Select
            onChange={this.handleHealtInsuranceChange}
        >
          {healtInsurances.map( healtInsurance => (
            <Option key={healtInsurance}>{healtInsurance}</Option>
          ))}
        </Select>
          )}
        </Form.Item>

        <Form.Item label="Health CareAgreement">
          {getFieldDecorator('healthCareAgreement', {
            rules: [{ required: true, message: 'Please select Health Care Agreement' }],
            initialValue: this.state.secondhealthCareAgreement
          })(
            <Select
           
            onChange={this.onSecondHealthCareAgreementChange}
        >
           {healthCareAgreements.map(healtCare => (
            <Option key={healtCare}>{healtCare}</Option>
          ))}
        </Select>
          )}
        </Form.Item>

          <Button htmlType="submit">Verify</Button>
          </Form>
      </div>
    )
  }
}

HealtServiceForm = Form.create({})(HealtServiceForm)