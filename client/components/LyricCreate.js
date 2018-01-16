import React, { Component } from 'react';
import { graphql } from 'react-apollo';

// mutations
import addLyricToSong from '../mutations/addLyricToSong';

class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }

  _onSubmit(e) {
    e.preventDefault();
    this.props
      .mutate({
        variables: {
          content: this.state.content,
          songId: this.props.songId,
        },
      })
      .then(() => this.setState({ content: '' }));
  }

  render() {
    console.log(this.props);
    return (
      <form onSubmit={this._onSubmit.bind(this)}>
        <label>Add a Lyric</label>
        <input
          onChange={e => this.setState({ content: e.target.value })}
          value={this.state.content}
        />
      </form>
    );
  }
}

export default graphql(addLyricToSong)(LyricCreate);
