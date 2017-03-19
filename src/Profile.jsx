import React, { Component } from 'react';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        let artist = {
            name: '',
            followers: {
                total: ''
            },
            images: [{ url: '' }],
            genres: []
        };
        artist = this.props.artist !== null ? this.props.artist : artist;
        return (
            <div className='profile'>
                <img
                    alt="Profile"
                    className="profile__image"
                    src={artist.images[0].url}
                />
                <div className="profile__Info">
                    <div className="profileInfo__name">{artist.name}</ div>
                    <div className="profileInfo__followers">
                        {artist.followers.total} followers
                    </div>
                    <div className="profileInfo__genres">
                        {
                            artist.genres.map((genre, k) => {
                                genre = genre === artist.genres[artist.genres.length - 1]
                                    ? `${genre}`
                                    : `${genre}, `;

                                return (
                                    <span key={k}>{genre}</span>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;