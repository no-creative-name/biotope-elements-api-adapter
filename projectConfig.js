module.exports = {
	project: 'Biotope - The Frontend Ecosystem Framework',
	global: {
		tasks: {
			htmlhint: false,
			uglify: false
		},
		externalResources: {
			'vi-css-helper': ['helper.css', 'print.css'],
			'sanitize.css': 'sanitize.css',
			'handlebars': 'dist/handlebars.runtime.js',
			'@webcomponents/webcomponentsjs': [
				'webcomponents-loader.js',
				'custom-elements-es5-adapter.js',
				'webcomponents-hi.js',
				'webcomponents-hi-ce',
				'webcomponents-hi-sd-ce.js',
				'webcomponents-sd-ce.js',
				'webcomponents-lite.js'
			]
		},
		tsEntryPoints: [
			'resources/ts/**/*.ts',
			'components/**/*.ts'
		]
	},
	connect: {
		port: 7776
	},
	webpack: {
		entryPoints: [
			'resources/ts/server.ts',
			'components/**/index.ts'
		],
		watchScss: false
	}
};