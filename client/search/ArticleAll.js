import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Article from './SearchArticle'

class ArticleListAll extends Component {
  render() {
    return (
        //console.log(this.props),
      <div style={{marginTop: '24px'}}>
        {this.props.articles.map((item, i) => {
            console.log('lalala')
            return <Article article={item} key={i} />
          })
        }
      </div>
    )
  }
}
ArticleListAll.propTypes = {
  articles: PropTypes.array.isRequired
}
export default ArticleListAll
