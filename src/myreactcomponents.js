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
  render() {
    return (
      <span>réponse : c'est de : {this.props.punchliner} dans : {this.props.song}</span>
    )
  }
}



const domContainer = document.querySelector('#main');

const samplepunchline = {"lyrics":"tout va bien", "song":"tout va bien", "punchliner":"orelsan"};

ReactDOM.render(<Punchline punchline={samplepunchline} />, domContainer);