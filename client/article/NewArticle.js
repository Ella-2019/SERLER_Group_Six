import React, {Component} from 'react'
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import Icon from 'material-ui/Icon'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import {create} from './api-article'
import auth from './../auth/auth-helper'
import IconButton from 'material-ui/IconButton'
import PhotoCamera from 'material-ui-icons/PhotoCamera'

const styles = theme => ({
  root: {
    backgroundColor: '#efefef',
    padding: `${theme.spacing.unit*3}px 0px 1px`
  },
  card: {
    maxWidth:600,
    margin: 'auto',
    marginBottom: theme.spacing.unit*3,
    backgroundColor: 'rgba(65, 150, 136, 0.09)',
    boxShadow: 'none'
  },
  cardContent: {
    backgroundColor: 'white',
    paddingTop: 0,
    paddingBottom: 0
  },
  cardHeader: {
    paddingTop: 8,
    paddingBottom: 8
  },
  photoButton: {
    height: 30,
    marginBottom: 5
  },
  input: {
    display: 'none',
  },
  textField: {
    marginLeft: theme.spacing.unit*2,
    marginRight: theme.spacing.unit*2,
    width: '90%'
  },
  submit: {
    margin: theme.spacing.unit * 2
  },
  filename:{
    verticalAlign: 'super'
  }
})

class NewArticle extends Component {
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
  componentDidMount = () => {
    this.articleData = new FormData()
    this.setState({user: auth.isAuthenticated().user})
  }
  clickArticle = () => {
    const jwt = auth.isAuthenticated()
    create({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, this.articleData).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({author:'', title:'', date:'', annotation:'', journal:'', volume:'', number:'', pages:''})
        this.props.addUpdate(data)
      }
    })
  }
  handleChange = name => event => {
    const value = name === 'filelink'
      ? event.target.files[0]
      : event.target.value
    this.articleData.set(name, value)
    this.setState({ [name]: value })
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

        
        // alert(content);
      } 
      //reader.readAsText(file,str); 
      reader.readAsText(file); 
    } 
   }
///////////////////////////////

  render() {
    const {classes} = this.props
    return (<div className={classes.root}>
      <Card className={classes.card}>
      <CardContent className={classes.cardContent}>  
        <Typography>BIBLIOGRAPHIC DETAILS</Typography>
          <TextField id="author" label="Article Author" value={this.state.author} onChange={this.handleChange('author')}className={classes.textField} margin="normal"/><br/>
          <TextField id="title" label="Article Title" value={this.state.title} onChange={this.handleChange('title')} className={classes.textField} margin="normal"/><br/>
          <TextField id="date" label="Date (YYYY-mm-dd)" value={this.state.date} onChange={this.handleChange('date')} className={classes.textField} margin="normal"/><br/>
          <TextField id="journal" label="Journal" value={this.state.journal} onChange={this.handleChange('journal')} className={classes.textField} margin="normal"/><br/>
          <TextField id="volume" label="Volume" value={this.state.volume} onChange={this.handleChange('volume')} className={classes.textField} margin="normal"/><br/>
          <TextField id="number" label="Number" value={this.state.number} onChange={this.handleChange('number')} className={classes.textField} margin="normal"/><br/>
          <TextField id="pages" label="Pages" value={this.state.pages} onChange={this.handleChange('pages')} className={classes.textField} margin="normal"/><br/>
          <TextField id="annotation" label="Description" value={this.state.annotation} onChange={this.handleChange('annotation')} className={classes.textField} margin="normal"/><br/>
        {/* <TextFileReader userId={this.state.user._id}/> */}
        <input type="file" name="file" id="fileInput" accept=".txt" onChange={this.onLoadFile}/>
      </CardContent>
      <CardActions>
        <Button color="primary" variant="raised" disabled={this.state.author === ''} onClick={this.clickArticle} className={classes.submit}>SUBMIT</Button>
      </CardActions>
    </Card>
  </div>)
  }
}

NewArticle.propTypes = {
  classes: PropTypes.object.isRequired,
  addUpdate: PropTypes.func.isRequired
}

export default withStyles(styles)(NewArticle)