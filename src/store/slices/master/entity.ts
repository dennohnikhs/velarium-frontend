import { Entity } from "@models/master";
import { createSlice } from "@reduxjs/toolkit";
import {
  reduxAddEntity,
  reduxGetEntities,
  reduxGetEntitiesByType,
  reduxUpdateEntity,
} from "store/actions/master/entity";

const initialState: EntitiesState = {
  entities: {
    data: [],
    loading: false,
    type: {
      intermediaries: [],
      insurances: [],
    },
  },
};

const entities = createSlice({
  name: "entities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get entities
      .addCase(reduxGetEntities.fulfilled, (state, action) => {
        state.entities = {
          ...state.entities,
          data: [...action.payload],
          loading: false,
        };
      })
      .addCase(reduxGetEntities.pending, (state) => {
        state.entities = {
          ...state.entities,
          loading: true,
        };
      })
      .addCase(reduxGetEntities.rejected, (state) => {
        state.entities = {
          ...state.entities,
          loading: "error",
        };
      })

      // get entities by type
      .addCase(reduxGetEntitiesByType.fulfilled, (state, action) => {
        state.entities = {
          ...state.entities,
          type: {
            insurances:
              action.meta.arg === "INS"
                ? [...action.payload]
                : [...state.entities.type.insurances],
            intermediaries:
              action.meta.arg === "INT"
                ? [...action.payload]
                : [...state.entities.type.intermediaries],
          },
          loading: false,
        };
      })
      .addCase(reduxGetEntitiesByType.pending, (state) => {
        state.entities = {
          ...state.entities,
          loading: true,
        };
      })
      .addCase(reduxGetEntitiesByType.rejected, (state) => {
        state.entities = {
          ...state.entities,
          loading: "error",
        };
      })

      // Add entity
      .addCase(reduxAddEntity.fulfilled, (state, action) => {
        state.entities = {
          ...state.entities,
          data: [...state.entities.data, action.payload],
          loading: false,
        };
      })
      .addCase(reduxAddEntity.pending, (state) => {
        state.entities = {
          ...state.entities,
          loading: true,
        };
      })
      .addCase(reduxAddEntity.rejected, (state) => {
        state.entities = {
          ...state.entities,
          loading: "error",
        };
      })

      // update entity
      .addCase(reduxUpdateEntity.fulfilled, (state, action) => {
        state.entities = {
          ...state.entities,
          data: [
            ...state.entities.data.map((entity) =>
              entity.id !== action.payload.id
                ? entity
                : action.payload ?? entity
            ),
          ],
          loading: false,
        };
      })
      .addCase(reduxUpdateEntity.pending, (state) => {
        state.entities = {
          ...state.entities,
          loading: true,
        };
      })
      .addCase(reduxUpdateEntity.rejected, (state) => {
        state.entities = {
          ...state.entities,
          loading: "error",
        };
      });
  },
});

type EntitiesState = {
  entities: {
    data: Entity[];
    type: {
      intermediaries: Entity[];
      insurances: Entity[];
    };
    loading: Loading;
  };
};

export default entities.reducer;
