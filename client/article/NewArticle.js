import React, {Component} from 'react'
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import Icon from 'material-ui/Icon'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import {create} from './api-article'
import auth from './../auth/auth-helper'
import IconButton from 'material-ui/IconButton'
import PhotoCamera from 'material-ui-icons/PhotoCamera'

const styles = theme => ({
  root: {
    backgroundColor: '#efefef',
    padding: `${theme.spacing.unit*3}px 0px 1px`
  },
  card: {
    maxWidth:600,
    margin: 'auto',
    marginBottom: theme.spacing.unit*3,
    backgroundColor: 'rgba(65, 150, 136, 0.09)',
    boxShadow: 'none'
  },
  cardContent: {
    backgroundColor: 'white',
    paddingTop: 0,
    paddingBottom: 0
  },
  cardHeader: {
    paddingTop: 8,
    paddingBottom: 8
  },
  photoButton: {
    height: 30,
    marginBottom: 5
  },
  input: {
    display: 'none',
  },
  textField: {
    marginLeft: theme.spacing.unit*2,
    marginRight: theme.spacing.unit*2,
    width: '90%'
  },
  submit: {
    margin: theme.spacing.unit * 2
  },
  filename:{
    verticalAlign: 'super'
  }
})

class NewArticle extends Component {
  state = {
    author: '',
    title: '',
    date: '',
    annotation: '',
    journal:'',
    volume:'',
    number:'',
    pages:'',
    filelink: '',
    error: '',
    user: {}
  }

  componentDidMount = () => {
    this.articleData = new FormData()
    this.setState({user: auth.isAuthenticated().user})
  }
  clickArticle = () => {
    const jwt = auth.isAuthenticated()
    create({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, this.articleData).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({author:'', title:'', date:'', annotation:'', journal:'', volume:'', number:'', pages:''})
        this.props.addUpdate(data)
      }
    })
  }
  handleChange = name => event => {
    const value = name === 'filelink'
      ? event.target.files[0]
      : event.target.value
    this.articleData.set(name, value)
    this.setState({ [name]: value })
  }
  render() {
    const {classes} = this.props
    return (<div className={classes.root}>
      <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography>BIBLIOGRAPHIC DETAILS</Typography>
          <TextField id="author" label="Article Author" value={this.state.author} onChange={this.handleChange('author')}className={classes.textField} margin="normal"/><br/>
          <TextField id="title" label="Article Title" value={this.state.title} onChange={this.handleChange('title')} className={classes.textField} margin="normal"/><br/>
          <TextField id="date" label="Date (YYYY-mm-dd)" value={this.state.date} onChange={this.handleChange('date')} className={classes.textField} margin="normal"/><br/>
          <TextField id="journal" label="Journal" value={this.state.journal} onChange={this.handleChange('journal')} className={classes.textField} margin="normal"/><br/>
          <TextField id="volume" label="Volume" value={this.state.volume} onChange={this.handleChange('volume')} className={classes.textField} margin="normal"/><br/>
          <TextField id="number" label="Number" value={this.state.number} onChange={this.handleChange('number')} className={classes.textField} margin="normal"/><br/>
          <TextField id="pages" label="Pages" value={this.state.pages} onChange={this.handleChange('pages')} className={classes.textField} margin="normal"/><br/>
          <TextField id="annotation" label="Description" value={this.state.annotation} onChange={this.handleChange('annotation')} className={classes.textField} margin="normal"/><br/>
      </CardContent>
      <CardActions>
        <Button color="primary" variant="raised" disabled={this.state.author === ''} onClick={this.clickArticle} className={classes.submit}>SUBMIT</Button>
      </CardActions>
    </Card>
  </div>)
  }
}

NewArticle.propTypes = {
  classes: PropTypes.object.isRequired,
  addUpdate: PropTypes.func.isRequired
}

export default withStyles(styles)(NewArticle)
