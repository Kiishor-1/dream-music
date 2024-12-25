import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const fetchTracks = createAsyncThunk("music/fetchTracks", async (_, thunkAPI) => {
  try {
    const response = await fetch(
      `https://spotify23.p.rapidapi.com/search/?q=your_search_query&type=tracks&offset=0&limit=10&numberOfTopResults=5`,
      {
        method: "GET",
        headers: {
          'x-rapidapi-key': import.meta.env.VITE_REACT_APP_API_KEY,
          'x-rapidapi-host': import.meta.env.VITE_REACT_APP_API_HOST
        }
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch tracks. Please try again later.");
    }

    const data = await response.json();
   
    const tracks = data.tracks.items.map((item) => {
      const trackData = item.data;
      return {
        title: trackData.name,
        artist: trackData.artists.items[0]?.profile.name || "Unknown Artist",
        album: trackData.albumOfTrack.name,
        duration: trackData.duration.totalMilliseconds,
        thumbnail: trackData.albumOfTrack.coverArt.sources[0]?.url || "",
        uri: trackData.uri, // Spotify URI for SDK playback
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Placeholder MP3
      };
    });
    console.log(data)
    return tracks;
  } catch (error) {
    toast.error(error.message || "An error occurred while fetching tracks.");
    return thunkAPI.rejectWithValue(error.message);
  }
});




const musicSlice = createSlice({
  name: "music",
  initialState: {
    tracks: [],
    currentTrackIndex: null,
    isPlaying: false,
    loading: false,
    error: null,
  },
  reducers: {
    playTrack: (state, action) => {
      state.currentTrackIndex = action.payload;
      state.isPlaying = true;
    },
    pauseTrack: (state) => {
      state.isPlaying = false;
    },
    playNext: (state) => {
      const nextIndex =
        state.currentTrackIndex + 1 < state.tracks.length
          ? state.currentTrackIndex + 1
          : 0;
      state.currentTrackIndex = nextIndex;
      state.isPlaying = true;
    },
    playPrevious: (state) => {
      const prevIndex =
        state.currentTrackIndex - 1 >= 0
          ? state.currentTrackIndex - 1
          : state.tracks.length - 1;
      state.currentTrackIndex = prevIndex;
      state.isPlaying = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTracks.fulfilled, (state, action) => {
        state.tracks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTracks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tracks";
        toast.error(state.error);
      });
  },
});

export const { playTrack, pauseTrack, playNext, playPrevious } =
  musicSlice.actions;

export default musicSlice.reducer;
