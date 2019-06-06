import React from 'react'
import ReactDOM from 'react-dom'

import data from './data';
import * as R from 'ramda';

function shuffle(list) {
  for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
  }

  return list
}

class App extends React.Component {
  render () {
    const {questions, answers} = data
    const picked = R.take(40, shuffle(R.keys(data.questions)))

    const picked_questions = picked.map(i => questions[i])
    const picked_answers = picked.map(i => answers[i])
    
    return (
      <div className="container">
        <h1>ISTQB</h1>
        <br /><br /><br />
        <Quiz questions={picked_questions} answers={picked_answers}/>
      </div>
    )
  }
}

class Quiz extends React.Component {
  render () {
    const quiz_data = R.zip(this.props.questions, this.props.answers).map(v=><Question text={v[0]} answer={v[1]}/>);

    return (
      <div>
        {quiz_data}
      </div>
    )
  }
}

class Question extends React.Component {
  constructor(props) {
    super(props)
    this.state = { answer_shown: false }
  }

  handle_click() {
    this.setState({
      answer_shown: !this.state.answer_shown
    })
  }

  render () {
    const {text, answer} = this.props
    return (
      <div onClick={this.handle_click.bind(this)}>
        {R.intersperse(<br />, text.split('\n'))}
        {this.state.answer_shown? answer : null}
        <hr />
      </div>
    )
  }
}

export default App;
