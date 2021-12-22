'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Punchline = function (_React$Component) {
  _inherits(Punchline, _React$Component);

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
          this.props.punchline.lyrics
        ),
        React.createElement('br', null),
        React.createElement(Answer, { punchliner: this.props.punchline.punchliner, song: this.props.punchline.song })
      );
    }
  }]);

  return Punchline;
}(React.Component);

var Answer = function (_React$Component2) {
  _inherits(Answer, _React$Component2);

  function Answer(props) {
    _classCallCheck(this, Answer);

    var _this2 = _possibleConstructorReturn(this, (Answer.__proto__ || Object.getPrototypeOf(Answer)).call(this, props));

    _this2.state = { type: 'neutral', punchliner: props.punchliner, song: props.song };
    _this2.handleChange = _this2.handleChange.bind(_this2);
    return _this2;
  }

  _createClass(Answer, [{
    key: 'handleChange',
    value: function handleChange(event) {
      var uservalue = event.target.value;
      var answer = this.state.punchliner;
      if (uservalue.length > answer.length) this.setState({ type: "badanswer" });else if (uservalue.length < answer.length) this.setState({ type: "neutral" });else if (uservalue == answer) this.setState({ type: "goodanswer" });else this.setState({ type: "badanswer" });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'answer' },
        React.createElement(
          'label',
          null,
          'c\'est de qui ?'
        ),
        React.createElement('textarea', { onChange: this.handleChange, type: this.state.type })
      );
    }
  }]);

  return Answer;
}(React.Component);

var domContainer = document.querySelector('#main');

var samplepunchline = { "lyrics": "tout va bien", "song": "tout va bien", "punchliner": "orelsan" };

ReactDOM.render(React.createElement(Punchline, { punchline: samplepunchline }), domContainer);