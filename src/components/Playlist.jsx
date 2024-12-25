import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch, useSelector } from "react-redux";
import { playTrack } from "../slices/musicSlice";
import { FaSpinner } from "react-icons/fa";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function formatDuration(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

export default function Playlist({ tracks, loading, currentTrackIndex }) {
  const dispatch = useDispatch();
  const { isPlaying } = useSelector((state) => state.music);

  const [trackList, setTrackList] = useState(
    tracks.map((track, index) => ({
      ...track,
      index,
    }))
  );
  const [activeTrackIndex, setActiveTrackIndex] = useState(currentTrackIndex);

  if (loading) {
    return (
      <section className="h-screen w-full flex items-center justify-center">
        <div className="loader"></div>
      </section>
    );
  }

  const playTrackHandler = (track, index) => {
    setActiveTrackIndex(index);
    dispatch(playTrack(index));
  };

  // Handle row reordering
  const onRowReorder = (e) => {
    const reorderedTracks = [...e.value];
    setTrackList(reorderedTracks);
  };

  return (
    <div className="w-full flex-1 overflow-y-auto hideScroll text-white">
      <div className="flex justify-center flex-col md:gap-4 gap-1 py-4 relative rounded-3xl w-[80%] md:h-[295px] mx-auto md:ps-16 ps-4 mt-16">
        <img
          className="z-[1] h-full absolute top-0 bottom-0 left-0 right-0 w-full rounded-lg"
          src="./images/Background.png"
          alt=""
        />
        <p className="flex items-center text-sm relative z-[2] text-white">
          <img src="./images/Verified.png" className="w-[20px]" alt="" />
          Verified
        </p>
        <h2 className="md:text-[30px] text-lg font-semibold leading-[40px] relative z-[2] text-white">
          Michael Jackson
        </h2>
        <p className="text-sm relative z-[2] text-white">
          27.852.501 monthly listeners
        </p>
        <img
          className="absolute hidden lg:block bottom-0 right-8 z-[3] w-[55%]"
          src="./images/Michael.png"
          alt=""
        />
      </div>

      <div className="track-list p- rounded-lg shadow-lg relative">
        <DataTable
          value={trackList}
          className="bg-transparent border-none shadow-none"
          paginator
          rows={trackList.length}
          scrollable
          reorderableRows
          onRowReorder={onRowReorder}
          rowClassName={(rowData) =>
            rowData.index === activeTrackIndex ? "p-highlight" : ""
          }
        >
          <Column rowReorder style={{ width: "3rem" }} />

          <Column
            field="id"
            header="#"
            body={(rowData, { rowIndex }) => rowIndex + 1}
          />

          <Column
            header="Title"
            body={(rowData, { rowIndex }) => (
              <div
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => playTrackHandler(rowData, rowIndex)}
              >
                <img
                  src={rowData.thumbnail || "./images/default-thumbnail.jpg"}
                  alt="Track Thumbnail"
                  className="w-[50px] h-[50px] object-cover"
                />
                <span className="text-white">{rowData.title || "Unknown Track"}</span>
              </div>
            )}
          />

          <Column field="artist" header="Artist" body={(rowData) => rowData.artist || "Unknown Artist"} />

          <Column
            field="duration"
            header="Duration"
            body={(rowData) => formatDuration(rowData.duration)}
          />

          <Column field="album" header="Album" body={(rowData) => rowData.album || "Unknown Album"} />
        </DataTable>
      </div>
    </div>
  );
}
