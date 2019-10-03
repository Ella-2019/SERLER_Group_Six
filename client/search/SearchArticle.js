import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Card from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import {listArticle} from './api-search'
import auth from '../auth/auth-helper'
import ArticleList from '../article/ArticleList.js'

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
class SearchArticle extends Component {
  state = {
    articles: []
  }
 
  loadArticles = () => {
    listArticle().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({articles: data})
      }
    })
    componentDidMount = () => {
      this.loadArticles()
    }
  }
 render() {
    const {classes} = this.props
    return (
      console.log(this.state),
      <Card className={classes.card}>
           <ArticleList  articles={this.state.articles}/>
      </Card>
    )
  }
}

SearchArticle.propTypes = {
  article: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SearchArticle)
