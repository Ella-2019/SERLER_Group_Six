import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Card from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import auth from './../auth/auth-helper'
import PostList from './PostList'
import ArticleList from './../article/ArticleList.js'
import {listNewsFeed} from './api-post.js'
import {listFeed} from './../article/api-article'
import NewPost from './NewPost'
import NewArticle from './../article/NewArticle'


const styles = theme => ({
  card: {
    margin: 'auto',
    paddingTop: 0,
    paddingBottom: theme.spacing.unit*3
  },
  title: {
    padding:`${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme.spacing.unit * 2}px`,
    color: theme.palette.openTitle,
    fontSize: '1em'
  },
  media: {
    minHeight: 330
  }
})
class Newsfeed extends Component {
  state = {
      posts: [],
      articles: []
  }
  loadPosts = () => {
    const jwt = auth.isAuthenticated()
    listNewsFeed({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({posts: data})
      }
    })
  }
  loadArticles = () => {
    const jwt = auth.isAuthenticated()
    listFeed({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({articles: data})
      }
    })
  }
  componentDidMount = () => {
    this.loadPosts(),
    this.loadArticles()
  }
  addPost = (post) => {
    const updatedPosts = this.state.posts
    updatedPosts.unshift(post)
    this.setState({posts: updatedPosts})
  }
  removePost = (post) => {
    const updatedPosts = this.state.posts
    const index = updatedPosts.indexOf(post)
    updatedPosts.splice(index, 1)
    this.setState({posts: updatedPosts})
  }
  addArticle = (article) => {
    const updatedArticles = this.state.articles
    updatedArticles.unshift(article)
    this.setState({articles: updatedArticles})
  }
  removeArticle = (article) => {
    const updatedArticles = this.state.articles
    const index = updatedArticles.indexOf(article)
    updatedArticles.splice(index, 1)
    this.setState({articles: updatedArticles})
  }
  render() {
    const {classes} = this.props
    return (
      console.log(this.state),
      <Card className={classes.card}>
        <Typography type="title" className={classes.title}>
          New Submission
        </Typography>
        <Divider/>
        <NewArticle addUpdate={this.addArticle}/>
        {/* <NewPost addUpdate={this.addPost}/> */}
        <Divider/>
        {/* <PostList removeUpdate={this.removePost} posts={this.state.posts}/> */}
        <ArticleList removeUpdate={this.removeArticle} articles={this.state.articles}/>
      </Card>
    )
  }
}
Newsfeed.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Newsfeed)
