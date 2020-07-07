// TODO: later build own module
let mockStorage = {};
export const storage = {
	getItem(key, ...args) {
		return mockStorage[key];
	},
	setItem(key, value, ...args) {
		mockStorage[key] = value;
	},
	removeItem(key, ...args) {
		delete mockStorage[key];
	},
};
export const resetStore = () => {
	mockStorage = {};
};
