import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export const noteSlice = createSlice({
  name: 'notes',
  // this is where you load your initial state from mongo
  initialState: {
    // abc: {
    //   uuid: 'abc',
    //   x: 500,
    //   y: 500,
    //   z: 1,
    //   height: 250,
    //   prevHeight: 250,
    //   width: 200,
    //   prevWidth: 200,
    //   minimized: false,
    //   content: 'Need to call dr. stepforth on monday',
    //   timestamp: Date.now() - 86250000,
    // },
    // def: {
    //   uuid: 'def',
    //   x: 100,
    //   y: 100,
    //   z: 1,
    //   height: 250,
    //   prevHeight: 250,
    //   width: 200,
    //   prevWidth: 200,
    //   minimized: false,
    //   content: 'Dr. stepforth"s phonenumber is 310-757-2387',
    //   timestamp: Date.now() + 1000,
    // },
    // ghi: {
    //   uuid: 'ghi',
    //   x: 1000,
    //   y: 400,
    //   z: 1,
    //   height: 250,
    //   prevHeight: 250,
    //   width: 200,
    //   prevWidth: 200,
    //   minimized: false,
    //   content: 'Need to find out from doctor stepfroth if I got my test results back',
    //   timestamp: Date.now() + 1000,
    // },
    abc: {
      uuid: 'abc',
      x: 150,
      y: 60,
      z: 1,
      height: 400,
      prevHeight: 200,
      width: 450,
      prevWidth: 200,
      minimized: false,
      content: `Welcome to Destroyer!\n\nDestroyer is an "ephemeral notepad", meaning that the notes you add here aren't meant to be kept for very long. Destroyer notes have a 24-hour lifespan, after which they are destroyed forever. This note's timer is almost up, so make sure you read it all before it's destroyed!\n\nTo create a new note, click the + icon on the toolbar at the top right of your screen. Notes can be dragged and resized.\n\nNote destruction isn't the only way Destroyer helps you stay clutter-free. When you click the magic wand, Destroyer uses AI to sort and consolidate your notes. This feature won't do much if you only have a few notes, but try it after a chaotic brainstorming session and you'll be amazed!`,
      timestamp: Date.now() - 86250000,
    },
    def: {
      uuid: 'def',
      x: 700,
      y: 100,
      z: 1,
      height: 200,
      prevHeight: 200,
      width: 400,
      prevWidth: 200,
      minimized: false,
      content: `About the Developer:\n\nI'm Mitch Gruen, a software engineer based in Brooklyn, New York. I spend most of my time working on Destroyer and another project called Kafkometry, which is an open-source visualizer for Kafka clusters.\n\nIf you'd like to get in touch, shoot me a connection request on LinkedIn (I'm the only Mitch Gruen on there!) or email me at mitchgruen.dev@gmail.com.`,
      timestamp: Date.now() - 86200000,
    },
  },
  reducers: {
    addNote: (state, action) => {
      const uuid = uuidv4();
      state[uuid] = {
        uuid: uuid,
        x: 50,
        y: 50,
        z: action.payload.z,
        height: 250,
        prevHeight: 250,
        width: 200,
        prevWidth: 200,
        minimized: false,
        content: '',
        timestamp: Date.now() + 1000,
      };
    },
    deleteNote: (state, action) => {
      delete state[action.payload.uuid];
    },
    setContent: (state, action) => {
      state[action.payload.uuid].content = action.payload.content;
    },
    setSize: (state, action) => {
      state[action.payload.uuid].height = action.payload.height;
      state[action.payload.uuid].prevHeight = action.payload.prevHeight;
      state[action.payload.uuid].width = action.payload.width;
      state[action.payload.uuid].prevWidth = action.payload.prevWidth;
    },
    setPosition: (state, action) => {
      state[action.payload.uuid].x = action.payload.x;
      state[action.payload.uuid].y = action.payload.y;
    },
    setMinimized: (state, action) => {
      state[action.payload.uuid].minimized = action.payload.minimized;
    },
    setZ: (state, action) => {
      state[action.payload.uuid].z = action.payload.z;
    },
    replaceState: (state, action) => {
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNote,
  deleteNote,
  setContent,
  setZIndex,
  setSize,
  setPosition,
  setMinimized,
  setZ,
  replaceState
} = noteSlice.actions;

export default noteSlice.reducer;
