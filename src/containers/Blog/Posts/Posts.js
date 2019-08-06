import React, { Component } from 'react';
import axios from '../../../axios';
// import { Link } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import './Posts.css';

class Posts extends Component {
  state = {
    posts: []
  };

  componentDidMount = async () => {
    try {
      const res = await axios.get('/posts');
      const posts = res.data.slice(0, 3);
      const updatedPosts = posts.map(post => {
        return {
          ...post,
          author: 'Kris'
        };
      });
      this.setState({
        posts: updatedPosts
      });
    } catch (error) {
      console.error(error);
    }
  };

  postSelectedHandler = id => {
    // this.setState({ selectedPostId: id });
    this.props.history.push(`/${id}`); // navigating programmatically
  };

  render() {
    let posts = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return (
          // <Link to={`/${post.id}`} key={post.id}>
          <Post
            key={post.id}
            post={post}
            clicked={() => this.postSelectedHandler(post.id)}
          />
          // </Link>
        );
      });
    }

    return <section className='Posts'>{posts}</section>;
  }
}

export default Posts;
