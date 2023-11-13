import { EntityType } from "@models/master";
import { createSlice } from "@reduxjs/toolkit";
import {
  reduxAddEntityType,
  reduxDeleteEntityType,
  reduxGetEntityTypes,
  reduxUpdateEntityType,
} from "store/actions/master/entity-types";

const initialState: EntityTypeState = {
  entity_types: {
    data: [],
    loading: false,
  },
};

const entityTypes = createSlice({
  name: "entity types",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get entity types
      .addCase(reduxGetEntityTypes.fulfilled, (state, action) => {
        state.entity_types = {
          data: [...action.payload],
          loading: false,
        };
      })
      .addCase(reduxGetEntityTypes.pending, (state) => {
        state.entity_types = {
          data: [...state.entity_types.data],
          loading: true,
        };
      })
      .addCase(reduxGetEntityTypes.rejected, (state) => {
        state.entity_types = {
          data: [...state.entity_types.data],
          loading: "error",
        };
      })
      // add
      .addCase(reduxAddEntityType.fulfilled, (state, action) => {
        state.entity_types = {
          data: [...state.entity_types.data, action.payload],
          loading: false,
        };
      })
      .addCase(reduxAddEntityType.pending, (state) => {
        state.entity_types = {
          data: [...state.entity_types.data],
          loading: true,
        };
      })
      .addCase(reduxAddEntityType.rejected, (state) => {
        state.entity_types = {
          data: [...state.entity_types.data],
          loading: "error",
        };
      })
      // update
      .addCase(reduxUpdateEntityType.fulfilled, (state, action) => {
        state.entity_types = {
          data: [
            ...state.entity_types.data.map((entityType) =>
              entityType.id !== action.payload.id
                ? entityType
                : action.payload ?? entityType
            ),
          ],
          loading: false,
        };
      })
      .addCase(reduxUpdateEntityType.pending, (state) => {
        state.entity_types = {
          data: [...state.entity_types.data],
          loading: true,
        };
      })
      .addCase(reduxUpdateEntityType.rejected, (state) => {
        state.entity_types = {
          data: [...state.entity_types.data],
          loading: "error",
        };
      })
      // delete
      .addCase(reduxDeleteEntityType.fulfilled, (state, { meta }) => {
        state.entity_types = {
          data: [
            ...state.entity_types.data.filter(
              (entityType) => entityType.id !== meta.arg
            ),
          ],
          loading: false,
        };
      })
      .addCase(reduxDeleteEntityType.pending, (state) => {
        state.entity_types = {
          data: [...state.entity_types.data],
          loading: true,
        };
      })
      .addCase(reduxDeleteEntityType.rejected, (state) => {
        state.entity_types = {
          data: [...state.entity_types.data],
          loading: "error",
        };
      });
  },
});

type EntityTypeState = {
  entity_types: {
    data: EntityType[];
    loading: Loading;
  };
};

export default entityTypes.reducer;
