/* create by Soli 20190928*/
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Button from 'material-ui/Button'
import {Link} from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import Typography from 'material-ui/Typography'
import Tabs, { Tab } from 'material-ui/Tabs'
import ArticleList from '../articleSoli/ArticleList'
import PostList from '../post/PostList'

class ArticleTab extends Component {
  state = {
    tab: 0,
    posts: []
  }

  componentWillReceiveProps = (props) => {
    this.setState({tab:0})
  }
  handleTabChange = (event, value) => {
    this.setState({ tab: value })
  }

  render() {
    return (
    <div>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.tab}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Articles" />
            <Tab label="Status" />
            {/* <Tab label="Followers" /> */}
          </Tabs>
        </AppBar>
       {this.state.tab === 0 && <TabContainer><PostList removeUpdate={this.props.removePostUpdate} posts={this.props.posts}/></TabContainer>}
       {this.state.tab === 1 && <TabContainer><ArticleList people={this.props.user.following}/></TabContainer>}
      {/* {this.state.tab === 2 && <TabContainer><ArticleList people={this.props.user.followers}/></TabContainer>}*/}
    </div>)
  }
}

ArticleTab.propTypes = {
  user: PropTypes.object.isRequired,
  removePostUpdate: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired
}

const TabContainer = (props) => {
  return (
    <Typography component="div" style={{ padding: 8 * 2 }}>
      {props.children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
}

export default ArticleTab
