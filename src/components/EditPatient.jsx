import React, { Component } from 'react'
import { Form,Input, DatePicker, Select, InputNumber, Button, Tag, Icon, Col, Row} from 'antd'
import { Divider } from 'antd'
import moment from 'moment'
const { Option } = Select

let allergies = []
const dateFormat = 'YYYY/MM/DD';
const regions = [ 'Arica y Parinacota',
                  'Tarapacá',
                  'Antofagasta',
                  'Atacama',
                  'Coquimbo',
                  'Valparaíso',
                  'Región del Libertador Gral. Bernardo O’Higgins',
                  'Región del Maule',
                  'Región del Biobío',
                  'Región de la Araucanía',
                  'Región de Los Ríos',
                  'Región de Los Lagos',
                  'Región Aisén del Gral. Carlos Ibáñez del Campo',
                  'Región de Magallanes y de la AntárVca Chilena',
                  'Región Metropolitana de Santiago']

const cityData = {
  "Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
  "Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
  "Antofagasta": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"],
  "Atacama": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"],
  "Coquimbo": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
  "Valparaíso": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"],
  "Región del Libertador Gral. Bernardo O’Higgins": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"],
  "Región del Maule": ["Talca", "ConsVtución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "ReVro", "San Javier", "Villa Alegre", "Yerbas Buenas"],
  "Región del Biobío": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío", "Chillán", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "Chillán Viejo", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"],
  "Región de la Araucanía": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"],
  "Región de Los Ríos": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"],
  "Región de Los Lagos": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "FruVllar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"],
  "Región Aisén del Gral. Carlos Ibáñez del Campo": ["Coihaique", "Lago Verde", "Aisén", "Cisnes", "Guaitecas", "Cochrane", "O’Higgins", "Tortel", "Chile Chico", "Río Ibáñez"],
  "Región de Magallanes y de la AntárVca Chilena": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos (Ex Navarino)", "AntárVca", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"],
  "Región Metropolitana de Santiago": ["Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "TilVl", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"]

}

const healtInsurances = ['Fonasa', 'Isapre']

const healthCareAgreement = {
  "Fonasa": ['A', 'B', 'C', 'D'],
  "Isapre": ['Banmédica', 'Consalud', 'Colmena', 'CruzBlanca', ' Nueva Masvida', 'Vida Tres',
              'Chuquicamata', 'Fundación BancoEstado', 'Fusat', 'Ríoblanco', 'SanLorenzo', 'Cruz del Norte'
            ]
          }

export default class EditPatient extends Component {
  constructor(props){
    super(props)
    

   this.state = {
      cities: cityData[regions[0]],
      secondCity: cityData[regions[0]][0],
      healthCareAgreements: healthCareAgreement[healtInsurances[0]],
      secondhealthCareAgreement: healthCareAgreement[healtInsurances[0]][0]
    };

  }
  
  handleRegionChange = value => {
    console.log(value)
    this.setState({
      cities: cityData[value],
      secondCity: cityData[value][0],
    });
  };

