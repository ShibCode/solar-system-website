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

    updateFocusedPlanet(state) {
      if (!state.hoveredPlanet) return;

      if (state.focusedPlanet) state.focusedPlanet = null;
      else state.focusedPlanet = state.hoveredPlanet;
    },

    toggleIsChangingZoom(state) {
      state.isChangingZoom = !state.isChangingZoom;
    },
  },
});

export const { updateFocusedPlanet, setHoveredPlanet, toggleIsChangingZoom } =
  orbitSlice.actions;

export default orbitSlice.reducer;
