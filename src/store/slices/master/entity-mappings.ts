import { EntityMapping } from "@models/master";
import { createSlice } from "@reduxjs/toolkit";
import {
  reduxAddEntityMapping,
  reduxDeleteEntityMapping,
  reduxGetEntityMappings,
} from "store/actions/master/entity-mappings";

const initialState: EntityMappingState = {
  entity_mappings: {
    data: [],
    loading: false,
  },
};

const entityMappings = createSlice({
  name: "entity_mappings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get entity mappings
      .addCase(reduxGetEntityMappings.fulfilled, (state, action) => {
        state.entity_mappings = {
          data: [...action.payload],
          loading: false,
        };
      })
      .addCase(reduxGetEntityMappings.pending, (state) => {
        state.entity_mappings = {
          data: [...state.entity_mappings.data],
          loading: true,
        };
      })
      .addCase(reduxGetEntityMappings.rejected, (state) => {
        state.entity_mappings = {
          data: [...state.entity_mappings.data],
          loading: "error",
        };
      })

      // add
      .addCase(reduxAddEntityMapping.fulfilled, (state, action) => {
        state.entity_mappings = {
          data: [...state.entity_mappings.data, action.payload],
          loading: false,
        };
      })
      .addCase(reduxAddEntityMapping.pending, (state) => {
        state.entity_mappings = {
          data: [...state.entity_mappings.data],
          loading: true,
        };
      })
      .addCase(reduxAddEntityMapping.rejected, (state) => {
        state.entity_mappings = {
          data: [...state.entity_mappings.data],
          loading: "error",
        };
      })

      // delete
      .addCase(reduxDeleteEntityMapping.fulfilled, (state, { meta }) => {
        state.entity_mappings = {
          data: [
            ...state.entity_mappings.data.filter(
              (entityType) => entityType.id !== meta.arg
            ),
          ],
          loading: false,
        };
      })
      .addCase(reduxDeleteEntityMapping.pending, (state) => {
        state.entity_mappings = {
          data: [...state.entity_mappings.data],
          loading: true,
        };
      })
      .addCase(reduxDeleteEntityMapping.rejected, (state) => {
        state.entity_mappings = {
          data: [...state.entity_mappings.data],
          loading: "error",
        };
      });
  },
});

type EntityMappingState = {
  entity_mappings: {
    data: EntityMapping[];
    loading: Loading;
  };
};

export default entityMappings.reducer;
