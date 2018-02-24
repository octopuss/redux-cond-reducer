import splitReducer, { typeEquals, typeIn } from '../';

const defaultReducer = jest.fn();
const otherReducer = jest.fn();

describe('splitReducer', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	describe('typeCondition', () => {
		it('should exist', () => {
			expect(typeEquals).toBeDefined();
		});
		it('should create condition based on action type', () => {
			const condition = typeEquals('WANTED_ACTION');
			expect(condition({ type: 'WANTED_ACTION' })).toBeTruthy();
			expect(condition({ type: 'TEST_ACTION' })).toBeFalsy();
		});
	});
	describe('typeIn', () => {
		it('should exist', () => {
			expect(typeIn).toBeDefined();
		});
		it('should create condition based on action types', () => {
			const condition = typeIn(['TEST_ACTION', 'TEST_ACTION_2']);
			expect(condition({ type: 'TEST_ACTION' })).toBeTruthy();
			expect(condition({ type: 'TEST_ACTION_2' })).toBeTruthy();
			expect(condition({ type: 'TEST_ACTION_UNKNOWN' })).toBeFalsy();
		});
	});
	describe('default', () => {
		it('should exist', () => {
			expect(splitReducer).toBeDefined();
		});
		it('should create split reducer and call default reducer', () => {
			const reducer = splitReducer({
				defaultReducer,
			});
			reducer({}, { type: 'TEST_ACTION' });
			expect(defaultReducer).toBeCalledWith({}, { type: 'TEST_ACTION' });
		});
		it('should create split reducer call by action type', () => {
			const reducer = splitReducer({
				contractDataReducer: {
					condition: typeEquals('MERGE_CONTRACT_DATA'),
					reducer: otherReducer,
				},
				defaultReducer,
			});
			reducer({}, { type: 'MERGE_CONTRACT_DATA' });
			expect(defaultReducer).not.toHaveBeenCalled();
			expect(otherReducer).toBeCalledWith({}, { type: 'MERGE_CONTRACT_DATA' });
			reducer({}, { type: 'TEST_ACTION' });
			expect(defaultReducer).toBeCalledWith({}, { type: 'TEST_ACTION' });
		});
	});
});
