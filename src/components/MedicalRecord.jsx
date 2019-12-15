import React,{ Component } from 'react' 
import VisitForm from './VisitForm'
import HealtServiceForm from './HealtServiceForm'
import { Empty, Form, Input, Button, Tag, Icon} from 'antd'


export default class MedicalRecord extends Component {
  constructor(props){
    super(props)
    this.state = {
      renderArchetypeVisit: false,
      renderArchetypeHealtService: false,
      dataFromHealtServiceComponent: false,
      dataFromVisitComponent: false,
      healtDataForm: {},
      visitDataForm: {}
      }

    this.handleHealtDataForm = this.handleHealtDataForm.bind(this)
    this.handleVisitDataForm = this.handleVisitDataForm.bind(this)
  }




    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        const { dataFromForms } = this.props
        const { dataFromVisitComponent, dataFromHealtServiceComponent } = this.state
        console.log('aqui', !err, dataFromVisitComponent, dataFromHealtServiceComponent)
        if (!err && dataFromHealtServiceComponent) {
          // envia la infomacion al componente padre en este caso MedicalRecord
          // esto sucede cuando no hay errores en el form 
          const { healtDataForm, visitDataForm } = this.state
          dataFromForms(healtDataForm, visitDataForm, values, true)
          console.log('Received values of form: ', values);
        }
      })
    }

  handleHealtDataForm = (value, b) => {
    this.setState({healtDataForm: value, dataFromHealtServiceComponent:  b})
  }

  handleVisitDataForm = (value, b) => {
    this.setState({visitDataForm: value, dataFromVisitComponent: b})
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


  render(){
    const {renderArchetypeHealtService, renderArchetypeVisit } = this.state
    const { getFieldDecorator } = this.props.form
    return(


      <div className="droppable" onDragOver={(e)=> this.onDragOver(e)} onDrop={(e) =>this.onDrop(e)}>
        <Tag color="magenta">Core Data Person <Icon type="medicine-box" /></Tag>
        <Form onSubmit={this.handleSubmit} >
          <br/>
        <Button htmlType="submit" type="primary" block>Verify all Forms</Button>
        <Form.Item label="Identification Number">
          {getFieldDecorator('identificationNumber', {
            rules: [{ required: true, message: 'Please input your Identification Number!' }],
          })(
            <Input
              placeholder="Identification Number"
            />,
          )}
        </Form.Item>
        <Form.Item label="Name">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your name' }],
          })(
            <Input
              placeholder="Name"
            />,
          )}
        </Form.Item>

        <Form.Item label="Last Name">
          {getFieldDecorator('lastName', {
            rules: [{ required: true, message: 'Please input Last Name' }],
          })(
            <Input
              placeholder="Last Name"
            />,
          )}
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
                message: 'Please input E-mail!',
              },
            ],
          })(<Input />)}
        </Form.Item>
      </Form>
          { renderArchetypeHealtService ? <HealtServiceForm  dataForm={this.handleHealtDataForm} /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
          { renderArchetypeVisit ? <VisitForm dataForm={this.handleVisitDataForm} /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      </div>
    )
  }
}

MedicalRecord = Form.create({})(MedicalRecord)