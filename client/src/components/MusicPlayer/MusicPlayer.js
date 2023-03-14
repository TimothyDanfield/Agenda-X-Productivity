// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./musicplayer.css";

// const MusicPlayer = () => {
//   const [musicData, setMusicData] = useState([]);

//   useEffect(() => {
//     axios
//       .get("https://example.com/api/music-library")
//       .then((res) => setMusicData(res.data))
//       .catch((err) => console.log(err));
//   }, []);

//   const searchMusic = (e) => {
//     e.preventDefault();

//     const searchTerm = e.target.searchTerm.value;

//     axios
//       .get("https://example.com/api/music-library", { params: { searchTerm } })
//       .then((res) => setMusicData(res.data))
//       .catch((err) => console.log(err));
//   };

//   const playPauseHandler = (e) => {
//     if (e.target.className === "play") {
//       e.target.className = "pause";
//     } else if (e.target.className === "pause") {
//       e.target.className = "play";
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={searchMusic}>
//         <input type="text" name="searchTerm" />
//         <button type="submit">Search</button>
//       </form>

//       <ul>
//         {musicData &&
//           musicData.map((track, index) => (
//             <li key={index}>
//               <div className="track-info">
//                 <h3>{track["title"]}</h3>

//                 <p>{track["artist"]}</p>
//               </div>

//               <button className="play" onClick={playPauseHandler}></button>
//             </li>
//           ))}
//       </ul>
//     </div>
//   );
// };
// export default MusicPlayer;
