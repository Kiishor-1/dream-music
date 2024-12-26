import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTracks, playTrack, pauseTrack, playNext } from "../slices/musicSlice";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Playlist from "../components/Playlist";
import NowPlaying from "../components/NowPlaying";
import { Howl } from "howler";

export default function Home() {
  const dispatch = useDispatch();
  const { tracks, currentTrackIndex, isPlaying, loading, error } = useSelector(
    (state) => state.music
  );
  const [howlInstance, setHowlInstance] = useState(null);
  const [trackDuration, setTrackDuration] = useState(0);

  // Always fetch tracks on page load
  useEffect(() => {
    dispatch(fetchTracks());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (currentTrackIndex !== null && tracks[currentTrackIndex]) {
      const currentTrack = tracks[currentTrackIndex];
      const url = currentTrack.url || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

      if (howlInstance) {
        howlInstance.stop();
      }
      const sound = new Howl({
        src: [url],
        html5: true,
        onend: () => {
          dispatch(playNext());
        },
        onplayerror: () => {
          toast.error("Playback failed. Trying to resume...");
          sound.once("unlock", () => {
            sound.play();
          });
        },
        onload: () => {
          setTrackDuration(sound.duration());
        },
      });

      setHowlInstance(sound);
      if (isPlaying) {
        sound.play();
      } else {
        sound.pause();
      }
    }

    return () => {
      if (howlInstance) {
        howlInstance.stop();
      }
    };
  }, [currentTrackIndex, isPlaying, tracks, dispatch]);

  return (
    <div className="flex-1 flex lg:flex-row flex-col items-center h-full hideScroll">
      <div className="self-start flex flex-col w-full h-full">
        <Navbar />
        <Playlist tracks={tracks} loading={loading} currentTrackIndex={currentTrackIndex} />
      </div>
      <div className="lg:w-[300px] w-full lg:relative sticky bottom-0 h-full px-4 bg-gradient-to-b from-[#450609] to-black flex flex-col-reverse items-center py-4">
        <NowPlaying
          currentTrack={tracks[currentTrackIndex]}
          isPlaying={isPlaying}
          howlInstance={howlInstance}
          duration={trackDuration}
        />
      </div>
    </div>
  );
}
