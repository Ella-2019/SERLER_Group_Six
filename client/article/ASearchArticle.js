import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Grid from 'material-ui/Grid'
import {QueryBuilderComponent} from '@syncfusion/ej2-react-querybuilder';


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
  }
  render() {
    const {classes} = this.props
    
    return (
      <div className={classes.root}>
        {this.state.defaultPage &&
          <Grid container spacing={24}>
               <Typography align='center' type="headline" className={classes.title}>
                  Advanced Search
                </Typography>
                <QueryBuilderComponent />
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
