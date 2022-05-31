import React, { Component } from 'react';
import { connect } from 'react-redux';
import { timeOver, setTimer } from '../redux/actions/gameActions';
import '../css/Timer.css'

class Timer extends Component {
  constructor() {
    super();

    this.state = {
      timer: 30,
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate() {
    const { timer } = this.state;
    const { timeOutSet, upTimer, answered } = this.props;
    if (answered) {
      clearInterval(this.countInterval);
      upTimer(timer);
    }
    if (timer === 0) {
      clearInterval(this.countInterval);
      timeOutSet(true);
    }
  }

  startTimer = () => {
    const ONE_SECOND = 1000;
    this.countInterval = setInterval(() => {
      this.setState((state) => ({
        timer: state.timer - 1,
      }));
    }, ONE_SECOND);
  }

  render() {
    const { timer } = this.state;
    return (
      <h2 className="timer">{timer}</h2>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  timeOutSet: (isTimeOver) => dispatch(timeOver(isTimeOver)),
  upTimer: (timer) => dispatch(setTimer(timer)),
});

export default connect(null, mapDispatchToProps)(Timer);
