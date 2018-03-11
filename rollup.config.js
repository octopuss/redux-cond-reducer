import uglify from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

const banner = `
//  redux-cond-reducer v${require('./package.json').version}
//  https://github.com/jbradle/redux-cond-reducer
//  (c) ${new Date().getFullYear()}
`;

const config = {
	input: 'src/index.js',
	output: {
		format: 'umd',
		name: 'condReducer',
		exports: 'named',
	},
	globals: {
		ramda: 'R',
		'ramda-extension': 'R_',
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
	external: ['ramda', 'ramda-extension'],
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
