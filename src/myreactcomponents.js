'use strict';

class Punchline extends React.Component {
  render() {
    return (
      <div className="punchline">
        <h1>de qui est cette punchline ?</h1>
        <span>
          {this.props.punchline.lyrics}
        </span>
        <br/>
        <Answer punchliner={this.props.punchline.punchliner} song={this.props.punchline.song} />
      </div>
    );
  }
}

class Answer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {type: 'neutral', punchliner: props.punchliner, song: props.song};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if(event.target.value ==  this.state.punchliner)
    {
      console.log("good answer", this.state.punchliner);
      this.setState({type: "goodanswer"});
    }
    else this.setState({type: "neutral"});
  }

  render() {
    return (
      <div className="answer">
        <label>c'est de qui ?</label>
        <textarea onChange={this.handleChange} type={this.state.type}/>
      </div>
    )
  }
}



const domContainer = document.querySelector('#main');

const samplepunchline = {"lyrics":"tout va bien", "song":"tout va bien", "punchliner":"orelsan"};

ReactDOM.render(<Punchline punchline={samplepunchline} />, domContainer);