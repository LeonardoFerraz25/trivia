import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../componets/Header';
import fetchQuest from '../helper/fetchQuest';
import '../css/game.css';
import Timer from '../componets/Timer';
import { clickAssertions, actionScore } from '../redux/actions/gameActions';
import NextButton from '../componets/NextButton';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      arrayQuest: [],
      answered: false,
      loading: true,
      borderCorrect: 'correct',
      borderIncorrect: 'incorrect',
    };
  }

  componentDidMount() {
    this.getQuestion();
  }

  getQuestion = async () => {
    const token = localStorage.getItem('token');
    const results = await fetchQuest(token);
    if (results.length) {
      this.setState({ arrayQuest: results, loading: false });
    } else {
      const { history } = this.props;
      localStorage.setItem('token', '');
      history.push('/');
    }
  }

  calculateScore = () => {
    const { upTimer, getScore, setScore, round } = this.props;
    const { arrayQuest } = this.state;
    const level = arrayQuest[round].difficulty;
    let numDifficulty;
    if (level === 'hard') numDifficulty = (2 + 1);
    if (level === 'medium') numDifficulty = 2;
    if (level === 'easy') numDifficulty = 1;
    const HIT = 10;
    const score = getScore + HIT + (upTimer * numDifficulty);
    setScore(score);
  }

  handleClick = ({ target }) => {
    const { rightAnswer } = this.props;
    this.setState({
      answered: true,
    });
    if (target.name === 'correct') {
      rightAnswer();
      this.calculateScore();
    }
  };

  answers = () => {
    const { arrayQuest, borderCorrect, borderIncorrect, answered } = this.state;
    const { isTimeOut, round } = this.props;
    const correctAnswer = (
      <button
        data-testid="correct-answer"
        name="correct"
        type="button"
        id={ answered || isTimeOut ? borderCorrect : '' }
        onClick={ this.handleClick }
        disabled={ answered || isTimeOut }
      >
        {arrayQuest[round].correct_answer}
      </button>
    );
    const incorrectAnswers = arrayQuest[round].incorrect_answers.map((answer, index) => (
      <button
        key={ index }
        type="button"
        disabled={ answered || isTimeOut }
        data-testid={ `wrong-answer-${index}` }
        id={ answered || isTimeOut ? borderIncorrect : '' }
        onClick={ this.handleClick }
      >
        {answer}
      </button>
    ));

    const AnswersArr = [...incorrectAnswers, correctAnswer];
    const SHUFFLE = 0.5;
    const sortedAnswers = AnswersArr.sort(() => Math.random() - SHUFFLE);
    return sortedAnswers;
  }

  onClickAnswered = () => {
    this.setState({ answered: false });
  }

  render() {
    const { arrayQuest, loading, answered } = this.state;
    const { round, history, isTimeOut } = this.props;
    return (
      <div >
        <Header />
        {loading
          ? <p>carregando</p>
          : (
            <div className="main-questions">
              {answered || isTimeOut ? (
                <NextButton
                  arrayQuest={ arrayQuest }
                  history={ history }
                  onClickAnswered={ this.onClickAnswered }
                />
              ) : (
                <Timer answered={ answered } />
              )}
              <div className="questions">
                <h2 data-testid="question-category">{arrayQuest[round].category}</h2>
                <h3 data-testid="question-text">{arrayQuest[round].question}</h3>
              </div>

              <div className="answer-options" data-testid="answer-options">
                { this.answers().map((answer) => (answer)) }
              </div>
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isTimeOut: state.game.timeOut,
  upTimer: state.game.timer,
  getScore: state.game.score,
  round: state.game.round,
});

const mapDispatchToProps = (dispatch) => ({
  rightAnswer: () => dispatch(clickAssertions()),
  setScore: (score) => dispatch(actionScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
