import {
	anyPass,
	compose,
	defaultTo,
	equals,
	filter,
	find,
	flip,
	has,
	identity,
	map,
	o,
	prop,
	values,
	when,
} from 'ramda';
import { notNil } from 'ramda-extension';

const hasCondition = has('condition');
const conditionP = prop('condition');
const reducerP = prop('reducer');
const typeP = prop('type');
const withType = flip(o)(typeP);
const anyEquals = o(anyPass, map(equals));

const findReducerForAction = (action) => compose(
	o(when(notNil, reducerP), find(o((condition) => condition(action), conditionP))),
	filter(hasCondition), values);

export const dummyReducer = o(identity, defaultTo({}));

export const typeEq = o(withType, equals);
export const typeIn = o(withType, anyEquals);

export default (setting) => (state, action) => {
	const reducer = findReducerForAction(action)(setting);
	return defaultTo(defaultTo(dummyReducer, setting.defaultReducer))(reducer)(state, action);
};
