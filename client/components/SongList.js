import React, { Component } from 'react';
import { Link } from 'react-router';

import { graphql /* compose */ } from 'react-apollo';

// query && mutation
import fetchSongs from '../queries/fetchSongs';
import deleteSong from '../mutations/deleteSongs';

class SongList extends Component {
  _onSongDelete(id) {
    this.props.mutate({
      variables: { id },
      refetchQueries: [{ query: fetchSongs }],
    });
  }

  _renderSongs() {
    return this.props.data.songs.map(({ id, title }) => (
      <li key={id} className="collection-item">
        <Link to={`/songs/${id}`}>{title}</Link>
        <i className="material-icons" onClick={() => this._onSongDelete(id)}>
          delete
        </i>
      </li>
    ));
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading</div>;
    }
    return (
      <div>
        <ul className="collection">{this._renderSongs()}</ul>
        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

export default graphql(deleteSong)(graphql(fetchSongs)(SongList));
