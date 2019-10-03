import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import List, {ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import ArrowForward from 'material-ui-icons/ArrowForward'
import Description from 'material-ui-icons/Description'
import MaterialTable from 'material-table'
import {Link} from 'react-router-dom'
import {list} from './api-article.js'   

const styles = theme => ({
  root: theme.mixins.gutters({
    padding: theme.spacing.unit,
    margin: theme.spacing.unit * 5
  }),
  title: {
    margin: `${theme.spacing.unit * 1}px 0 ${theme.spacing.unit * 2}px`,
    color: theme.palette.openTitle
  }
})

class FindArticle extends Component {
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

        <MaterialTable
        title="All Articles"
        columns={[
            { title: "AUTHOR", field: "author" },
            { title: "TITLE", field: "title" },
            { title: "DATE OF PUBLICATION", field: "date" },
            { title: "JOURNAL", field: "journal" },
            { title: "VOLUME", field: "volume" },

        ]}
        data={this.state.articles.map((item, i) => item )}        
        actions={[
          {
            icon: 'description',
            tooltip: 'View Details',
            onClick: (event, rowData) => alert("Coming Soon :P ")
          }
        ]}
      />

    )
  }
}

FindArticle.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(FindArticle)
