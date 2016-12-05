import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import NavigationBar from './SignUpNavigationBar.ui'
import ErrorModal from './ErrorModal/ErrorModal.ui'
import Loader from './Loader/Loader.ui'
import NextButton from './NextButton/NextButton.ui'
import SkipButton from './SkipButton/SkipButton.ui'

import Username from './Username/Username.ui'
import PinNumber from './PinNumber/PinNumber.ui'
import Password from './Password/Password.ui'
import ReviewDetails from './ReviewDetails/ReviewDetails.ui'

class SignUpContainer extends Component {

  routeRenderScene = () => {
    switch(this.props.route.params.screen){
      case "home":
        this.props.navigator.pop()
      case null:
      case "username":
        return <Username />
      case "pin":
        return <PinNumber />          
      case "password":
        return <Password />
      case "review":
        return <ReviewDetails />
    }

  }

  render () {
    return (
      <View style={style.container}>
        <NavigationBar navigator={this.props.navigator}/>
        {this.routeRenderScene()}
        <SkipButton onPress={this.props.handleSkip} />
        <NextButton onPress={this.props.handleSubmit} />
        <Loader />
        <ErrorModal />
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  }

})

export default SignUpContainer
