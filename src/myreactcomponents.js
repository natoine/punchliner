'use strict';

class Punchliner extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          punchline: props.punchline
        }
      ],
      goodanswers: [],
      punchlinerstofind: props.punchline.punchliners.length,
      countpunchlines: 0
    }
  }

  render() {
    return (
        <div className="game">
          <Punchline lyrics={this.props.punchline.lyrics} />
          <br />
          <PunchlinersToFind count={this.state.punchlinerstofind} />
          <br />
          <Answer punchliners={this.props.punchline.punchliners} />
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
      <div className="history">votre historique de punchlines ici</div>
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

class Answer extends React.Component {

  constructor(props) {
    super(props);
    let maxlength = 0;
    let countpunchliners = 0;
    for (countpunchliners; countpunchliners < this.props.punchliners.length; countpunchliners++) {
      let lengthnamepunchliner = this.props.punchliners[countpunchliners].punchliner.length;
      if (lengthnamepunchliner > maxlength) maxlength = lengthnamepunchliner;
    }
    this.state = { type: 'neutral', punchliners: this.props.punchliners, maxlengthanswer: maxlength };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let uservalue = event.target.value.toLowerCase();
    if (uservalue.length > this.state.maxlengthanswer) this.setState({ type: "badanswer" });
    else {
      let localtype = "neutral";
      let countpunchliners = 0;
      while (countpunchliners < this.state.punchliners.length && localtype == "neutral") {
        if (this.state.punchliners[countpunchliners].punchliner.toLowerCase() == uservalue) localtype = "goodanswer";
        countpunchliners++;
      }
      this.setState({ type: localtype });
    }

  }

  render() {
    return (
      <div className="answer">
        <label>c'est de qui ?</label>
        <textarea onChange={this.handleChange} infomaxlength={this.state.maxlengthanswer} />
        <div className={`retour ${this.state.type}`}>
          <span>{this.state.type == "goodanswer" ? "c'est ça" : "c'est pas ça"}</span>
        </div>
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