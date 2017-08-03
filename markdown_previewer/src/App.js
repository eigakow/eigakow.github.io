import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var marked = require('marked');
var FontAwesome = require('react-fontawesome');


class App extends Component {
  render() {
    return (
      <div className="App">
        <Editor />
      </div>
    );
  }
}

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "half",
      contents: "Markdown Example - Main Heading\n===============\n\nParagraphs\n-------------\nParagraphs are separated\nby a blank line.\nLine Breaks\n-------------\nLeave 2 spaces at the end of a line to do a  \nline break\n\nLists\n-------------\n\n### Bulleted List\n\n* Foo\n* Bar\n\n### Numbered List\n\n1. Foo\n2. Bar\n\nFormatting\n----------\n\nCan be **bold** or *italic* or `monospace` or ~~strikethrough~~ .\n\nLinks\n-----\nClick [here](http://foo.com) to go somewhere."
    }
  }
  changeText = (event) => {
    console.log("Text was changed")
    this.setState({contents: event.target.value})
    console.log("New state is: ")
    console.log(this.state.contents)
  }

  render() {
    let editorVersion = "";
    switch (this.state.view){
      case 'half': editorVersion = 'Editor half'; break;
      case 'full': editorVersion = ""; break;
      case 'min': editorVersion = ""; break;
    }
    return (
      <div>
        {/*<FontAwesome size='2x' name='rocket' />*/}
        <textarea value={this.state.contents} onChange={this.changeText} className={editorVersion} />
        <Previewer contents={this.state.contents}/>
    </div>
    )
  }
}
export default App;

class Previewer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    //console.log(marked(this.props.contents))
    let text = marked(this.props.contents, {sanitize: true});
    return (
      <div className="Previewer">
        <div dangerouslySetInnerHTML={{__html: text}} />
    </div>
    )
  }

}
