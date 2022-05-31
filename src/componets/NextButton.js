import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionNextQuestion, timeOver } from '../redux/actions/gameActions';

class NextButton extends Component {
  HandleClickNextButton = () => {
    const { round, nextButton, onClickAnswered, score, userName, picture, timeOutSet } = this.props;
    timeOutSet(false);
    const NUMBER = 4;
    if (round <= NUMBER) {
      nextButton();
    }
    if (round === NUMBER) {
      const { history } = this.props;
      const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
      const rankPlayer = [...ranking, { name: userName, score, picture }];
      localStorage.setItem('ranking', JSON.stringify(rankPlayer));
      history.push('/feedback');
    }
    onClickAnswered();
  }

  render() {
    const { round } = this.props;
    return (
      <div className="next-button">
        <button
          type="button"
          data-testid="btn-next"
          onClick={ this.HandleClickNextButton }
        >
          { round === 4 ? "Finish" : "Next"}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  round: state.game.round,
  userName: state.player.name,
  score: state.game.score,
  picture: state.player.picture,
});

const mapDispatchToProps = (dispatch) => ({
  nextButton: () => dispatch(actionNextQuestion()),
  timeOutSet: (isTimeOver) => dispatch(timeOver(isTimeOver))
});

export default connect(mapStateToProps, mapDispatchToProps)(NextButton);
