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

    _this.state = {
      history: [{
        punchline: props.punchline
      }],
      goodanswers: [],
      punchlinerstofind: props.punchline.punchliners.length,
      countpunchlines: 0
    };
    return _this;
  }

  _createClass(Punchliner, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "game" },
        React.createElement(Punchline, { lyrics: this.props.punchline.lyrics }),
        React.createElement("br", null),
        React.createElement(PunchlinersToFind, { count: this.state.punchlinerstofind }),
        React.createElement("br", null),
        React.createElement(Answer, { punchliners: this.props.punchline.punchliners }),
        React.createElement(
          "button",
          { onClick: newpunchline },
          "Punchline Suivante"
        ),
        React.createElement("br", null),
        React.createElement(
          "div",
          { className: "history" },
          "votre historique de punchline ici"
        )
      );
    }
  }]);

  return Punchliner;
}(React.Component);

var PunchlinersToFind = function (_React$Component2) {
  _inherits(PunchlinersToFind, _React$Component2);

  function PunchlinersToFind() {
    _classCallCheck(this, PunchlinersToFind);

    return _possibleConstructorReturn(this, (PunchlinersToFind.__proto__ || Object.getPrototypeOf(PunchlinersToFind)).apply(this, arguments));
  }

  _createClass(PunchlinersToFind, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "countpunchliners" },
        React.createElement(
          "h1",
          null,
          this.props.count == 1 ? "Un punchliner à trouver" : this.props.count + " punchliners à trouver",
          " "
        )
      );
    }
  }]);

  return PunchlinersToFind;
}(React.Component);

var Punchline = function (_React$Component3) {
  _inherits(Punchline, _React$Component3);

  function Punchline() {
    _classCallCheck(this, Punchline);

    return _possibleConstructorReturn(this, (Punchline.__proto__ || Object.getPrototypeOf(Punchline)).apply(this, arguments));
  }

  _createClass(Punchline, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "punchline" },
        React.createElement(
          "h1",
          null,
          "de qui est cette punchline ?"
        ),
        React.createElement(
          "span",
          null,
          this.props.lyrics
        )
      );
    }
  }]);

  return Punchline;
}(React.Component);

var Answer = function (_React$Component4) {
  _inherits(Answer, _React$Component4);

  function Answer(props) {
    _classCallCheck(this, Answer);

    var _this4 = _possibleConstructorReturn(this, (Answer.__proto__ || Object.getPrototypeOf(Answer)).call(this, props));

    var maxlength = 0;
    var countpunchliners = 0;
    for (countpunchliners; countpunchliners < _this4.props.punchliners.length; countpunchliners++) {
      var lengthnamepunchliner = _this4.props.punchliners[countpunchliners].punchliner.length;
      if (lengthnamepunchliner > maxlength) maxlength = lengthnamepunchliner;
    }
    _this4.state = { type: 'neutral', punchliners: _this4.props.punchliners, maxlengthanswer: maxlength };
    _this4.handleChange = _this4.handleChange.bind(_this4);
    return _this4;
  }

  _createClass(Answer, [{
    key: "handleChange",
    value: function handleChange(event) {
      var uservalue = event.target.value.toLowerCase();
      if (uservalue.length > this.state.maxlengthanswer) this.setState({ type: "badanswer" });else {
        var localtype = "neutral";
        var _countpunchliners = 0;
        while (_countpunchliners < this.state.punchliners.length && localtype == "neutral") {
          if (this.state.punchliners[_countpunchliners].punchliner.toLowerCase() == uservalue) localtype = "goodanswer";
          _countpunchliners++;
        }
        this.setState({ type: localtype });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "answer" },
        React.createElement(
          "label",
          null,
          "c'est de qui ?"
        ),
        React.createElement("textarea", { onChange: this.handleChange, infomaxlength: this.state.maxlengthanswer }),
        React.createElement(
          "div",
          { className: "retour " + this.state.type },
          React.createElement(
            "span",
            null,
            this.state.type == "goodanswer" ? "c'est ça" : "c'est pas ça"
          )
        )
      );
    }
  }]);

  return Answer;
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