import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'native-base';
import { connect } from 'react-redux'
import * as actionAnswer from '../../redux/actions/answer'
import * as actionQuestion from '../../redux/actions/question'
import SelectMultiple from 'react-native-select-multiple'

class MultipleSelectAnswer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      choice: [],
      answer: []
    };
  }

  onSelectionsChange = (answer) => {
    this.setState({ answer })
  }

  handleNextAnswer = () => {
    const convertAnswerToArray = this.state.answer.map(item => item.value)
    const realAnswer = convertAnswerToArray.map(item => this.state.choice.indexOf(item))
    const answer = realAnswer.map(item => item + 1).join(',')
    this.props.sendAnswer({
      question_id: this.props.question.data.id,
      user_id: this.props.register.data.id,
      answer: answer
    })
  }

  render() {
    if(this.props.answer.isSuccess) {
      this.props.getQuestion(this.props.question.page)
      this.props.answer.isSuccess = false
    }

    if(this.props.question.isSuccess) {
      const arr = this.props.question.data.options.split(",");
      this.setState({choice: arr})
      this.props.question.isSuccess = false
    }

    return (
      <View>
        <SelectMultiple rowStyle={{backgroundColor:"#5CDB95"}}
          items={this.state.choice}
          selectedItems={this.state.answer}
          onSelectionsChange={this.onSelectionsChange} />

        <Button block primary onPress={this.handleNextAnswer} style={{ marginTop: 20 }}>
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
)(MultipleSelectAnswer);