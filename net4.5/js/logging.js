/*
	MIT License

	Copyright (c) 2016

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.

	Author: Kerk en IT © 2017
*/
(function () {
	var logging = {
		init: function () {
			if (window.addEventListener) {
				window.addEventListener("load", this.checkjQueryOnload, false);
			} else if (window.attachEvent) {
				window.attachEvent("onload", this.checkjQueryOnload);
			} else {
				window.onload = this.checkjQueryOnload;
			}
			this.catchErrors();
		},
		checkjQueryOnload: function () {
			if (!window.jQuery) {
				var jq = document.createElement('script');
				jq.type = 'text/javascript';
				jq.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js';
				document.getElementsByTagName('head')[0].appendChild(jq);
			}
		},
		log: function (msg) {
			this.send({
				'type': 'log',
				'message': msg,
				'script': '',
				'line': ''
			});
		},
		catchErrors: function () {
			var that = this;
			window.console = {
				log: function (msg) {
					that.send({
						'type': 'log',
						'message': msg,
						'script': '',
						'line': ''
					});
				},
				info: function (msg) {
					that.send({
						'type': 'info',
						'message': msg,
						'script': '',
						'line': ''
					});
				},
				warn: function (msg) {
					that.send({
						'type': 'warn',
						'message': msg,
						'script': '',
						'line': ''
					});
				}
			};
			window.onerror = function (msg, url, lineNumber) {
				that.send({
					'type': 'error',
					'message': msg,
					'script': url,
					'line': lineNumber.toString()
				});
			};
		},
		send: function (data) {
			var that = this;
			if (window.jQuery && data !== undefined && data !== null) {
				$.ajax({
					url: "https://www.example.com/WebServices/Logging.asmx/SendMail",
					data: JSON.stringify(data),
					type: 'POST',
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					success: function () { },
					error: function () { }
				});
			}
		}
	};
	logging.init();
}());