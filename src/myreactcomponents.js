'use strict';

class Punchliner extends React.Component {

  constructor(props) {
    super(props);
    let maxlengthanswer = 0;
    let countpunchliners = 0;
    let punchliners = this.props.punchline.punchliners ;
    let punchlinerslength = punchliners.length ;
    for (countpunchliners; countpunchliners < punchlinerslength; countpunchliners++) {
      let lengthnamepunchliner = punchliners[countpunchliners].punchliner.length;
      if (lengthnamepunchliner > maxlengthanswer) maxlengthanswer = lengthnamepunchliner;
    }

    this.state = {
      history: [
      ],
      goodanswers: [],
      punchlinerstofind: punchlinerslength,
      countpunchlinesfound: 0,
      type: 'neutral',
      maxlengthanswer: maxlengthanswer
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let uservalue = event.target.value.toLowerCase();
    if (uservalue.length > this.state.maxlengthanswer) this.setState({ type: "badanswer" });
    else {
      let localtype = "neutral";
      let countpunchliners = 0;
      let punchliners = this.props.punchline.punchliners ;
      while (countpunchliners < punchliners.length && localtype == "neutral") {
        if (punchliners[countpunchliners].punchliner.toLowerCase() == uservalue) {
          localtype = "goodanswer";
        }
        countpunchliners++;
      }
      this.setState({ type: localtype });
    }

  }

  render() {
    return (
      <div className="game">
        <Punchline lyrics={this.props.punchline.lyrics} />
        <br />
        <PunchlinersToFind count={this.state.punchlinerstofind} />
        <br />
        <div className="answer">
          <label>c'est de qui ?</label>
          <textarea onChange={this.handleChange} />
          <div className={`retour ${this.state.type}`}>
            <span>{this.state.type == "goodanswer" ? "c'est ça" : "c'est pas ça"}</span>
          </div>
        </div>
        <button onClick={newpunchline}>Punchline Suivante</button>
        <br />
        <History history={this.state.history} />
      </div>
    );
  }
}


class History extends React.Component {
  render() {
    return (
      <div className="history">vous avez trouvé {this.props.history.length} punchlines</div>
    )
  }
}

class PunchlinersToFind extends React.Component {
  render() {
    return (
      <div className="countpunchliners">
        <h1>{this.props.count == 1 ? "Un punchliner à trouver" : this.props.count + " punchliners à trouver"} </h1>
      </div>
    )
  }
}

class Punchline extends React.Component {
  render() {
    return (
      <div className="punchline">
        <h1>de qui est cette punchline ?</h1>
        <span>
          {this.props.lyrics}
        </span>
      </div>
    )
  }
}

function newpunchline() {
  location.reload();
}

const domContainer = document.querySelector('#main');

const urlfetch = "/punchline";
fetch(urlfetch).then(function (response) {
  response.json().then(
    function (samplepunchline) {
      ReactDOM.render(<Punchliner punchline={samplepunchline} />, domContainer);
    }
  )
});