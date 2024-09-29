import { createSlice } from "@reduxjs/toolkit";

const orbitSlice = createSlice({
  name: "orbit",
  initialState: {
    hoveredPlanet: null,
    focusedPlanet: null,
    isChangingZoom: false,
    planets: null,
  },
  reducers: {
    setPlanets(state, action) {
      state.planets = [...action.payload];
    },

    setHoveredPlanet(state, action) {
      if (action.payload) document.body.style.cursor = "pointer";
      else document.body.style.cursor = "auto";

      state.hoveredPlanet = action.payload;
    },

    updateFocusedPlanet(state, action) {
      if (action.payload) {
        console.log(action.payload);
        state.focusedPlanet = state.planets.find(
          (p) => p.userData.label === action.payload
        );
        return;
      }

      if (!state.hoveredPlanet || state.isChangingZoom) return;

      if (state.focusedPlanet) state.focusedPlanet = null;
      else state.focusedPlanet = state.hoveredPlanet;
    },

    toggleIsChangingZoom(state) {
      state.isChangingZoom = !state.isChangingZoom;
    },
  },
});

export const {
  setPlanets,
  updateFocusedPlanet,
  setHoveredPlanet,
  toggleIsChangingZoom,
} = orbitSlice.actions;

export default orbitSlice.reducer;
