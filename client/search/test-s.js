import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import List, {ListItem, ListItemSecondaryAction, ListItemText} from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import ArrowForward from 'material-ui-icons/ArrowForward'
import {Link} from 'react-router-dom'
//import {list} from './api-article.js.js'

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

class Test extends Component {
  state = {
      articles: []
  }

  
  componentDidMount() {
    list().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({users: data})
      }
    })
  }

  /*render() {
    const {classes} = this.props
    return (
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          All Article
        </Typography>
        <List dense>
         {this.state.articles.map((item, i) => {
          return <Link to={"/article/" + item._id} key={i}>
                    <ListItem button>
                      <ListItemText primary={item.name}/>
                    </ListItem>
                    <Typography className={classes.tileText}>{item.name}</Typography>
                 </Link>
               })
             }
        </List>
      </Paper>
    )
  }*/
  render() {
    const {classes} = this.props
    return (
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          All Article
        </Typography>
        <List dense>
         {this.state.articles.map((item, i) => {
          return <Link to={"/article/" + item._id} key={i}>
                    <ListItem button>
                      <ListItemText primary={item.name}/>
                    </ListItem>
                 </Link>
               })
             }
        </List>
      </Paper>
    )
  }
}


  /*render() {
    const {classes} = this.props
    return (
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          All Article
        </Typography>
      <GridList cellHeight={160} className={classes.gridList} cols={4}>
        {this.props.people.map((article, i) => {
           return  <GridListTile style={{'height':120}} key={i}>
              <Link to={"/article/" + article._id}>
                <Typography className={classes.tileText}>{article.name}</Typography>
              </Link>
            </GridListTile>
        })}
      </GridList>
      </Paper>
    )
  }
*/

Test.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Test)
