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

const header = [
  {
    name: 'Author',
    prop: 'author'
  },
  {
    name: 'Title',
    prop: 'title'
  },
  {
    name: 'Date of Publication',
    prop: 'date'
  }
]

const row = (item, i, header)=>(
  <TableRow key={i}>
    {
      header.map((y,k)=>(
        <TableCell key={k} align="left">
        {
          item[y.prop] //return the item with header = author, title, date, etc
        }
        </TableCell>
      ))      
    }
  </TableRow>
)

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

  render() {
    const {classes} = this.props
    const dat = this.state.articles
    return (
      <Paper className={classes.rootpaper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {
              header.map((item,i)=>
                <TableCell align="left" key={i}>{item.name}</TableCell>
              )
            }
            
          </TableRow>
        </TableHead>
        <TableBody>
          {
            dat.map((item,i)=>{
            return(
            row(item,i,header)
            )
          })
          }
        </TableBody>
      </Table>
    </Paper>
    )
  }
}

ArticleTable.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ArticleTable)