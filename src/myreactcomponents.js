'use strict';

function newpunchline() {
  location.reload();
}

//init page

const domContainer = document.querySelector('#main');

fetch("/punchline").then(function(response){
  response.json().then(function(samplepunchline){
    ReactDOM.render(<Punchliner punchline={samplepunchline} />, domContainer);
  })
})

function maxlengthpunclhiners(punchliners) {
  let maxlengthanswer = 0;
  let punchlinerslength = punchliners.length;
  let countpunchliners = 0;
  for (countpunchliners; countpunchliners < punchlinerslength; countpunchliners++) {
    let lengthnamepunchliner = punchliners[countpunchliners].punchliner.length;
    if (lengthnamepunchliner > maxlengthanswer) maxlengthanswer = lengthnamepunchliner;
  }
  return maxlengthanswer;
}

class Punchliner extends React.Component {

  constructor(props) {
    super(props);
    let punchliners = this.props.punchline.punchliners;
    let punchlinerslength = punchliners.length;
    let maxlengthanswer = maxlengthpunclhiners(punchliners);

    this.state = {
      lyrics: this.props.punchline.lyrics,
      punchliners: punchliners,
      history: [],
      goodanswers: [],
      punchlinerstofind: punchlinerslength,
      stilltofind: punchlinerslength,
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
      let punchliners = this.state.punchliners;
      let stilltofind = this.state.stilltofind;
      let goodanswers = this.state.goodanswers;
      let punchlinerslength = punchliners.length;
      let newmaxlengthanwer = this.state.maxlengthanswer;
      while (countpunchliners < punchlinerslength && localtype == "neutral") {
        if (punchliners[countpunchliners].punchliner.toLowerCase() == uservalue) {
          localtype = "goodanswer";
          stilltofind = stilltofind - 1;
          goodanswers = goodanswers.concat({ lyrics: this.state.lyrics, punchliner: punchliners[countpunchliners].punchliner });
          punchliners.splice(countpunchliners, 1);
          //update maxlengthanswer
          newmaxlengthanwer = maxlengthpunclhiners(punchliners);
        }
        countpunchliners++;
      }
      if (stilltofind > 0) this.setState({ type: localtype, stilltofind: stilltofind, punchliners: punchliners, goodanswers: goodanswers, maxlengthanswer: newmaxlengthanwer });
      //need to go to the next punchline
      else {
        console.log("gonna fetch a new question");
        fetch("/punchline").then((response)=>{
          response.json().then((newpunchlinequestion)=>{
            console.log("fetch done");
            let history = [ ...this.state.history, this.props];
            let punchliners = newpunchlinequestion.punchliners;
            let punchlinerslength = punchliners.length;
            let newcountpuhcnlinesfound = this.state.countpunchlinesfound++;
            let newmaxlengthanswer = maxlengthpunclhiners(punchliners);
            this.setState({
              lyrics: newpunchlinequestion.lyrics,
              punchliners: punchliners,
              history: history,
              goodanswers: goodanswers,
              punchlinerstofind: punchlinerslength,
              stilltofind: punchlinerslength,
              countpunchlinesfound: newcountpuhcnlinesfound,
              type: "neutral",
              maxlengthanswer: newmaxlengthanswer
            })
          });
        });
      }
    }

  }

  render() {
    return (
      <div className="game">
        <Punchline lyrics={this.state.lyrics} />
        <br />
        <PunchlinersToFind count={this.state.stilltofind} max={this.state.punchlinerstofind} />
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
        <History history={this.state.history} punchlinersfound={this.state.goodanswers} />
      </div>
    );
  }
}

class History extends React.Component {

  render() {
    let listhistorique;
    let headlist;
    let punchlinersfoundslength = this.props.punchlinersfound.length;
    if (punchlinersfoundslength > 0) {
      headlist = <div><h2>Punchline</h2><h2>punchliner</h2></div>;
      listhistorique = this.props.punchlinersfound.map(function (punchliner, count) {
        return (<HistoryLine lyrics={punchliner.lyrics} punchliner={punchliner.punchliner} key={count} />);
      });
    }
    return (
      <div className="history">
        <h2>vous avez trouvé {this.props.history.length} punchlines et {this.props.punchlinersfound.length} punchliners</h2>
        {headlist}
        {listhistorique}
      </div>
    )
  }

}

class HistoryLine extends React.Component {
  render() {
    return (
      <div className="historyline">
        <span>{this.props.lyrics}</span>
        <span>{this.props.punchliner}</span>
      </div>
    )
  }
}

class PunchlinersToFind extends React.Component {
  render() {
    let h1;
    if (this.props.count == this.props.max) {
      h1 = <h1>{this.props.count == 1 ? "Un punchliner à trouver" : this.props.count + " punchliners à trouver"} </h1>;
    }
    else {
      h1 = <h1>{this.props.count == 1 ? "Encore un punchliner à trouver" : "Encore " + this.props.count + " punchliners à trouver"} </h1>;
    }
    return (
      <div className="countpunchliners">
        {h1}
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