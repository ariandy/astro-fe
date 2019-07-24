import React, { Component } from 'react'
import { View, Text, Button, ActivityIndicator, Alert } from 'react-native'
import { Container, Content, Grid, Col } from 'native-base';
import { connect } from 'react-redux'
import * as action from '../../redux/actions/question'
import TextAnswer from './TextAnswer'
import VideoAnswer from './VideoAnswer'
import MultipleSelectAnswer from './MultipleSelectAnswer'
import MultipleChoiceAnswer from './MultipleChoiceAnswer'

class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isSucces: true,
      isFinished: false
    };
  }

  componentDidMount() {
    this.props.getQuestion(this.props.question.page)
  }

  navigateToHome = () => {
    this.props.navigation.navigate("Register")
  }

  render() {
    if(this.props.question.isLoading) {
      this.setState({isLoading: true})
    } else if(this.props.question.isSucces) {
      this.setState({isLoading: false, isSucces: true})
    } else if(this.props.question.page == 6) {
      this.navigateToHome()
    }
    console.log(this.props.question)

    return (
      <Container style={{ flex: 1, justifyContent: 'center', backgroundColor:"#5CDB95"}}>
        <Content style={{ marginTop: '40%' }} padder>
          <Grid style={{ marginBottom: 10, backgroundColor: '#ececec', padding: 20, borderRadius: 5 }}>
            <Col>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{this.props.question.data && this.props.question.data.description}</Text>
            </Col>
          </Grid>
          {this.props.question.data && this.props.question.data.types == 'text' && <TextAnswer />}
          {this.props.question.data && this.props.question.data.types == 'multiple select' && <MultipleSelectAnswer />}
          {this.props.question.data && this.props.question.data.types == 'multiple choice' && <MultipleChoiceAnswer />}
          {this.props.question.data && this.props.question.data.types == 'video' && <VideoAnswer />}
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    question: state.question
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getQuestion: page => dispatch(action.getQuestion(page)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Question);