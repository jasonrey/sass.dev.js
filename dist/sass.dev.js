/* sass.dev.js
 * 2016-02-11
 * jsonobject@outlook.com
 */

(function() {
	'use strict';

	var scriptName = 'sass.dev.js',
		currentScript = document.currentScript || document.querySelector('script[src$="' + scriptName + '"]'),
		base = currentScript.src.slice(0, -scriptName.length);

	var SassScript = document.createElement('script');

	SassScript.type = 'text/javascript';
	SassScript.src = base + 'sass.js';

	SassScript.onload = function() {
		var stylesheets = document.querySelectorAll('link[rel^="stylesheet/s"]'),
			files = [],
			fileCounter = 0,
			sass = new Sass(),
			compileStylesheets = function() {
				if (files[fileCounter] === undefined) {
					return;
				}

				var file = files[fileCounter];

				var promise = new Promise(function(resolve, reject) {
					var request = new XMLHttpRequest();

					request.open('GET', file.path, true);

					request.onload = function() {
						if (request.status >= 200 && request.status < 400) {
							var response = request.responseText;

							sass.compile(response, {
								indentedSyntax: file.isSass,
								importer: {
									currentfile: file.path,
									isSass: file.isSass
								}
							}, function(result) {
								var style = document.createElement('style');

								style.innerHTML = result.text;

								style.dataset.source = file.path;
								style.dataset.type = file.isSass ? 'sass' : 'scss';

								document.head.appendChild(style);

								resolve();
							});
						} else {
							resolve();
						}
					};

					request.send();
				});

				promise.then(function() {
					file.element.dataset.processed = 1;
					fileCounter++;
					compileStylesheets();
				});
			};

		sass.importer(function(request, done) {
			var importPath = currentScript.dataset.importPath || (request.options.isSass ? '../sass' : '../scss');

			sass.preloadFiles(importPath, '', [request.current + '.' + (request.options.isSass ? 'sass' : 'scss')], function() {
				done();
			});
		});

		for (var i = 0; i < stylesheets.length; i++) {
			var file = stylesheets[i].getAttribute('href'),
				rel = stylesheets[i].getAttribute('rel'),
				type = file.slice(-4);

			if (type !== 'sass' && type !== 'scss') {
				continue;
			}

			files.push({
				isSass: type === 'sass',
				path: file,
				element: stylesheets[i]
			});
		}

		compileStylesheets();
	};

	document.head.appendChild(SassScript);
})();

