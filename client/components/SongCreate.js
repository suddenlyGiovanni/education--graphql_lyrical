import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { Link, hashHistory } from 'react-router';

// query && mutation
import query from '../queries/fetchSongs';
import mutation from '../mutations/addSong';

class SongCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };
  }

  _onSubmit(e) {
    e.preventDefault();
    this.props
      .mutate({
        variables: { title: this.state.title },
        refetchQueries: [{ query }],
      })
      .then(() => hashHistory.push('/'));
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a New Song</h3>
        <form onSubmit={this._onSubmit.bind(this)}>
          <label htmlFor="songTitle">Song Title:</label>
          <input
            id="songTitle"
            onChange={e => this.setState({ title: e.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

export default graphql(mutation)(SongCreate);
