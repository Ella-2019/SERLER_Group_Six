import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import {list} from './api-article.js'   

const styles = theme => ({
  root: theme.mixins.gutters({
    padding: theme.spacing.unit,
    margin: theme.spacing.unit * 5
  }),
  title: {
    margin: `${theme.spacing.unit * 1}px 0 ${theme.spacing.unit * 2}px`,
    color: theme.palette.openTitle
  },
  rootpaper: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  }
})



class ArticleQuery extends Component {
  state = {
      articles: []
  }

  componentDidMount() {
    list().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({articles: data})
      }
    })
  }

  render() {
    const {classes} = this.props
    
    return (
        <form>
        <FormControl>
          <InputLabel htmlFor="age-helper">Age</InputLabel>
          <Select
            value={'SSSS'}
            inputProps={{
              name: 'age',
              id: 'age-helper',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <FormHelperText>Some important helper text</FormHelperText>
        </FormControl>
  
      </form>
  
    )
  }
}

ArticleQuery.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ArticleQuery)
