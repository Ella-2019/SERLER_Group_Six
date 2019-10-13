import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Card, {CardContent, CardMedia} from 'material-ui/Card'
import Typography from '@material-ui/core/Typography'
import serlerImg from './../assets/images/logoSERLER.png'
import {Link} from 'react-router-dom'
import Grid from 'material-ui/Grid'
import auth from './../auth/auth-helper'
import FindPeople from './../user/FindPeople'
import ArticleList from './../article/ArticleList'
import Newsfeed from './../post/Newsfeed'
import FindArticle from './../article/FindArticle'

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 10,
  },
  card: {
    maxWidth: '200',
    margin: 'auto',
    marginTop: 'auto'
  },
  title: {
    padding:`${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme.spacing.unit * 2}px`,
    color: theme.palette.text.secondary
  },
  media: {
    minHeight: 450,
  }
})

class Home extends Component {
  state = {
    defaultPage: true,
    posts: [],
    articles: [],
  }
  init = () => {
    if(auth.isAuthenticated()){
      this.setState({defaultPage: false})
    }else{
      this.setState({defaultPage: true})
    }
  }
  componentWillReceiveProps = () => {
    this.init()
  }
  componentDidMount = () => {
    this.init()
  }
  render() {
    const {classes} = this.props
    
    return (
      <div className={classes.root}>
        {this.state.defaultPage &&
          <Grid container spacing={24}>
            <Grid item xs >
              <Card className={classes.card}>
               <Typography align='center' type="headline" className={classes.title}>
                  WELCOME!
                </Typography>
                <CardMedia className={classes.media} image={serlerImg} title="SERLER LOGO"/>
              </Card>
            </Grid>
            <Grid item xs={10}>
              <FindArticle/>
            </Grid>
          </Grid>
        }
        {!this.state.defaultPage &&
          <Grid container spacing={24}>
            <Grid item xs={8} sm={7}>
              <Newsfeed/>
            </Grid>
            <Grid item xs={6} sm={5}>
              <FindPeople/>
            </Grid>
          </Grid>
        }
      </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)
