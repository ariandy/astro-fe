import React, { Component } from 'react'
import { View, TextInput, Text } from 'react-native'
import { Container, Content, Form, Item, Label, Textarea, Button } from 'native-base';
import { connect } from 'react-redux'
import * as actionAnswer from '../../redux/actions/answer'
import * as actionQuestion from '../../redux/actions/question'

class TextAnswer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: '',
      timeout: 0
    };
  }

  handleNextAnswer = () => {
    this.props.sendAnswer({
      question_id: this.props.question.data.id,
      user_id: this.props.register.data.id,
      answer: this.state.answer
    })
  }

  handleAnswers = text => this.setState({answer: text})

  render() {
    if(this.props.answer.isSuccess) {
      this.props.getQuestion(this.props.question.page)
      this.setState({answer: ''})
      this.props.answer.isSuccess = false
    }

    if(this.props.question.isSuccess) {
      this.setState({timeout: parseInt(`${this.props.question.data.timer}000`)})
      this.props.question.isSuccess = false
    }

    return (
      <View>
        {/*<TextInput value={this.state.answer} onChangeText={text => this.handleAnswers(text)} style={{ borderWidth: 1, borderColor: '#333'}} />*/}
        <Form style={{ marginBottom: 20 }}>
          <Textarea rowSpan={5} bordered placeholder="Type Here.." value={this.state.answer} onChangeText={text => this.handleAnswers(text)}/>
        </Form>
        <Button block primary onPress={this.handleNextAnswer}>
          <Text style={{ color: '#fff' }}>Next Answer</Text>
        </Button>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    answer: state.answer,
    question: state.question,
    register: state.register
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendAnswer: newValue => dispatch(actionAnswer.sendAnswer(newValue)),
    getQuestion: page => dispatch(actionQuestion.getQuestion(page)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextAnswer);