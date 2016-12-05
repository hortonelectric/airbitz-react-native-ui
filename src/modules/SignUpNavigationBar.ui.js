import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import PasswordValidation from './Password/PasswordValidation/PasswordValidation.ui'
import t from "../lib/LocaleStrings"
class NavigationBar extends Component {

  constructor(props) {
    super(props);
    this._handleBackPress = this._handleBackPress.bind(this);
    this._checkPasswordStateOption = this._checkPasswordStateOption.bind(this);
 
    this._checkPasswordStateStyle = this._checkPasswordStateStyle.bind(this);
  }

  static route = {
    userCacheOpen: false,
    navigationBar: {
      title: t('app_name')
    }
  };

  _handleBackPress = () => {
    this.props.navigator.pop()
  }

  _checkPasswordStateOption = () => {

    if(this.props.navigator.getCurrentRoute().key  === "createPassword" && this.props.passwordState){
      return (
        <PasswordValidation />
      )  
    }else{
      return null  
    }

  }

  _checkPasswordStateStyle = () => {

    if(this.props.navigator.getCurrentRoute().key === "createPassword" && this.props.passwordState){
      return {height: 200}    
    }else{
      return null  
    }

  }
  
  render() {
    return (
      <View style={[ style.container, this._checkPasswordStateStyle() ]}>
        <View style={style.navigationBarContainer}>
          <View style={style.navigationContainer}>
            <TouchableHighlight onPress={this._handleBackPress}>
              <Text style={style.text}>{t('string_back')}</Text>
            </TouchableHighlight>
            <Text style={[ style.text, style.title ]}>{this.props.navigation}</Text>
            <Text style={style.text}>     </Text>
          </View>
          { this._checkPasswordStateOption() }
        </View>
      </View>
    );
  }

}

const style = StyleSheet.create({


  container: {
    height:60,
    backgroundColor: 'limegreen'
  },

  navigationBarContainer: {
    flex:1
  },

  navigationContainer: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'limegreen'
  },

  text: {
    marginLeft: 10,
    marginRight: 10,
    color: "#FFF",  
    fontSize: 20,
    width:50
  },

  title : {
    textAlign: 'center',  
    fontSize: 18,
    flex: 1
  }
});

export default connect( state => ({
  passwordState  : state.password.inputState

}) )(NavigationBar)
