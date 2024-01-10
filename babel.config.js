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
						'@colourful/general': './src/General',
						'@colourful/navigation': './src/Navigation',
						'@colourful/screens': './src/Screens',
						'@colourful/states': './src/General/States',
					},
				},
			],
			'@babel/plugin-proposal-export-namespace-from',
			'react-native-reanimated/plugin'
		],
	};
};
