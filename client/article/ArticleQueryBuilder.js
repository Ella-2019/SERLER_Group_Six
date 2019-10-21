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
import {QueryBuilderComponent} from '@syncfusion/ej2-react-querybuilder';


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
        <style>@import url(https://cdn.syncfusion.com/ej2/material.css);</style>
        <QueryBuilderComponent />
        </FormControl>
  
      </form>
  
    )
  }
}

ArticleQuery.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ArticleQuery)
