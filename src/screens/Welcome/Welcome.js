import React, {Component} from 'react';
import { Text, View} from 'react-native';
const axios = require('axios');
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';

export default class Welcome extends Component {
  constructor() {
		super();
		this.state = {
			name: '',
			email: '',
			phonenumber: '',
		}
  }
  
  handleSubmit=(e) => {
    if( this.state.name =="" || this.state.email=="" || this.state.phonenumber=="") {
      alert("Please fill the form")
    } else {
    axios.post('http://10.0.2.2:3333/api/v1/user', {
      "name": this.state.name,
      "email": this.state.email,
      "phonenumber": this.state.phonenumber
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }}
  
  render() {
    return (
      <Container>
        <Content>
          <Form style={{paddingTop:100}}>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input value={this.state.name}
                    onChangeText={(name)=>this.setState({name:name})}/>
            </Item>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input value={this.state.email}
                    onChangeText={(email)=>this.setState({email:email})}/>
            </Item>
            <Item floatingLabel>
              <Label>Phone</Label>
              <Input value={this.state.phonenumber}
                    onChangeText={(phonenumber)=>this.setState({phonenumber:phonenumber})}/>
            </Item>
          </Form>
          <Button onPress={()=>{this.handleSubmit()}}>
              <Text style={{color:'white'}}>Ready</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}