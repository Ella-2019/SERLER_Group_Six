import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import auth from './../auth/auth-helper'
import Button from 'material-ui/Button'
import {create} from './api-article'
import TextField from 'material-ui/TextField'
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card'
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

class TextFileReader extends Component {
    constructor(props) {
    super(props)
    this.state = {
      author: '',
      title: '',
      date: '',
      annotation: '',
      journal:'',
      volume:'',
      number:'',
      pages:'',
      filelink: '',
      error: '',
      user: {}
    }
      this.onLoadFile = this.onLoadFile.bind(this);
    }
  ///////////////////////////Read File and Set data

  onLoadFile = function (event){
    var file = fileInput.files[0];
    var filestr="";
    var textType = /text.*/;
    var str ="";
    var reader = new FileReader();
    var self = this;
    if (file.type.match(textType)) {
      reader.onload = function(r) {
        filestr = reader.result;
        //console.log(filestr);
        //self.setState({ src: filestr },() => console.log(self.state.src),)
        //find states
        var content=filestr;
        var i=0;
        while (i < 7) {
          content=content.replace("}",'');
          content=content.replace("{",'');
          content=content.replace("=",'');
          content=content.replace(",",'');
          i++;
        }
        var a = content.search("author");
        var b = content.search("title");
        var strauthor=content.substring(a, b);
        strauthor=strauthor.replace("author",'');
        self.setState({ author: strauthor },() => console.log(self.state.author),)
        content=content.replace(strauthor,'');
        
        var b = content.search("title");
        var c = content.search("journal");
        var strtitle=content.substring(b, c);
        strtitle=strtitle.replace("title",'');
        self.setState({ title: strtitle },() => console.log(self.state.title),)
        content=content.replace(strtitle,'');
        
        c = content.search("journal");
        var d = content.search("volume");
        var strjournal=content.substring(c, d);
        strjournal=strjournal.replace("journal",'');
        self.setState({ journal: strjournal },() => console.log(self.state.journal),)
        content=content.replace(strjournal,'');
        
        d = content.search("volume");
        var e = content.search("year");
        var strvolume=content.substring(d, e);
        strvolume=strvolume.replace("volume",'');
        self.setState({ volume: strvolume },() => console.log(self.state.volume),)
        content=content.replace(strvolume,'');

        e = content.search("year");
        var f = content.search("number");
        var stryear=content.substring(e,f);
        stryear=stryear.replace("year",'');
        self.setState({ year: stryear },() => console.log(self.state.year),)
        content=content.replace(stryear,'');

        f = content.search("number");
        var g = content.search("pages");
        var strnumber=content.substring(f, g);
        strnumber=strnumber.replace("number",'');
        self.setState({ number: strnumber },() => console.log(self.state.number),)
        content=content.replace(strnumber,'');
        
        g = content.search("pages");
        var strpages=content.substr(g);
        strpages=strpages.replace("pages",'');
        self.setState({ pages: strpages },() => console.log(self.state.pages),)

        
        // alert(content);
      } 
      //reader.readAsText(file,str); 
      reader.readAsText(file); 
    } 
   }
///////////////////////////////
componentDidMount = () => {
  this.articleData = new FormData()
  this.setState({user: auth.isAuthenticated().user})
}
///////////////////////////////
clickArticle = () => {
  const jwt = auth.isAuthenticated()
  create({
    userId: jwt.user._id
  }, {
    t: jwt.token
  }, this.articleData).then((data) => {
    if (data.error) {
      console.log(data.error)
      this.setState({error: data.error})
      
    } else {
      this.setState({author:'', title:'', date:'', annotation:'', journal:'', volume:'', number:'', pages:''})
      
    }
  })
}
//////////////////////////////////
handleChange = name => event => {
  const value = name === 'filelink'
    ? event.target.files[0]
    : event.target.value
  this.articleData.set(name, value)
  this.setState({ [name]: value })
}
///////////////////////////////
  render() {
    const {classes} = this.props
    return (   
        <div>
          <input type="file" name="file" id="fileInput" accept=".txt" onChange={this.onLoadFile}/>
          <CardContent className={classes.cardContent}>
            <Typography>FILE DETAILS</Typography>
              <TextField id="author" label="Article Author" value={this.state.author} onClick={this.handleChange('author')}className={classes.textField} /><br/>
              <TextField id="title" label="Article Title" value={this.state.title} onClick={this.handleChange('title')} className={classes.textField}/><br/>
              <TextField id="date" label="Date (YYYY-mm-dd)" value={this.state.date} onChange={this.handleChange('date')} className={classes.textField} /><br/>
              <TextField id="journal" label="Journal" value={this.state.journal} onClick={this.handleChange('journal')} className={classes.textField} /><br/>
              <TextField id="volume" label="Volume" value={this.state.volume} onClick={this.handleChange('volume')} className={classes.textField} /><br/>
              <TextField id="number" label="Number" value={this.state.number} onClick={this.handleChange('number')} className={classes.textField} /><br/>
              <TextField id="pages" label="Pages" value={this.state.pages} onClick={this.handleChange('pages')} className={classes.textField} /><br/>
              <TextField id="annotation" label="Description" value={this.state.annotation} onClick={this.handleChange('annotation')} className={classes.textField} /><br/>
          </CardContent>
          <Button color="primary" variant="raised" onClick={this.clickArticle}>SAVE FILLE</Button>
        </div>
    ) 
  }
}

TextFileReader.propTypes = {
  classes: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired
}

export default withStyles(styles)(TextFileReader)
