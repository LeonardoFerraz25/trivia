import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../componets/Header';
import { resetState } from '../redux/actions/gameActions';
import '../css/Feedback.css'

class Feedback extends Component {
  render() {
    const NUMBER_THREE = 3;
    const { rightAnswer, score, assertions, history, reset } = this.props;
    return (
      <main>
        <Header />
        <section className="feedback">
          {
            rightAnswer < NUMBER_THREE ? (
              <h1 data-testid="feedback-text">Could be better...</h1>
            ) : (
              <h1 data-testid="feedback-text">Well Done!</h1>
            )
          }
          <div>
            <h2>
              Seu Placar final foi :
              <span className='results-placar' data-testid="feedback-total-score">{score}</span>
            </h2>
            <h2>
              Você acertou :
              <span className='results-placar' data-testid="feedback-total-question">{assertions}</span>
              perguntas
            </h2>
          </div>
          <div className="buttons-feedback">
            <button
              type="button"
              data-testid="btn-play-again"
              onClick={ () => {
                reset();
                history.push('/');
              } }
            >
              Play Again
            </button>
            <button
              type="button"
              data-testid="btn-ranking"
              onClick={ () => {
                history.push('/ranking');
              } }
            >
              Ranking
            </button>
          </div>
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  rightAnswer: state.game.assertions,
  score: state.game.score,
  assertions: state.game.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(resetState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
