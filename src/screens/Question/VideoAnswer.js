import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { connect } from 'react-redux'
import * as actionAnswer from '../../redux/actions/answer'
import * as actionQuestion from '../../redux/actions/question'

class VideoAnswer extends Component {
  handleNextAnswer = () => {
    alert('Thanks for submitting')
    // this.props.navigation.navigate("Register")
  }

  render() {
    return (
      <View>
        <Button title="next answer" onPress={this.handleNextAnswer}/>
      </View>
    )
  }
}
const mapStateToProps = state => {
  return {
    answer: state.answer,
    question: state.question,
    register: state.register,
    router: state.router
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
)(VideoAnswer);