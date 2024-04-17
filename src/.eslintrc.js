module.exports = {
	extends: ['prettier', 'plugin:react-hooks/recommended'],
	env: {
		browser: true,
		es6: true,
		node: true,
		'react-native/react-native': true
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
			js: true
		}
	},
	plugins: [
		'eslint-plugin-jsdoc',
		'eslint-plugin-prefer-arrow',
		'@typescript-eslint',
		'eslint-plugin-react-native',
		'simple-import-sort',
		'eslint-plugin-no-inline-styles'
	],
	rules: {
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
		'react-native/no-unused-styles': 2,
		'react-hooks/exhaustive-deps': 'off',
		'@typescript-eslint/adjacent-overload-signatures': 'error',
		'@typescript-eslint/array-type': [
			'error',
			{
				default: 'array'
			}
		],
		'@typescript-eslint/ban-types': [
			'error',
			{
				types: {
					Object: {
						message: 'Avoid using the `Object` type. Did you mean `object`?'
					},
					Function: {
						message: 'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.'
					},
					Boolean: {
						message: 'Avoid using the `Boolean` type. Did you mean `boolean`?'
					},
					Number: {
						message: 'Avoid using the `Number` type. Did you mean `number`?'
					},
					String: {
						message: 'Avoid using the `String` type. Did you mean `string`?'
					},
					Symbol: {
						message: 'Avoid using the `Symbol` type. Did you mean `symbol`?'
					}
				}
			}
		],
		'@typescript-eslint/consistent-type-assertions': 'error',
		'@typescript-eslint/dot-notation': 'error',
		'@typescript-eslint/member-delimiter-style': [
			'error',
			{
				multiline: {
					delimiter: 'none',
					requireLast: true
				},
				singleline: {
					delimiter: 'semi',
					requireLast: false
				}
			}
		],
		'@typescript-eslint/member-ordering': 'error',
		'@typescript-eslint/no-empty-function': 'error',
		'@typescript-eslint/no-empty-interface': 'error',
		'@typescript-eslint/no-explicit-any': 2,
		'@typescript-eslint/no-misused-new': 'error',
		'@typescript-eslint/no-namespace': 'error',
		'@typescript-eslint/no-parameter-properties': 'off',
		'@typescript-eslint/no-this-alias': 'error',
		'@typescript-eslint/no-unused-expressions': 'error',
		'@typescript-eslint/no-use-before-define': 'off',
		'@typescript-eslint/prefer-for-of': 'error',
		'@typescript-eslint/prefer-function-type': 'error',
		'@typescript-eslint/prefer-namespace-keyword': 'error',
		'@typescript-eslint/quotes': ['error', 'single', { avoidEscape: true }],
		'@typescript-eslint/semi': ['error', 'never'],
		'@typescript-eslint/triple-slash-reference': [
			'error',
			{
				path: 'always',
				types: 'prefer-import',
				lib: 'always'
			}
		],
		'@typescript-eslint/unified-signatures': 'error',
		'brace-style': ['off', 'off'],
		'constructor-super': 'error',
		eqeqeq: ['error', 'smart'],
		'guard-for-in': 'error',
		'id-blacklist': [
			'error',
			'any',
			'Number',
			'number',
			'String',
			'string',
			'Boolean',
			'boolean',
			'Undefined',
			'undefined'
		],
		'id-match': 'error',
		'import/no-internal-modules': 'off',
		'jsdoc/check-alignment': 'error',
		'jsdoc/check-indentation': 'error',
		'jsdoc/newline-after-description': 'error',
		'max-classes-per-file': 'off',
		'max-depth': 1,
		'max-len': [
			'error',
			{
				code: 120,
				ignorePattern: '^(import\\s.+\\sfrom\\s.+|\\} from)'
			}
		],
		'max-lines-per-function': [
			'error',
			{
				max: 180,
				skipBlankLines: true,
				skipComments: true
			}
		],
		complexity: [
			'error',
			{
				max: 30
			}
		],
		'new-parens': 'error',
		'no-bitwise': 'off',
		'no-caller': 'error',
		'no-cond-assign': 'error',
		'no-console': 2,
		'no-debugger': 'error',
		'no-duplicate-case': 'error',
		'no-duplicate-imports': 'error',
		'no-empty': 'error',
		'no-eval': 'error',
		'no-extra-bind': 'error',
		'no-fallthrough': 'off',
		'no-invalid-this': 'off',
		'no-new-func': 'error',
		'no-new-wrappers': 'error',
		'no-redeclare': 'error',
		'no-return-await': 'error',
		'no-sequences': 'error',
		'no-shadow': 'off',
		'no-sparse-arrays': 'error',
		'no-template-curly-in-string': 'error',
		'no-throw-literal': 'error',
		'no-trailing-spaces': 'error',
		'no-undef-init': 'error',
		'no-unsafe-finally': 'error',
		'no-unused-labels': 'error',
		'no-var': 'error',
		'object-shorthand': 'error',
		'one-var': ['error', 'never'],
		'prefer-arrow/prefer-arrow-functions': 'error',
		'prefer-const': 'error',
		'prefer-object-spread': 'error',
		radix: 'error',
		'space-in-parens': ['error', 'never'],
		'spaced-comment': [
			'error',
			'always',
			{
				markers: ['/']
			}
		],
		'use-isnan': 'error',
		'valid-typeof': 'off',
		'padding-line-between-statements': [
			'error',
			{ blankLine: 'always', prev: ['if', 'for'], next: '*' },
			{ blankLine: 'always', prev: 'const', next: 'return' },
			{ blankLine: 'always', prev: 'const', next: 'for' },
			{ blankLine: 'always', prev: '*', next: 'if' }
		],
		curly: 'error',
		'no-inline-styles/no-inline-styles': 2
	}
}
