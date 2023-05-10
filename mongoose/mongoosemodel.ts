//STRICT VERSION ->
import mongoose from "mongoose";

const locationRulesSchema = new mongoose.Schema(
  {
    latitude: {
      type: Number,
      required: false,
      min: -90,
      max: 90,
    },
    longitude: {
      type: Number,
      required: false,
      min: -180,
      max: 180,
    },
    country: {
      type: String,
      required: false,
    },
  },
  { strict: "throw", _id: false } // Disable _id generation for the nested schema
);

const rulesSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: false,
    },
    fps_avg: {
      type: Number,
      required: false,
    },
    seed: {
      type: Number,
      required: false,
    },
    size: {
      type: Number,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
    uptime: {
      type: Number,
      required: false,
    },
    location: {
      type: locationRulesSchema,
      required: false,
    },
  },
  { strict: "throw", _id: false } // Disable _id generation for the nested schema
);

export const ServerPrimaryDataModel = mongoose.model(
  "ServerPrimaryCollection",
  new mongoose.Schema(
    {
      _id: {
        type: String,
        required: true,
        unique: true,
      },
      addr: {
        type: String,
        required: true,
        unique: true,
      },
      name: {
        type: String,
        required: true,
      },
      players: {
        type: Number,
        required: true,
      },
      max_players: {
        type: Number,
        required: true,
      },
      modded: {
        type: Boolean,
        required: true,
      },
      vanilla: {
        type: Boolean,
        required: true,
      },
      wipe_rotation: {
        type: String,
        required: true,
      },
      born: {
        type: Number,
        required: true,
      },
      born_next: {
        type: Number,
        required: true,
      },
      max_group_size: {
        type: Number,
        required: true,
      },
      rate: {
        type: Number,
        required: true,
      },
      gametype: {
        type: [String],
        required: false,
      },
      difficulty: {
        type: String,
        required: true,
      },
      rank: {
        type: Number,
        required: false,
      },
      rules: {
        type: rulesSchema,
        required: false,
      },
      players_history: {
        type: [[Number]],
        required: false,
      },
    },
    { strict: "throw" }
  )
);
