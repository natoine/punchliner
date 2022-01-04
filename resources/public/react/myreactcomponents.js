'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Punchliner = function (_React$Component) {
  _inherits(Punchliner, _React$Component);

  function Punchliner(props) {
    _classCallCheck(this, Punchliner);

    var _this = _possibleConstructorReturn(this, (Punchliner.__proto__ || Object.getPrototypeOf(Punchliner)).call(this, props));

    var maxlengthanswer = 0;
    var countpunchliners = 0;
    var punchliners = _this.props.punchline.punchliners;
    var punchlinerslength = punchliners.length;
    //todo fct
    for (countpunchliners; countpunchliners < punchlinerslength; countpunchliners++) {
      var lengthnamepunchliner = punchliners[countpunchliners].punchliner.length;
      if (lengthnamepunchliner > maxlengthanswer) maxlengthanswer = lengthnamepunchliner;
    }

    _this.state = {
      punchliners: punchliners,
      history: [],
      goodanswers: [],
      punchlinerstofind: punchlinerslength,
      stilltofind: punchlinerslength,
      countpunchlinesfound: 0,
      type: 'neutral',
      maxlengthanswer: maxlengthanswer
    };
    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  _createClass(Punchliner, [{
    key: 'handleChange',
    value: function handleChange(event) {
      var uservalue = event.target.value.toLowerCase();
      if (uservalue.length > this.state.maxlengthanswer) this.setState({ type: "badanswer" });else {
        var localtype = "neutral";
        var _countpunchliners = 0;
        var _punchliners = this.state.punchliners;
        var stilltofind = this.state.stilltofind;
        var goodanswers = this.state.goodanswers;
        var _punchlinerslength = _punchliners.length;
        while (_countpunchliners < _punchlinerslength && localtype == "neutral") {
          if (_punchliners[_countpunchliners].punchliner.toLowerCase() == uservalue) {
            localtype = "goodanswer";
            stilltofind = stilltofind - 1;
            goodanswers = goodanswers.concat({ lyrics: this.props.punchline.lyrics, punchliner: _punchliners[_countpunchliners].punchliner });
            _punchliners.splice(_countpunchliners, 1);
            //todo update maxlengthanswer
            //here we should manage history and make a new fetch to a punchline ?
          }
          _countpunchliners++;
        }
        this.setState({ type: localtype, stilltofind: stilltofind, punchliners: _punchliners, goodanswers: goodanswers });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'game' },
        React.createElement(Punchline, { lyrics: this.props.punchline.lyrics }),
        React.createElement('br', null),
        React.createElement(PunchlinersToFind, { count: this.state.stilltofind, max: this.state.punchlinerstofind }),
        React.createElement('br', null),
        React.createElement(
          'div',
          { className: 'answer' },
          React.createElement(
            'label',
            null,
            'c\'est de qui ?'
          ),
          React.createElement('textarea', { onChange: this.handleChange }),
          React.createElement(
            'div',
            { className: 'retour ' + this.state.type },
            React.createElement(
              'span',
              null,
              this.state.type == "goodanswer" ? "c'est ça" : "c'est pas ça"
            )
          )
        ),
        React.createElement(
          'button',
          { onClick: newpunchline },
          'Punchline Suivante'
        ),
        React.createElement('br', null),
        React.createElement(History, { history: this.state.history, punchlinersfound: this.state.goodanswers })
      );
    }
  }]);

  return Punchliner;
}(React.Component);

var History = function (_React$Component2) {
  _inherits(History, _React$Component2);

  function History() {
    _classCallCheck(this, History);

    return _possibleConstructorReturn(this, (History.__proto__ || Object.getPrototypeOf(History)).apply(this, arguments));
  }

  _createClass(History, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'history' },
        'vous avez trouv\xE9 ',
        this.props.history.length,
        ' punchlines et ',
        this.props.punchlinersfound.length,
        ' punchliners'
      );
    }
  }]);

  return History;
}(React.Component);

var PunchlinersToFind = function (_React$Component3) {
  _inherits(PunchlinersToFind, _React$Component3);

  function PunchlinersToFind() {
    _classCallCheck(this, PunchlinersToFind);

    return _possibleConstructorReturn(this, (PunchlinersToFind.__proto__ || Object.getPrototypeOf(PunchlinersToFind)).apply(this, arguments));
  }

  _createClass(PunchlinersToFind, [{
    key: 'render',
    value: function render() {
      var h1 = void 0;
      if (this.props.count == this.props.max) {
        h1 = React.createElement(
          'h1',
          null,
          this.props.count == 1 ? "Un punchliner à trouver" : this.props.count + " punchliners à trouver",
          ' '
        );
      } else {
        h1 = React.createElement(
          'h1',
          null,
          this.props.count == 1 ? "Encore un punchliner à trouver" : "Encore " + this.props.count + " punchliners à trouver",
          ' '
        );
      }
      return React.createElement(
        'div',
        { className: 'countpunchliners' },
        h1
      );
    }
  }]);

  return PunchlinersToFind;
}(React.Component);

var Punchline = function (_React$Component4) {
  _inherits(Punchline, _React$Component4);

  function Punchline() {
    _classCallCheck(this, Punchline);

    return _possibleConstructorReturn(this, (Punchline.__proto__ || Object.getPrototypeOf(Punchline)).apply(this, arguments));
  }

  _createClass(Punchline, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'punchline' },
        React.createElement(
          'h1',
          null,
          'de qui est cette punchline ?'
        ),
        React.createElement(
          'span',
          null,
          this.props.lyrics
        )
      );
    }
  }]);

  return Punchline;
}(React.Component);

function newpunchline() {
  location.reload();
}

var domContainer = document.querySelector('#main');

var urlfetch = "/punchline";
fetch(urlfetch).then(function (response) {
  response.json().then(function (samplepunchline) {
    ReactDOM.render(React.createElement(Punchliner, { punchline: samplepunchline }), domContainer);
  });
});