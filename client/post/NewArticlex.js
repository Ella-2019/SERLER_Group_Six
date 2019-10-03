import React, {Component} from 'react'
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import Icon from 'material-ui/Icon'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import {create} from './api-post.js'
import auth from '../auth/auth-helper'
import IconButton from 'material-ui/IconButton'
import AttachFile from 'material-ui-icons/AttachFile'


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

class NewPost extends Component {
  state = {
    text: '',
    photo: '',
    error: '',
    user: {}
  }

  componentDidMount = () => {
    this.postData = new FormData()
    this.setState({user: auth.isAuthenticated().user})
  }
  clickPost = () => {
    const jwt = auth.isAuthenticated()
    create({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, this.postData).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({text:'', photo: ''})
        this.props.addUpdate(data)
      }
    })
  }
  handleChange = name => event => {
    const value = name === 'photo'
      ? event.target.files[0]
      : event.target.value
    this.postData.set(name, value)
    this.setState({ [name]: value })
  }
  render() {
    const {classes} = this.props
    return (<div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography>BIBLIOGRAPHIC DETAILS</Typography>
          <TextField id="author" label="Article Author" className={classes.textField} margin="normal"/><br/>
          <TextField id="author" label="Article Contributors" className={classes.textField} margin="normal"/><br/>
          <TextField id="title" label="Article Title" className={classes.textField} margin="normal"/><br/>
          <TextField id="title" label="Date" className={classes.textField} margin="normal"/><br/>
          <TextField id="title" label="Journal" className={classes.textField} margin="normal"/><br/>
          <TextField id="title" label="Volume" className={classes.textField} margin="normal"/><br/>
          <TextField id="title" label="Number" className={classes.textField} margin="normal"/><br/>
          <TextField id="title" label="Pages" className={classes.textField} margin="normal"/><br/><br/>
          <TextField id="title" label="Annotations" className={classes.textField} margin="normal"/><br/><br/>
          <Typography>Attach .txt file</Typography>
          <label htmlFor="icon-button-file">
          <IconButton color="secondary" component="span">
           <AttachFile/>
          </IconButton>
        </label>
          <br/> {
            this.state.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {this.state.error}</Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="raised" >Submit</Button>
        </CardActions>
      </Card>
  </div>)
  }
}

NewPost.propTypes = {
  classes: PropTypes.object.isRequired,
  addUpdate: PropTypes.func.isRequired
}

export default withStyles(styles)(NewPost)
