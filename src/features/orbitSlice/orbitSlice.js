import { createSlice } from "@reduxjs/toolkit";

const orbitSlice = createSlice({
  name: "orbit",
  initialState: {
    hoveredPlanet: null,
    focusedPlanet: null,
    isChangingZoom: false,
  },
  reducers: {
    setHoveredPlanet(state, action) {
      state.hoveredPlanet = action.payload;
    },

    setFocusedPlanet(state, action) {
      state.focusedPlanet = action.payload;
    },

    toggleIsChangingZoom(state) {
      state.isChangingZoom = !state.isChangingZoom;
    },
  },
});

export const { setFocusedPlanet, setHoveredPlanet, toggleIsChangingZoom } =
  orbitSlice.actions;

export default orbitSlice.reducer;
