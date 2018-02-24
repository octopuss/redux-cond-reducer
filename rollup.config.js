import uglify from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

const banner = `
//  redux-split-reducer v${require('./package.json').version}
//  https://github.com/jbradle/redux-split-reducer
//  (c) ${new Date().getFullYear()}
`;

const config = {
	input: 'src/index.js',
	output: {
		format: 'umd',
		name: 'splitReducer',
		exports: 'named',
	},
	globals: {
		ramda: 'R',
	},
	banner,
	plugins: [
		resolve({
			customResolveOptions: {
				moduleDirectory: 'node_modules',
			},
		}),
		babel({
			include: 'src/**',
		}),
	],
	external: ['ramda'],
};

if (process.env.NODE_ENV === 'production') {
	config.plugins.push(
		uglify({
			compress: {
				pure_getters: true,
				unsafe: true,
				unsafe_comps: true,
				warnings: false,
			},
		})
	);
}

export default config;
