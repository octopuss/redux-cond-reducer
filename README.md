# redux-split-reducer
[![build status](https://img.shields.io/travis/jbradle/redux-split-reducer/master.svg?style=flat-square)](https://travis-ci.org/jbradle/redux-split-reducer)

Library for more redux friendly configuration of reducers. It aims on splitting reducers on same state branch.

Thanks to this library, you can configure store, without using some boring switches or ifs. But just with conditional functions. It is based on `cond` function from ramda library.

It contains some type condition functions support. Also dummyReducer implementation, that reduce state without changes and empty object as default state.

## Installation

```bash
$ npm install redux-split-reducer ramda ramda-extension
```

or

```bash
$ yarn add redux-split-reducer ramda ramda-extension
```

## Usage

```js
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import splitReducer, { typeEq, typeIn } from 'redux-split-reducer';

const rootReducer = combineReducers({
	routing: routerReducer,
	form: combineReducers({
		globalErrors: globalErrorsReducer,
		state: splitReducer([
			[typeEq('UPDATE_FORM_STATE'), formStateReducer]
		], formReducer('FORM_NAME')),
		contractData: splitReducer([
			[typeIn(['DEEP_MERGE_CONTRACT_DATA', 'ASSOC_CONTRACT_DATA']), contractDataReducer]
		], multiFormReducer),
	}),
	error: errorReducer,
});
```

_NOTE_: Ramda and ramda-extension itself is not part of bundle, you need to add it manually
