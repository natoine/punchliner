'use strict';

class Punchline extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="punchline">
        <span>
          tout va bien
        </span>
      </div>
    );
  }
}

const domContainer = document.querySelector('#main');
ReactDOM.render(<Punchline />, domContainer);