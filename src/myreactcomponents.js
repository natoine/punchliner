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
        <span>c'est de : {this.props.punchline.punchliner} dans {this.props.punchline.song}</span>
      </div>
    );
  }
}

const domContainer = document.querySelector('#main');

const samplepunchline = {"lyrics":"tout va bien", "song":"tout va bien", "punchliner":"orelsan"};

ReactDOM.render(<Punchline punchline={samplepunchline} />, domContainer);