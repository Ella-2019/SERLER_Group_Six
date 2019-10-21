import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import {list} from './api-article.js'   
import { connect } from 'react-redux'
import { FilterDrawer, filterSelectors, filterActions } from 'material-ui-filter'
import source from './data.json'

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

class ArticleTable extends Component {
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
  renderItem = (i, k) => {
    const { list } = this.props
    const key = i
    const val = list[i]

    return (
      <div key={i}>
        <ListItem key={key} id={key}>
          <div key={i} style={{ display: 'flex' }}>
            <div style={{ width: 200 }}>{val.name}</div>
            <div style={{ width: 400 }}>{val.email}</div>
            <div style={{ width: 200 }}>{val.registered}</div>
            <div style={{ width: 200 }}>{val.isActive ? 'Active' : ''}</div>
          </div>
        </ListItem>
        <Divider />
      </div>
    )
  }


  render() {
    const { setFilterIsOpen, list, setSearch, muiTheme, classes } = this.props
    const filterFields = [
      { name: 'name', label: 'Name' },
      { name: 'email', label: 'Email' },
      { name: 'registered', label: 'Registered', type: 'date' },
      { name: 'isActive', label: 'Is Active', type: 'bool' },
    ];

    return (
      <div>
        lala
        <FilterDrawer
          name={'demo'}
          fields={filterFields}

          //localising the DatePicker
          locale={'de-DE'}
          DateTimeFormat={global.Intl.DateTimeFormat}
            okLabel="OK"
          cancelLabel="Abbrechen"
        />
      </div>
    )
  }
}

ArticleTable.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const { filters, muiTheme } = state
  const { hasFilters } = filterSelectors.selectFilterProps('demo', filters)
  const list = filterSelectors.getFilteredList('demo', filters, source /*, fieldValue => fieldValue.val*/)

  return {
    hasFilters,
    list
  }
}

export default connect(
  mapStateToProps,
  { ...filterActions }
)(withStyles(styles)(ArticleTable))