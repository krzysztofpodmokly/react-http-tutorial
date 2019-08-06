import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
  state = {
    loadedPost: null
  };

  componentDidMount = async () => {
    if (this.props.match.params.id) {
      // preventing from infinite loop
      if (
        !this.state.loadedPost ||
        (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)
      ) {
        const res = await axios.get(`/posts/${this.props.match.params.id}`);
        this.setState({
          loadedPost: res.data
        });
      }
    }
  };

  deletePost = async () => {
    await axios.delete(`/posts/${this.props.id}`);
  };

  render() {
    let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
    if (this.props.id) {
      post = <p style={{ textAlign: 'center' }}>Loading</p>;
    }
    if (this.state.loadedPost) {
      post = (
        <div className='FullPost'>
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className='Edit'>
            <button onClick={this.deletePost} className='Delete'>
              Delete
            </button>
          </div>
        </div>
      );
    }
    return post;
  }
}

export default FullPost;