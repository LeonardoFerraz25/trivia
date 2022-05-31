import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetState } from '../redux/actions/gameActions';
import Players from '../componets/Players';
import '../css/Ranking.css';

class Ranking extends Component {
  render() {
    const { reset, history } = this.props;
    return (
      <div className="main-ranking">
        <h1 data-testid="ranking-title">Ranking</h1>
        <Players />
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => {
            reset();
            history.push('/');
          } }
        >
          Inicio
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(resetState()),
});

export default connect(null, mapDispatchToProps)(Ranking);
