module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		[
			'module-resolver',
			{
				root: ['./'],
				extensions: [
					'.ios.js',
					'.ios.ts',
					'.ios.tsx',
					'.android.js',
					'.android.ts',
					'.android.tsx',
					'.tsx',
					'.jsx',
					'.js',
					'.ts'
				],
				alias: {
					'@components': ['./app/components'],
					'@containers': ['./app/containers'],
					'@images': ['./app/images'],
					'@navigation': ['./app/navigation'],
					'@themes': ['./app/themes'],
					'@utils': ['./app/utils']
				}
			}
		],
		[
			'@babel/plugin-proposal-decorators',
			{
				legacy: true
			}
		]
	],
	env: {
		production: {
			plugins: ['transform-remove-console', 'react-native-paper/babel']
		}
	}
}
