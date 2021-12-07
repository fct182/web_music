import { combineReducers } from "redux"
import recommend from './recommend'
import playedSong from './playedSong'

const allReducer = combineReducers({
  recommend,
  playedSong
});

export default allReducer;