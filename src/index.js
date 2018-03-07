import { always, compose, cond, contains, defaultTo, equals, flip, nth, o, prop, T } from 'ramda';
import { argumentsToList, notNil } from 'ramda-extension';

const withType = (condition) => compose(condition, prop('type'), nth(1), argumentsToList);

export const typeEq = o(withType, equals);
export const typeIn = o(withType, flip(contains));

export const dummyReducer = defaultTo({});
/**
 * Split reducer takes a list of [predicate, transformer] pairs and default reducer.
 * `state` and `action` are applied to each of the predicates in turn
 * until one returns a "truthy" value, at which point splitReducer returns the result of applying
 * `state` and `action` to the corresponding reducer.
 *
 * When no reducer found it will try to use defaultReducer from second argument or dummyReducer.
 *
 * @param configuration {Array} pairs A list of [predicate, reducer]
 * @param defaultReducer {Function} default reducer (when is nill, use dummyReducer)
 * @returns {Function} Split reducer
 */
export default (configuration, defaultReducer) => cond([
	...configuration,
	[always(notNil(defaultReducer)), defaultReducer],
	[T, dummyReducer],
]);
