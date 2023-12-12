import { store } from "./store";
import forEach from "lodash/forEach";
import { actions } from "./slice";
import { folderActions } from "./slice/folderSlice";

type TActions = keyof typeof folderActions;

const redux: { [key in TActions]: any } = {
  ...folderActions,
};

forEach(actions, (func, key) => {
  const anotherKey = key as TActions;
  redux[anotherKey] = (args: never) => store.dispatch(func(args));
});

export default redux;
