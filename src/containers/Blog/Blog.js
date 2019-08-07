import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';

import './Blog.css';

class Blog extends Component {
  state = {
    auth: true
  };

  render() {
    return (
      <div className='Blog'>
        <header>
          <nav>
            <ul>
              <li>
                <NavLink
                  exact
                  to='/posts/'
                  activeClassName='my-active'
                  activeStyle={{
                    color: '#fa923f',
                    textDecoration: 'underline'
                  }}
                >
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: '/new-post',
                    hash: '#submit',
                    search: '?quick-submit=true'
                  }}
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          {/* order in this case matters */}
          {this.state.auth ? (
            <Route path='/new-post' component={NewPost} />
          ) : null}
          <Route path='/posts' component={Posts} />
          <Route render={() => <h1>Not found</h1>} />
          {/* <Redirect from='/' to='/posts' /> */}
          {/* <Route path='/' component={Posts} /> */}
        </Switch>
      </div>
    );
  }
}

export default Blog;
