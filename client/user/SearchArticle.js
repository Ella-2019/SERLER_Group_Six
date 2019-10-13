import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  root: theme.mixins.gutters({
    padding: theme.spacing.unit,
    margin: theme.spacing.unit * 5
  }),
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
    color: theme.palette.openTitle
  }
})
class SearchArticle extends Component {
  constructor(props) {
    super(props);
  }
  search = (a, b) => {
    alert(b.type);
  }
  render() {
    const {classes} = this.props
    return (     
      <form>
        <Paper className={classes.root} elevation={4}>
          <Typography type="title" className={classes.title}>
            Search Article
          </Typography>
          <h>Description</h>
            <input
              type='text'
              name='descArticle'
              onChange={this.myChangeHandler}
            />
          <h>Enter Date from</h>
            <input
              type='date'
              name='dateFrom'
              onChange={this.myChangeHandler}
            />
          <h>to </h>
          <input
            type='date'
            name='dateTo'
            onChange={this.myChangeHandler}
          />
          <p> </p>
          <h>If </h>
          <select size="1" name="bibTxtSearchItem">
            <option value="article">
              article
            </option>
            <option value="auter">
              auter
            </option>
            <option value="title">
              title
            </option>
            <option value="journal">
              journal
            </option>
            <option value="year">
              year
            </option>
            <option value="volume">
              volume
            </option>
            <option value="number">
              number
            </option>
            <option value="pages">
              pages
            </option>
            <option value="month">
              month
            </option>
          </select>
          operator<select size="1" name="oprateFilde">
          <option value="if1">
              contains
            </option>
            <option value="if2">
              dose not contains
            </option>
            <option value="if3">
              begins with
            </option>
            <option value="if4">
              end with
            </option>
            <option value="if5">
              is equat to
            </option>
            <option value="if6">
              is less than
            </option>
            <option value="if7">
              is less than or equal
            </option>
            <option value="if8">
              more than or equal
            </option>
          </select>
          <h>value </h>
            <input
              type='text'
              name='valueArticle'
              onChange={this.myChangeHandler}
            />
            <button type="button">
              Add
            </button>
            <button type="button">
              Delete
            </button>
            <p />
            <button
              onClick={this.search.bind(this, "Goal")}
            > Serach </button>
          </Paper>
      </form>
    ) 
  }
}

SearchArticle.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SearchArticle)