  onSecondCityChange = value => {
    this.setState({
      secondCity: value,
    });
  };

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

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
    const { dataForm } = this.props
      if (!err) {
        // envia la infomacion al componente padre en este caso dashboard
        // esto sucede cuando no hay errores en el form 
        dataForm(values, true)
        console.log('Received values of form: ', values);
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const { data } = this.props
    const { cities } = this.state;
    const { healthCareAgreements } = this.state
    const configBirthDate = {
      initialValue: moment(this.props.data.ficha.userDetails.birthData,dateFormat),
      rules: [{ type: 'object', required: true, message: 'Please select Birth day!🎂' }],
    };
    console.log(data.ficha)
    return(
      <div>
        
        <br/>
        <Form onSubmit={this.handleSubmit} >
        <Button htmlType="submit" type="primary">Verify</Button>
        <br/>
              <Col span={8}>
                <br/>
                <Tag color="magenta">Core Data Patient</Tag>
                <Form.Item label="Identification Number">
                      {getFieldDecorator('identificationNumber', {
                        initialValue: data.ficha.identificationNumber,
                       
                        rules: [{ required: true, message: 'Please input your Identification Number!' }],
                      })(
                        <Input
                          placeholder="Identification Number"
                          disabled
                        />,
                      )}
                    </Form.Item>
                    <Form.Item label="Name">
                      {getFieldDecorator('name', {
                        initialValue: data.ficha.name,
                        rules: [{ required: true, message: 'Please input your name' }],
                      })(
                        <Input
                          placeholder="Name"
                        />,
                      )}
                    </Form.Item>

                    <Form.Item label="Last Name">
                      {getFieldDecorator('lastName', {
                        initialValue: data.ficha.lastName,
                        rules: [{ required: true, message: 'Please input Last Name' }],
                      })(
                        <Input
                          placeholder="Last Name"
                        />,
                      )}
                    </Form.Item>
                    <Form.Item label="E-mail">
                      {getFieldDecorator('email', {
                        initialValue: data.ficha.email,
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

              </Col>
              <Col span={8} offset={1}>
                <br/>
              <Tag color="magenta">Details Patient</Tag>

                  <Form.Item label="Address">
                {getFieldDecorator('address', {
                  initialValue: this.props.data.ficha.userDetails.address,
                  rules: [
                    {
                      message: 'The input is not valid for Address ',
                    },
                    {
                      required: true,
                      message: 'Please input Address 🏠',
                    }
                  ],
                })(<Input />)}
              </Form.Item>

              <Form.Item label="Birth Date">
              {getFieldDecorator('birthData', configBirthDate)(<DatePicker />)}
            </Form.Item>

            <Form.Item label="Deat Date">
              {getFieldDecorator('deathData', {rules: [{required: false}]})(<DatePicker />)}
            </Form.Item>

            <Form.Item label="Gender">
              {getFieldDecorator('gender', {
                initialValue: this.props.data.ficha.userDetails.gender,
                rules: [{ required: true, message: 'Please select your gender!' }],
              })(
                <Select
                  placeholder="Select a option of Gender"
                  onChange={this.handleSelectChange}
                >
                  <Option value="Male">Male <span>♂</span> </Option>
                  <Option value="Female">Female <span>♀</span> </Option>
                </Select>,
              )}
            </Form.Item>
            </Col>
            <Col span={6} offset={1}>
              <br/>
              <br/>

            <Form.Item label="Blood Type">
              {getFieldDecorator('bloodType', {
                initialValue: this.props.data.ficha.userDetails.bloodType,
                rules: [{ required: true, message: 'Please select Blood Type!🩸' }],
              })(
                <Select
                  placeholder="Select a option of Gender"
                  onChange={this.handleSelectChange}
                  disabled
                >
                  <Option value="A+"><span role="img" arial-label= "A+">🅰️+</span></Option>
                  <Option value="A-"><span role="img" arial-label= "A-">🅰️-</span></Option>
                  <Option value="B+"><span role="img" arial-label= "B+">🅱️+</span></Option>
                  <Option value="B-"><span role="img" arial-label= "B-">🅱️-</span></Option>
                  <Option value="AB+"><span role="img" arial-label= "AB+">🆎 +</span></Option>
                  <Option value="AB-"><span role="img" arial-label= "AB-">🆎-</span></Option>
                  <Option value="O+"><span role="img" arial-label= "O+">🅾️+</span></Option>
                  <Option value="O-"><span role="img" arial-label= "O-">🅾️-</span></Option>
                </Select>,
              )}
            </Form.Item>

            <Form.Item label="Heigth">
                {getFieldDecorator('heigth', {
                  initialValue: this.props.data.ficha.userDetails.heigth,
                  rules: [
                    {
                      required: true,
                      message: 'Please input your Heigth',
                    }
                  ],
                })(<InputNumber min={0} max={5} step={0.1} />)}
              </Form.Item>

              <Form.Item label="Weigth">
                {getFieldDecorator('weigth', {
                  initialValue: this.props.data.ficha.userDetails.weigth,
                  rules: [
                    {
                      required: true,
                      message: 'Please input your Weigth',
                    }
                  ],
                })(<InputNumber min={0} max={500} step={0.1} />)}
              </Form.Item>

              <Form.Item label="Legal Representative">
                {getFieldDecorator('legalRepresentative', {
                  initialValue: this.props.data.ficha.userDetails.legalRepresentative,
                  rules: [
                    {
                      message: 'The input is not valid for Legal Representative ',
                    },
                    {
                      required: true,
                      message: 'Please input your Legal Representative',
                    }
                  ],
                })(<Input />)}
              </Form.Item>
              </Col>
              <Divider />
                <Col  span={8}>
                  <br/>
                <Form.Item label="Ocuppation">
                {getFieldDecorator('occupation', {
                  initialValue: this.props.data.ficha.userDetails.occupation,
                  rules: [
                    {
                      message: 'The input is not valid for Legal Occupation ',
                    },
                    {
                      required: true,
                      message: 'Please input Occupation',
                    }
                  ],
                })(<Input />)}
              </Form.Item>
              
              <Form.Item label="Allergies">
                {getFieldDecorator('allergies', {
                  initialValue: this.props.data.ficha.userDetails.allergies,
                  rules: [
                    {
                      required: false
                    }
                  ],
                })(<Select mode="tags" style={{ width: '100%' }} placeholder="Allergies">
                {allergies}
              </Select>)}
              </Form.Item>

              <Form.Item label="Marital Status">
              {getFieldDecorator('maritalStatus', {
                initialValue: this.props.data.ficha.userDetails.maritalStatus,
                rules: [{ required: true, message: 'Please select your Status!' }],
              })(
                <Select
                  placeholder="Select a option of Marital Status"
                  onChange={this.handleSelectChange}
                >
                  <Option value="Single">Single</Option>
                  <Option value="Married">Married</Option>
                  <Option value="Divorced">Divorced - Divorcee</Option>
                </Select>,
              )}
            </Form.Item>


            <Form.Item label="Region">
              {getFieldDecorator('region', {
                initialValue: this.props.data.ficha.userDetails.region,
                rules: [{ required: true, message: 'Please select region!' }],
                initialValue: regions[0]
              })(
                <Select
                onChange={this.handleRegionChange}
            >
              {regions.map(region => (
                <Option key={region}>{region}</Option>
              ))}
            </Select>
              )}
            </Form.Item>

            <Form.Item label="City">
              {getFieldDecorator('city', {
                initialValue: this.props.data.ficha.userDetails.city,
                rules: [{ required: true, message: 'Please select City!' }],
                initialValue: this.state.secondCity
              })(
                <Select
              
                onChange={this.onSecondCityChange}
            >
              {cities.map(city => (
                <Option key={city}>{city}</Option>
              ))}
            </Select>
              )}
            </Form.Item>
                </Col>

            <Col span={8} offset={1}>
            <Tag color="magenta">Healt Services Patient</Tag>
            <Form.Item label="Healt Insurance">
          {getFieldDecorator('healtInsurance', {
            initialValue: this.props.data.ficha.healtService.healtInsurance,
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
            initialValue: this.props.data.ficha.healtService.healthCareAgreement,
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
            </Col>
             </Form> 
      </div>
    )
  }
}

EditPatient = Form.create({})(EditPatient)