import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Article from './Article'

class ArticleList extends Component {
  render() {
    return (
        //console.log(this.props),
      <div style={{marginTop: '24px'}}>
        {this.props.articles.map((item, i) => {
            console.log('lalala')
            return <Article article={item} key={i} onRemove={this.props.removeUpdate}/>
          })
        }
      </div>
    )
  }
}
ArticleList.propTypes = {
  articles: PropTypes.array.isRequired,
  removeUpdate: PropTypes.func.isRequired
}
export default ArticleList
