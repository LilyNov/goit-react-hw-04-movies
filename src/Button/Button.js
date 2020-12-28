import { Component } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import s from '../Button/Button.module.css';
import PropTypes from 'prop-types';

export default class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  scrollPageOnBtnMore = () => {
    this.props.onClick();
    scroll.scrollToBottom();
  };

  render() {
    return (
      <button
        onClick={this.scrollPageOnBtnMore}
        className={s.Button}
        type="button"
      >
        Load more
      </button>
    );
  }
}
