import React, { Component } from 'react';
import { graphql } from 'react-apollo';

// mutations
import mutation from '../mutations/likeLyric';

class LyricList extends Component {
  _onLike(id, likes) {
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes + 1000,
        },
      },
    });
  }

  _renderLyrics() {
    return this.props.lyrics.map(({ id, content, likes }) => (
      <li key={id} className="collection-item">
        {content}
        <div className="vote-box">
          <i className="material-icons" onClick={() => this._onLike(id, likes)}>
            thumb_up
          </i>
          {likes}
        </div>
      </li>
    ));
  }

  render() {
    return <ul className="collection">{this._renderLyrics()}</ul>;
  }
}

export default graphql(mutation)(LyricList);
