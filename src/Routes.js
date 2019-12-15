import React,{ Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Dashboard from './components/Dashboard'
import DetailsUser from './components/DetailsUser'
import TwoFA from './components/TwoFA'




export default class Routes extends Component {
  constructor (props) {
    super (props)
    this.state = {
        is_authenticate: false,
        is_logged: false,
        flag: false,
        dataUser: {},
        detailsPatient: {},
        credentials: {},
        renderDetailsPatient: false,


    }

    this.handleLogin    = this.handleLogin.bind(this)
    this.handleUserData = this.handleUserData.bind(this)
    this.handleFlag     = this.handleFlag.bind(this)
    this.handleAuth     = this.handleAuth.bind(this)
    this.handleRenderDetailsPatient = this.handleRenderDetailsPatient.bind(this)
}

  handleLogin(verify) {
      this.setState({is_logged: verify})
  }
  handleAuth(credentials) { 
    this.setState({is_authenticate: true, credentials: credentials})
  }

  handleUserData(data){
    this.setState({ dataUser: data })
  }

  handleFlag(data){
    this.setState({is_logged: false, is_authenticate: false})
    this.setState({flag: data})
  }

  handleRenderDetailsPatient(detailsPatient, b){
    this.setState({detailsPatient: detailsPatient, renderDetailsPatient: b})

  }

  render(){ 
    const { is_logged, renderDetailsPatient, is_authenticate, credentials} = this.state
    console.log('estado de routes', this.state)
    return(
      <Switch>
        <Route exact path="/2fa-user"  render={
          () => {
            if(is_logged) {return <Redirect from="/2fa-user" to="/dashboard"/>}
            if(is_authenticate){return <TwoFA onLogin={this.handleLogin} credentials={credentials}/> }
            if(!is_authenticate){return <Redirect from="/2fa-user" to="/"/>}
          
          }
            
        }/>
        <Route exact path="/" render= { () => (
                      is_authenticate
                            ? <Redirect from="/" to="/2fa-user" />
                            : <LoginForm onLogin={this.handleAuth} dataUser={this.handleUserData}/> 
                    )}/>
        <Route exact path="/create-account" component={ RegisterForm }/>
        <Route exact path="/dashboard-user-details" render= { () => (
                        renderDetailsPatient ? <DetailsUser detailsPatient={this.state.detailsPatient} returnToDashboard={this.handleRenderDetailsPatient} 
                        /> : <Redirect to="/dashboard" from="dashboard-user-details"/>
                    )}/>
        <Route exact path="/dashboard" render={ 
          () => {
            if(!is_logged){
              return <Redirect from="/dashboard" to="/"/>
            }
            if(renderDetailsPatient) return <Redirect from="/dashboard" to="dashboard-user-details" /> 

            if(is_logged && !renderDetailsPatient){
              return <Dashboard dataUser={this.state.dataUser} onFlag={this.handleFlag} ifCreateUser={ this.handleRenderDetailsPatient} />
            }
          }
         }/>
      </Switch>
    )
  }
}