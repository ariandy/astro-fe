import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Container, Content, Form,
        Item, Input, Label, Button } from 'native-base';
import { connect } from 'react-redux'
import * as action from '../../redux/actions/register'
import { Col, Row, Grid } from 'react-native-easy-grid';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      phoneNumber: '',
      fulfilled: false,
      nameError: false,
      emailError: false,
      phoneNumberError: false,
    };
  }

  changeName = text => {
    this.setState({name: text})
  }

  changeEmail = text => {
    this.setState({email: text})
  }

  changePhoneNumber = text => {
    this.setState({phoneNumber: text})
  }

  sendForm = () => {
    this.props.postRegister({
      name: this.state.name,
      email: this.state.email,
      phonenumber: this.state.phoneNumber,
    })
  }

  navigate = () => {
    this.props.navigation.navigate("Question")
  }

  render() {

    if(this.props.register.isSuccess) {
      this.navigate()
    } else if(this.props.register.isError) {
      alert('Register failed')
      this.props.register.isError = false
    }

    return (
      <Container style={{ flex: 1, justifyContent: 'center', backgroundColor:"#5CDB95"}}>
        <Content style={{ marginTop: '30%' }}>
          <Form style={{ alignItem:"center", marginBottom: 20 }}>
          
          <View>
            <Image style={{alignSelf:"center", marginBottom: '25%'}}
              source={require('../../assets/header2.png')}
            />
          </View>

          <View style={styles.textInputSize}>
            <Item rounded style={styles.textInputInside}>
              <Input placeholder="Name"
                value={this.state.name}
                onChangeText={(text) => this.changeName(text)} />
            </Item>
          </View>

          <View style={styles.textInputSize}>
            <Item rounded style={styles.textInputInside}>
              <Input placeholder="Email"
                keyboardType="email-address"
                value={this.state.email}
                onChangeText={(text) => this.changeEmail(text)} />
            </Item>
          </View>

          <View style={styles.textInputSize}>
            <Item rounded style={styles.textInputInside}>
              <Input placeholder="Phone Number"
                keyboardType="phone-pad"
                value={this.state.phonenumber}
                onChangeText={(text) => this.changePhoneNumber(text)} />
            </Item>
          </View>

          </Form>
          <Grid style={{ paddingHorizontal: 15 }}>
            <Col>
              <Button dark block onPress={this.sendForm} style={{ marginBottom: 5 }}>
                <Text style={{ color: '#fff' }}>Ready</Text>
              </Button>
            </Col>
          </Grid>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    register: state.register
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postRegister: newUser => dispatch(action.postRegister(newUser)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

const styles = StyleSheet.create({
  textInputSize:{
    paddingTop:20,
    paddingLeft:20,
    paddingRight:20,
  },
  textInputInside:{
    backgroundColor:'#EDF5E1',
    paddingLeft:10
  }
})