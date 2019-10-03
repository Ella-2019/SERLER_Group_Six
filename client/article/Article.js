import React, {Component} from 'react'
import auth from './../auth/auth-helper'
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui-icons/Delete'
import FavoriteIcon from 'material-ui-icons/Favorite'
import FavoriteBorderIcon from 'material-ui-icons/FavoriteBorder'
import CommentIcon from 'material-ui-icons/Comment'
import Divider from 'material-ui/Divider'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import {Link} from 'react-router-dom'
import {remove, like, unlike} from './api-article.js'
//import Comments from './Comments'

const styles = theme => ({
  card: {
    maxWidth:600,
    margin: 'auto',
    marginBottom: theme.spacing.unit*3,
    backgroundColor: 'rgba(0, 0, 0, 0.06)'
  },
  cardContent: {
    backgroundColor: 'white',
    padding: `${theme.spacing.unit*2}px 0px`
  },
  cardHeader: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  text: {
    margin: theme.spacing.unit*2
  },
  photo: {
    textAlign: 'center',
    backgroundColor: '#f2f5f4',
    padding:theme.spacing.unit
  },
  media: {
    height: 200
  },
  button: {
   margin: theme.spacing.unit,
  }
})

class Article extends Component {
  state = {
    like: false,
    likes: 0,
    comments: []
  }

  componentDidMount = () => {
    this.setState({like:this.checkLike(this.props.article.likes), likes: this.props.article.likes.length, comments: this.props.article.comments})
  }
  componentWillReceiveProps = (props) => {
    this.setState({like:this.checkLike(props.article.likes), likes: props.article.likes.length, comments: props.article.comments})
  }

  checkLike = (likes) => {
    const jwt = auth.isAuthenticated()
    let match = likes.indexOf(jwt.user._id) !== -1
    return match
  }

  like = () => {
    let callApi = this.state.like ? unlike : like
    const jwt = auth.isAuthenticated()
    callApi({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, this.props.article._id).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({like: !this.state.like, likes: data.likes.length})
      }
    })
  }

  updateComments = (comments) => {
    this.setState({comments: comments})
  }

  deleteArticle = () => {
    const jwt = auth.isAuthenticated()
    remove({
      articleId: this.props.article._id
    }, {
      t: jwt.token
    }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.props.onRemove(this.props.article)
      }
    })
  }
  render() {
    const {classes} = this.props
    return (
      <Card className={classes.card}>
        <CardHeader
            title={this.props.article.title}
            subheader={this.props.article.author}
            className={classes.cardHeader}
          />
        <CardContent className={classes.cardContent}>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Upload by: {<Link to={"/user/" + this.props.article.postedBy._id}>{this.props.article.postedBy.name}</Link>}<br/>
          Upload in: {(new Date(this.props.article.created)).toDateString()}<br/>
          Article Title: {this.props.article.title}<br/>
          Article Author: {this.props.article.author}<br/>
          Article Date: {this.props.article.date}<br/>
          Article Description: {this.props.article.annotation}<br/>
        </Typography>
        </CardContent>
        {/* <CardActions>
          { this.state.like
            ? <IconButton onClick={this.like} className={classes.button} aria-label="Like" color="secondary">
                <FavoriteIcon />
              </IconButton>
            : <IconButton onClick={this.like} className={classes.button} aria-label="Unlike" color="secondary">
                <FavoriteBorderIcon />
              </IconButton> } <span>{this.state.likes}</span>
         </CardActions> */}
      </Card>
    )
  }
}

Article.propTypes = {
  classes: PropTypes.object.isRequired,
  article: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired
}

export default withStyles(styles)(Article)
