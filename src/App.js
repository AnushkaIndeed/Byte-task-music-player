import React, { useState, useRef } from "react";
import "./App.css";

const songsData = [
  { title: "Fame-Dragging", artist: "The Grey Room", file: "/songs/song1.mp3" },
  { title: "By Myself", artist: "The Grey Room", file: "/songs/song2.mp3" },
  { title: "Nebula", artist: "The Grey Room", file: "/songs/song3.mp3" },
  { title: "Twinkle", artist: "The Grey Room", file: "/songs/song4.mp3" },
  { title: "Tell Em What They Wanna Hear", artist: "Everet Almond", file: "/songs/song5.mp3" },
];

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [activeTab, setActiveTab] = useState("all"); // all | fav
  const audioRef = useRef(null);

  const handlePlayPause = (song) => {
    if (currentSong?.file === song.file && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setCurrentSong(song);
      audioRef.current.src = song.file;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleFavourite = (song) => {
    if (favourites.find((fav) => fav.file === song.file)) {
      setFavourites(favourites.filter((fav) => fav.file !== song.file));
    } else {
      setFavourites([...favourites, song]);
    }
  };

  const SongList = ({ list }) => (
    <div>
      {list.map((song, index) => (
        <div key={index} className="song-card">
          <div>
            <strong>{song.title}</strong>
            <p>{song.artist}</p>
          </div>
          <div className="buttons">
            <button onClick={() => handlePlayPause(song)}>
              {currentSong?.file === song.file && isPlaying ? "⏸" : "▶"}
            </button>
            <button
              onClick={() => toggleFavourite(song)}
              className={
                favourites.find((fav) => fav.file === song.file)
                  ? "fav active"
                  : "fav"
              }
            >
              ♥
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="app">
      <h1>🎶 BeatFlow</h1>

      {activeTab === "all" ? (
        <>
          <h2>All Songs</h2>
          <SongList list={songsData} />
        </>
      ) : (
        <>
          <h2>⭐ Favourites</h2>
          {favourites.length > 0 ? (
            <SongList list={favourites} />
          ) : (
            <p>No favourites yet.</p>
          )}
        </>
      )}

      {/* hidden audio element */}
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />

      {/* bottom nav */}
      <div className="bottom-nav">
        <button
          className={activeTab === "all" ? "active" : ""}
          onClick={() => setActiveTab("all")}
        >
          🎵 All
        </button>
        <button
          className={activeTab === "fav" ? "active" : ""}
          onClick={() => setActiveTab("fav")}
        >
          ⭐ Favourites
        </button>
      </div>
    </div>
  );
}

export default App;
