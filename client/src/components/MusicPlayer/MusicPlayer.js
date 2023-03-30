import React, { useState, useEffect, useRef } from "react";
import './musicplayer.css'

const MusicPlayer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentSong, setCurrentSong] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef();
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const fetchAccessToken = async () => {
      const response = await fetch(
        "https://accounts.spotify.com/api/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${btoa(
              "81185dbb8f8d40aa9cf655885c2c002b:88d1447cbd1f452ba24135e3cfa62570"
            )}`,
          },
          body: "grant_type=client_credentials",
        }
      );
      const data = await response.json();
      setAccessToken(data.access_token);
    };

    fetchAccessToken();
  }, []);

  const handleSearch = () => {
    fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data.tracks.items);
      })
      .catch((error) => console.log(error));
  };

  const handlePlay = () => {
    setIsPlaying(true);
    audioRef.current.play();
  };

  const handlePause = () => {
    setIsPlaying(false);
    audioRef.current.pause();
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentSong("");
    audioRef.current.pause();
  };

  const handleSongClick = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    audioRef.current.src = song.preview_url;
    audioRef.current.play();
  };

  return (
    <div>
      <div className='music-player'>
        <input
          type="text"
          placeholder="Search for a song"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button className='music-button' onClick={handleSearch}>Search</button>
        <br />
        <br />
        {searchResults.map((song) => (
          <div key={song.id}>
            <img className='song-img' src={song.album.images[0].url} alt={song.name} />
            <h2>{song.name}</h2>
            <p>{song.artists[0].name}</p>
            <button className='music-button' onClick={() => handleSongClick(song)}>Play</button>
          </div>
        ))}
        <br />
        {currentSong && (
          <div>
            <h2>Currently playing: {currentSong.name}</h2>
            <button className='music-button' onClick={isPlaying ? handlePause : handlePlay}>
              {isPlaying ? "Pause" : "Play"}
            </button>
            <button className='music-button' onClick={handleStop}>Stop</button>
          </div>
        )}
        <audio ref={audioRef} />
      </div>
    </div>
  );
};

export default MusicPlayer;
