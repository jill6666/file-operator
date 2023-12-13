import { store } from "./store";
import forEach from "lodash/forEach";
import { actions } from "./slice";

type TActions = keyof typeof actions;

const redux: { [key in TActions]: any } = actions;

forEach(actions, (func, key) => {
  const anotherKey = key as TActions;
  redux[anotherKey] = (args: never) => store.dispatch(func(args));
});

export default redux;
