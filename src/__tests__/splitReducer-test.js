import splitReducer, { typeEq, typeIn } from '../';

const defaultReducer = jest.fn();
const otherReducer = jest.fn();

const state = {
	prop: 'test',
};

describe('splitReducer', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});
	describe('typeEq', () => {
		it('should exist', () => {
			expect(typeEq).toBeDefined();
		});
		it('should create condition based on action type', () => {
			const condition = typeEq('WANTED_ACTION');
			expect(condition({}, { type: 'WANTED_ACTION' })).toBeTruthy();
			expect(condition({}, { type: 'TEST_ACTION' })).toBeFalsy();
		});
	});
	describe('typeIn', () => {
		it('should exist', () => {
			expect(typeIn).toBeDefined();
		});
		it('should create condition based on action types', () => {
			const condition = typeIn(['TEST_ACTION', 'TEST_ACTION_2']);
			expect(condition({}, { type: 'TEST_ACTION' })).toBeTruthy();
			expect(condition({}, { type: 'TEST_ACTION_2' })).toBeTruthy();
			expect(condition({}, { type: 'TEST_ACTION_UNKNOWN' })).toBeFalsy();
		});
	});
	describe('default', () => {
		it('should exist', () => {
			expect(splitReducer).toBeDefined();
		});
		it('should create split reducer and call default reducer', () => {
			const reducer = splitReducer([], defaultReducer);
			reducer(state, { type: 'TEST_ACTION' });
			expect(defaultReducer).toBeCalledWith(state, { type: 'TEST_ACTION' });
		});
		describe('should create split reducer call by action type', () => {
			const reducer = splitReducer([
				[typeEq('WANTED_ACTION'), otherReducer],
			], defaultReducer);
			it('should not call default reducer when condition pass', () => {
				reducer(state, { type: 'WANTED_ACTION' });
				expect(defaultReducer).not.toHaveBeenCalled();
			});
			it('should call popper reducer when condition pass', () => {
				reducer(state, { type: 'WANTED_ACTION' });
				expect(otherReducer).toBeCalledWith(state, { type: 'WANTED_ACTION' });
			});
			it('should call default reducer when condition not pass', () => {
				reducer(state, { type: 'TEST_ACTION' });
				expect(defaultReducer).toBeCalledWith(state, { type: 'TEST_ACTION' });
			});
		});
	});
});
