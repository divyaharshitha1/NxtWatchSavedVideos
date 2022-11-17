import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import {
  LoginContainer,
  ShadowContainer,
  ImageEle,
  LoginFormContainer,
  FormDivContainer,
  LabelEl,
  InputEl,
  ShowPasswordLabelEl,
  ButtonEl,
  ErrorMsg,
} from './StyledComponents'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showPassword: false,
    showErrMsg: false,
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({showPassword: true})
    } else {
      this.setState({showPassword: false})
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showPassword, showErrMsg, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <LoginContainer>
        <ShadowContainer>
          <ImageEle
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
          />
          <LoginFormContainer onSubmit={this.onSubmitForm}>
            <FormDivContainer>
              <LabelEl>USERNAME</LabelEl>
              <InputEl
                type="text"
                placeholder="Username"
                onChange={this.onChangeUsername}
                value={username}
              />
            </FormDivContainer>
            <FormDivContainer>
              <LabelEl>PASSWORD</LabelEl>
              <InputEl
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                onChange={this.onChangePassword}
                value={password}
              />
            </FormDivContainer>
            <FormDivContainer direction="row">
              <InputEl
                type="checkbox"
                id="checkbox"
                onChange={this.showPassword}
              />
              <ShowPasswordLabelEl htmlFor="checkbox">
                Show Password
              </ShowPasswordLabelEl>
            </FormDivContainer>
            <ButtonEl>Login</ButtonEl>
            {showErrMsg && (
              <ErrorMsg className="error-message">*{errorMsg}</ErrorMsg>
            )}
          </LoginFormContainer>
        </ShadowContainer>
      </LoginContainer>
    )
  }
}

export default Login
