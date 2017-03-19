/**
 * Created by pasalino on 17/03/17.
 */
// eslint-disable-next-line
import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            artist: null
        }
    }

    search() {
        console.log('this.state', this.state);
        if (this.state.query === '') {
            this.setState({ artist: null });
            return;
        }
        const BASE_URL = 'http://api.spotify.com/v1/search';
        let FETCH_URL = `${BASE_URL}?q=${this.state.query}&type=artist&limit=1`;
        const ALBUM_URL = 'http://api.spotify.com/v1/artists/';

        fetch(FETCH_URL, { method: 'GET' })
            .then(response => response.json())
            .then(json => {
                console.log('artist', json);
                if (json.artists.items.length !== 0) {
                    const artist = json.artists.items[0];
                    console.log('artist', artist);
                    FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=IT`;
                    console.log('albumurl', FETCH_URL);
                    fetch(FETCH_URL, { method: 'GET' })
                        .then(response => response.json())
                        .then(json => {
                            console.log('artist track', json);
                            const { tracks } = json;
                            this.setState({ tracks });
                        });
                    this.setState({ artist });
                } else {
                    this.setState({ artist: null });
                }

            });
    }

    render() {
        return (
            <div className="App">
                <div className="App-title">Music Master</div>
                <div>
                    <FormGroup>
                        <InputGroup>
                            <FormControl
                                type="text"
                                placeholder="Search Artist..."
                                value={this.state.query}
                                onChange={event => this.setState({ query: event.target.value })}
                                onKeyPress={event => { if (event.key === 'Enter') this.search(); }}>
                            </FormControl>
                            <InputGroup.Addon onClick={() => this.search()}>
                                <Glyphicon glyph="search"></Glyphicon>
                            </InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                    {
                        this.state.artist !== null ?
                            <div>
                                <Profile artist={this.state.artist}></Profile>
                                <Gallery tracks={this.state.tracks} />
                            </div>
                            :
                            <div></div>
                    }
                </div>
            </div>
        )
    }
}

export default App;
