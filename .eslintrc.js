module.exports = {
	extends: ['plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended'],
	plugins: ['simple-import-sort', 'react', 'react-hooks'],
	settings: {
		react: {
			version: 'detect',
		},
	},
	rules: {
		'semi': ['error', 'always'],
		'@typescript-eslint/no-non-null-assertion': 'off',
		'comma-dangle': [2, 'only-multiline'],
		'@typescript-eslint/no-var-requires': 0,
		'object-curly-spacing': ['error', 'never'],
		quotes: [2, 'single', {avoidEscape: true}],
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': ['error'],
		'@typescript-eslint/explicit-module-boundary-types': 'error',
		'simple-import-sort/exports': 'error',
		'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
		'react/jsx-one-expression-per-line': ['error', {'allow': 'single-child'}],
		'padding-line-between-statements': [
			'error',
			{'blankLine': 'always', 'prev': '*', 'next': 'return'},
			{'blankLine': 'always', 'prev': ['const', 'let', 'var'], 'next': '*'},
			{'blankLine': 'any', 'prev': ['const', 'let', 'var'], 'next': ['const', 'let', 'var']},
			{'blankLine': 'always', 'prev': 'directive', 'next': '*'},
			{'blankLine': 'always', 'prev': 'block-like', 'next': '*'},
			{'blankLine': 'always', 'prev': 'multiline-expression', 'next': '*'},
		],
		'react-hooks/exhaustive-deps': 'warn',
		'no-multi-spaces': 'error',
		'react/jsx-tag-spacing': ['error', {
			'closingSlash': 'never',
			'beforeSelfClosing': 'always',
			'afterOpening': 'never',
			'beforeClosing': 'allow'
		}],
		'operator-linebreak': ['error', 'before'],
		'brace-style': ['error', '1tbs'],
		'curly': ['error', 'all'],
		'indent': ['error', 'tab', {
			'MemberExpression': 'off',
			'SwitchCase': 1
		}],
		'no-multiple-empty-lines': ['error', {'max': 1}],
		'no-extra-semi': 'error',
		'@typescript-eslint/member-delimiter-style': [
			'error',
			{
				'multiline': {
					'delimiter': 'semi',
					'requireLast': false,
				},
				'singleline': {
					'delimiter': 'semi',
					'requireLast': true,
				},
				'overrides': {
					'interface': {
						'multiline': {
							'delimiter': 'comma',
							'requireLast': false,
						},
						'singleline': {
							'delimiter': 'comma',
							'requireLast': true,
						},
					},
				},
			},
		],
		'max-len': ['error', 90, {
			'ignoreStrings': true,
			'ignoreTemplateLiterals': true,
			'ignoreRegExpLiterals': true,
			'ignoreComments': true,
		}],
		'simple-import-sort/imports': [
			'error',
			{
				groups: [
					['^react', '^@react'],
					['^\\u0000'],
					['^\\.\\.(?!/?$)', '^\\.\\./?$'],
					['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
				],
			},
		],
		'comma-spacing': ['error', {before: false, after: true}],
		'react/jsx-sort-props': [
			'error',
			{
				callbacksLast: true,
				shorthandFirst: true,
				ignoreCase: false,
			},
		],
		'react/sort-comp': [
			'error',
			{
				order: [
					'static-variables',
					'static-methods',
					'instance-variables',
					'lifecycle',
					'everything-else',
					'/^_on.+$/',
					'rendering',
					'/^_.+$/',
				],
				groups: {
					rendering: ['/^_render.+$/', 'render'],
				},
			},
		],
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'error'
	},
};