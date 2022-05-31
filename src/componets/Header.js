import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { actionPicture } from '../redux/actions/userActions';
import '../css/Header.css'

class Header extends Component {
  constructor() {
    super();
    this.state = {
      picture: '',
    };
  }

  componentDidMount() {
    this.getPictureGravatar();
  }

  getPictureGravatar = async () => {
    const { email, setPictures } = this.props;
    const emailCrpyto = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${emailCrpyto}`;
    setPictures(url);
    this.setState({ picture: url });
  }

  render() {
    const { userName, score } = this.props;
    const { picture } = this.state;

    return (
      <header>
        <div className="picture">
          <img data-testid="header-profile-picture" src={ picture } alt={ userName } />
        </div>
        <h1 data-testid="header-score">{score}</h1>
        <h1 data-testid="header-player-name">{userName}</h1>
      </header>
    );
  }
}
const mapStateToProps = (state) => ({
  userName: state.player.name,
  score: state.game.score,
  email: state.player.gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  setPictures: (picture) => dispatch(actionPicture(picture)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
