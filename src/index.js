import {
	always,
	anyPass,
	compose,
	defaultTo,
	equals,
	forEachObjIndexed,
	has,
	map,
	prop,
} from 'ramda';

const hasCondition = has('condition');
const typeP = prop('type');

export const typeEquals = (type) => compose(equals(type), typeP);
export const typeIn = (types) => compose(anyPass(map(equals, types)), typeP);

export default (setting) => (state, action) => {
	let reducer = undefined;
	forEachObjIndexed((value) => {
		if (hasCondition(value) && value.condition(action)) {
			reducer = value.reducer;
		}
	})(setting);
	reducer = defaultTo(defaultTo(always({}))(setting.defaultReducer))(reducer);
	return reducer(state, action);
};
