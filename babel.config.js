module.exports = function(api) {
	api.cache(true);

	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				require.resolve('babel-plugin-module-resolver'),
				{
					root: ['./src'],
					alias: {
						'@colourful/general': './src/general',
						'@colourful/navigation': './src/main/Navigation',
						'@colourful/screens': './src/main/Screens',
						'@colourful/state': './src/general/State'
					},
				},
			],
			'@babel/plugin-proposal-export-namespace-from',
			'react-native-reanimated/plugin'
		],
	};
};
