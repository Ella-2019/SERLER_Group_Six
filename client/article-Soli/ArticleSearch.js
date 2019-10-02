import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import List, {ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Edit from 'material-ui-icons/Edit'
import Divider from 'material-ui/Divider'
import DeleteUser from './DeleteUser'
import auth from './../auth/auth-helper'
import {read} from './api-user.js'
import {Redirect, Link} from 'react-router-dom'
import FollowProfileButton from './../user/FollowProfileButton'
import ArticleTab from './../articleSoli/ArticleTab'
import {listByUser} from './../articleSoli/api-article.js'

const styles = theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 5
  }),
  title: {
    margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit}px 0`,
    color: theme.palette.protectedTitle,
    fontSize: '1em'
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 10
  }
})
/*state = {
  like: false,
  likes: 0,
  comments: []
}*/
class ArticleSearch extends Component {
  constructor({match}) {
    super()
    this.state = {
      articleSoli: []
    }
    this.match = match
  }
 
  componentWillReceiveProps = (props) => {
    this.init(props.match.params.userId)
  }
  componentDidMount = () => {
    this.init(this.match.params.userId)
  }
  
  loadPosts = (user) => {
    const jwt = auth.isAuthenticated()
    listByUser({
      userId: user
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
  
  render() {
    const {classes} = this.props
    return (
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          ArticleSearch
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText primary={this.state.user.name} secondary={this.state.user.email}/> {
             auth.isAuthenticated().user && auth.isAuthenticated().user._id == this.state.user._id
             ? (<ListItemSecondaryAction>
                  <Link to={"/user/edit/" + this.state.user._id}>
                    <IconButton aria-label="Edit" color="primary">
                      <Edit/>
                    </IconButton>
                  </Link>
                  <DeleteUser userId={this.state.user._id}/>
                </ListItemSecondaryAction>)
            : (<FollowProfileButton following={this.state.following} onButtonClick={this.clickFollowButton}/>)
            }
          </ListItem>
          <Divider/>
          <ListItem>
            <ListItemText primary={this.state.user.about} secondary={"Joined: " + (
              new Date(this.state.user.created)).toDateString()}/>
          </ListItem>
        </List>
        {/*<ArticleTab user={this.state.user} posts={this.state.posts} removePostUpdate={this.removePost}/>*/}
      </Paper>
    )
  }
}
ArticleSearch.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ArticleSearch)
