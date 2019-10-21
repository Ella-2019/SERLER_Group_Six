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
  constructor(props){
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
    this.onLoadFile=this.onLoadFile.bind(this)
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
submitArticle = () => {
  const jwt = auth.isAuthenticated()
  if(this.articleData.get('author')==null){
    
     this.articleData.set('author', this.state.author)
     this.setState({ ['author']: this.state.author })
     this.articleData.set('title', this.state.title)
     this.setState({ ['title']: this.state.title })
     this.articleData.set('date', this.state.date)
     this.setState({ ['date']: this.state.date })
     this.articleData.set('annotation', this.state.annotation)
     this.setState({ ['annotation']: this.state.annotation })
     this.articleData.set('journal', this.state.journal)
     this.setState({ ['journal']: this.state.journal })
     this.articleData.set('volume', this.state.volume)
     this.setState({ ['volume']: this.state.volume })
     this.articleData.set('number', this.state.number)
     this.setState({ ['number']: this.state.number })
     this.articleData.set('pages', this.state.pages)
     this.setState({ ['pages']: this.state.pages })  
   }
  create({
    userId: jwt.user._id
  }, {
    t: jwt.token
  }, this.articleData).then((data) => {
    console.log(data)
     if (data.error) {
       console.log(data.error)
       this.setState({error: data.error})
      
     } else {
      
      this.setState({author:'', title:'', date:'', annotation:'', journal:'', volume:'', number:'', pages:''})
      
     }
  })
}

showFile = () => {
  if (window.File && window.FileReader && window.FileList && window.Blob) {
      
       var file = document.querySelector('input[type=file]').files[0];
       var reader = new FileReader()
       var textFile = /text.*/;
       const xx = this.state
       if (file.type.match(textFile)) {
          reader.onload = function (event) {
            // preview.innerHTML = event.target.result;
             console.log(event.target.result)
             console.log(xx)
          }
       } else {
         console.log("<span class='error'>It doesn't seem to be a text file!</span>")
       }
       reader.readAsText(file);

 } else {
    alert("Your browser is too old to support HTML5 File API");
 }
}



/////////////////////////////////
handleChange = name => event => {
  const value = name === 'filelink'
    ? event.target.files[0]
    : event.target.value
  this.articleData.set(name, value)
  this.setState({ [name]: value })
  console.log(this.state)
}
///////////////////////////////


///////////////////////////Read File and Set data
  onLoadFile = () => {
    var file = fileInput.files[0];
    var filestr="";
    var textType = /text.*/;
    var reader = new FileReader();
    var self = this;
    const xx = this.state
    

    if (file.type.match(textType)) {
      reader.onload = function(r) {
        filestr = reader.result;
        //console.log(filestr);

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
        self.setState({ author: strauthor },() => {
          return(
            console.log(self)
            // xx.setState({author: self.state.author}),
            // console.log(xx)
          )
        })

        console.log(content);
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
        var e = content.search("date");
        var strvolume=content.substring(d, e);
        strvolume=strvolume.replace("volume",'');
        self.setState({ volume: strvolume },() => console.log(self.state.volume),)
        content=content.replace(strvolume,'');
  
        e = content.search("date");
        var f = content.search("number");
        var strdate=content.substring(e,f);
        strdate=strdate.replace("date",'');
        self.setState({ date: strdate },() => console.log(self.state.date),)
        content=content.replace(strdate,'');
  
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
  
      } 
      reader.readAsText(file) 
    } 
   }


  render() {
    const {classes} = this.props
    return (   
        <div>
          <input type="file" name="file" id="fileInput" accept=".txt" onChange={this.onLoadFile}/>
          <Button color="primary" variant="raised" onClick={this.submitArticle}>SAVE FILE</Button>
          <CardContent className={classes.cardContent}>
            <Typography>FILE DETAILS</Typography>
              <TextField id="author" label="Article Author" value={this.state.author} onChange={this.handleChange('author')}className={classes.textField} /><br/>
              <TextField id="title" label="Article Title" value={this.state.title} onChange={this.handleChange('title')} className={classes.textField}/><br/>
              <TextField id="date" label="Date (YYYY-mm-dd)" value={this.state.date} onChange={this.handleChange('date')} className={classes.textField} /><br/>
              <TextField id="journal" label="Journal" value={this.state.journal} onChange={this.handleChange('journal')} className={classes.textField} /><br/>
              <TextField id="volume" label="Volume" value={this.state.volume} onChange={this.handleChange('volume')} className={classes.textField} /><br/>
              <TextField id="number" label="Number" value={this.state.number} onChange={this.handleChange('number')} className={classes.textField} /><br/>
              <TextField id="pages" label="Pages" value={this.state.pages} onChange={this.handleChange('pages')} className={classes.textField} /><br/>
              <TextField id="annotation" label="Description" value={this.state.annotation} onChange={this.handleChange('annotation')} className={classes.textField} /><br/>
          </CardContent>
         
        </div>
    ) 
  }
}

TextFileReader.propTypes = {
  classes: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired
}

export default withStyles(styles)(TextFileReader)
