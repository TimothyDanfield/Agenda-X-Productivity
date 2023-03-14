import React from "react";
import Howler from "howler";

class MusicPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      song: null,
    };

    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
  }

  componentDidMount() {
    const song = new Howler({
      src: [this.props.song], 
      loop: true, 
      volume: 0.5, 
    });

    this.setState({ song }); 
  }

  play() {
   
    const { playing, song } = this.state;

    if (!playing) {
      
      song.play(); 

      this.setState({ playing: true }); 
    } else {
      
      song.pause(); 

      this.setState({ playing: false }); 
    }
  }

  stop() {
    
    const { song } = this.state;

    if (song) {
      song.stop();

      this.setState({ playing: false });
    }
  }

  render() {
    return (
      <div className="music-player">
        <button onClick={this.play}>Play/Pause</button>
        <button onClick={this.stop}>Stop</button>
      </div>
    );
  }
}
export default MusicPlayer;
