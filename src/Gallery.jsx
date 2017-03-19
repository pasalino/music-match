import React, { Component } from 'react';

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playingURL: '',
            playing: false,
            audio: null
        }
    }
  
    playAudio(previewURL) {
        let audio = new Audio(previewURL);
        if (!this.state.playing) {
            audio.play();
            this.setState({
                playingURL: previewURL,
                playing: true,
                audio
            });
        } else {
            if (this.state.playingURL === previewURL) {
                this.state.audio.pause();
                this.setState({
                    playing: false
                });
            } else {
                this.state.audio.pause();
                audio.play();
                this.setState({
                    playingURL: previewURL,
                    playing: true,
                    audio
                })
            }
        }
    }

    render() {
        console.log('gallery props', this.props);
        let { tracks } = this.props;
        console.log('gallery props', tracks);
        if ({ tracks } === null) tracks = [];

        return (
            <div className='gallery'>
                {tracks.map((track, k) => {
                    const img = track.album.images[0].url;
                    console.log('img', img);
                    return (
                        <div
                            key={k}
                            className="track"
                            onClick={() => {
                                this.playAudio(track.preview_url)
                            }}
                        >
                            <img src={img} alt="" className="track__img" />
                            <div className="track__play">
                                <div className="track_play__inner">
                                   {
                                       this.state.playingURL === track.preview_url
                                       ? <span>| |</span>
                                       : <span>&#9654;</span>
                                   }
                                   
                                </div>
                            </div>
                            <p className="track__text">{track.name}</p>
                        </div>
                    )
                })}
            </div>
        )

    }
}

export default Gallery;