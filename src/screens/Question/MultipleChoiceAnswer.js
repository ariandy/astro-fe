import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'native-base';
import { connect } from 'react-redux'
import * as actionAnswer from '../../redux/actions/answer'
import * as actionQuestion from '../../redux/actions/question'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

class MultipleChoiceAnswer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      choice: [],
      answer: 1
    };
  }

  handleNextAnswer = () => {
    this.props.sendAnswer({
      question_id: this.props.question.data.id,
      user_id: this.props.register.data.id,
      answer: this.state.answer
    })
  }

  handleChangeRadio = value => this.setState({answer: value + 1})

  render() {
    if(this.props.question.isSuccess) {
      const arr = this.props.question.data.options.split(",");
      const choice = arr.map((item, index) => {
        return {label: item, value: index}
      })
      this.setState({choice})
      this.props.question.isSuccess = false
    }

    if(this.props.answer.isSuccess) {
      this.props.getQuestion(this.props.question.page)
      this.props.answer.isSuccess = false
    }

    return (
      <View>
        <RadioForm
          radio_props={this.state.choice}
          initial={0}
          onPress={(value) => this.handleChangeRadio(value)}
        />

        <Button block primary onPress={this.handleNextAnswer} style={{ marginTop: 10 }}>
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
)(MultipleChoiceAnswer);