import React, { Component } from 'react';
// import axios from 'axios';
import axios from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: false
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
      this.setState({ error: true });
    }
  };

  postSelectedHandler = id => {
    this.setState({ selectedPostId: id });
  };

  render() {
    let posts = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return (
          <Post
            key={post.id}
            post={post}
            clicked={() => this.postSelectedHandler(post.id)}
          />
        );
      });
    }
    return (
      <div className='Blog'>
        <header>
          <nav>
            <ul>
              <li>
                <a href='/'>Home</a>
                <a href='/'>New Post</a>
              </li>
            </ul>
          </nav>
        </header>
        <section className='Posts'>{posts}</section>
        <section>
          <FullPost id={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
