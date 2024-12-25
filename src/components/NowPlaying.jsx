import { FaPlay, FaPause, FaBackward, FaForward } from "react-icons/fa";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import { FaShuffle, FaRepeat } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { playNext, playPrevious, pauseTrack, playTrack } from "../slices/musicSlice";

const NowPlaying = ({ currentTrack, isPlaying, howlInstance, duration }) => {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;

    if (howlInstance && isPlaying) {
      interval = setInterval(() => {
        const currentTime = howlInstance.seek() || 0;
        setProgress(currentTime);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [howlInstance, isPlaying]);

  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * duration;
    howlInstance.seek(newTime);
    setProgress(newTime);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="w-full now-playing text-white bg-[#6B0000] rounded-lg p-2 py-4 flex flex-col items-center gap-2">
      {currentTrack ? (
        <>
          <div className="track-details w-full lg:block hidden">
            <div className="overflow-hidden rounded-lg h-[100px]">
              <img
                src={currentTrack.thumbnail}
                alt={`${currentTrack.title} Cover`}
                className="track-thumbnail rounded-lg w-full h-full object-cover object-center"
              />
            </div>
            <div className="track-info text-center">
              <h3 className="text-lg py-4 min-h-[120px]">{currentTrack.title}</h3>
              <p className="text-xs">{currentTrack.artist}</p>
            </div>
          </div>
          <div className="track-progress flex items-center justify-between gap-2">
            <span className="text-xs">{formatTime(progress)}</span>
            <input
              type="range"
              min="0"
              max="100"
              value={(progress / duration) * 100 || 0}
              onChange={handleSeek}
              className="h-1"
            />
            <span className="text-xs">{formatTime(duration)}</span>
          </div>
          <div className="track-controls w-full flex items-center justify-around">
            <FaRepeat/>
            <button onClick={() => dispatch(playPrevious())}>
              <MdSkipPrevious fontSize="1.5rem" />
            </button>
            <button className="p-2 bg-[#450609] rounded-md"
              onClick={() =>
                isPlaying
                  ? dispatch(pauseTrack())
                  : dispatch(playTrack(currentTrack))
              }
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button onClick={() => dispatch(playNext())}>
              <MdSkipNext fontSize="1.5rem" />
            </button>
            <FaShuffle/>
          </div>
        </>
      ) : (
        <p>No track selected</p>
      )}
    </div>
  );
};

export default NowPlaying;
