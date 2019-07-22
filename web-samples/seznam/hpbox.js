"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
	'use strict';

	var crypto = window.crypto || window.msCrypto || window.webkitCrypto;
	var subtle = crypto ? crypto.subtle || crypto.msSubtle || crypto.webkitSubtle : null;

	var keyOptions = { name: "ECDSA", namedCurve: "P-256" };
	var signOptions = { name: "ECDSA", hash: { name: "SHA-256" } };

	/**
  * Oprava SPKI OID pro Firefox, ktery ve verzi 56 pouziva chybny
  */
	function fixOID(key) {
		var badOID = new Uint8Array([6, 4, 43, 129, 4, 112]);
		var goodOID = new Uint8Array([6, 7, 42, 134, 72, 206, 61, 2, 1]);
		var offset = 4;

		var test = new Uint8Array(key.slice(offset, offset + badOID.length));
		if (test.toString() == badOID.toString()) {
			// replace
			var diff = goodOID.length - badOID.length;

			var newKey = new Uint8Array(key.byteLength + diff);
			var header = new Uint8Array(key.slice(0, offset));
			var remaining = new Uint8Array(key.slice(offset + badOID.length));

			newKey.set(header, 0); // ASN.1 sequences
			newKey.set(goodOID, offset); // proper OID
			newKey.set(remaining, offset + goodOID.length); // remaining bytes

			newKey[offset - 1] += diff; // OID sequence length patch
			newKey[offset - 3] += diff; // key sequence length patch

			return newKey.buffer;
		} else {
			return key;
		}
	}

	/**
  * Konverze ArrayBuffer => Base64 string
  * @param {ArrayBuffer} ab
  * @returns {string}
  */
	function abToString(ab) {
		var view = new Uint8Array(ab);
		var byteString = Array.from(view).map(function (byte) {
			return String.fromCharCode(byte);
		}).join("");
		return btoa(byteString);
	}

	/**
  * Konverze Base64 string => ArrayBuffer
  * @param {string} str Musi byt Base64
  * @returns {ArrayBuffer}
  */
	function stringToAb(str) {
		var byteString = atob(str);
		var bytes = byteString.split("").map(function (x) {
			return x.charCodeAt(0) & 0xFF;
		});
		return new Uint8Array(bytes).buffer;
	}

	var KeyPair = function () {
		_createClass(KeyPair, null, [{
			key: "generate",

			/**
    * Staticka tovarni metoda
    * @param {string} name
    * @param {object} options
    * @returns {Promise<KeyPair>}
    */
			value: function generate(name) {
				var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

				return new Promise(function ($return, $error) {
					var o = void 0,
					    key = void 0;

					o = Object.assign({}, keyOptions, options);
					return subtle.generateKey(o, true, ["sign", "verify"]).then(function ($await_11) {
						try {
							key = $await_11;
							return $return(new this(name, key.privateKey, key.publicKey));
						} catch ($boundEx) {
							return $error($boundEx);
						}
					}.bind(this), $error);
				}.bind(this));
			}

			/**
    * Staticka tovarni metoda
    * @param {string} str
    * @param {object} options
    * @returns {Promise<KeyPair>}
    */

		}, {
			key: "fromString",
			value: function fromString(str) {
				var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

				return new Promise(function ($return, $error) {
					var o = void 0,
					    data = void 0,
					    priv = void 0,
					    pub = void 0,
					    pair = void 0;

					o = Object.assign({}, keyOptions, options);
					data = JSON.parse(str);

					priv = subtle.importKey("jwk", data.priv, o, true, ["sign"]);
					pub = subtle.importKey("jwk", data.pub, o, true, ["verify"]);

					return Promise.all([priv, pub]).then(function ($await_12) {
						try {
							pair = $await_12;
							return $return(new this(data.name, pair[0], pair[1]));
						} catch ($boundEx) {
							return $error($boundEx);
						}
					}.bind(this), $error);
				}.bind(this));
			}
		}]);

		function KeyPair(name, priv, pub) {
			_classCallCheck(this, KeyPair);

			this._name = name;
			this._priv = priv;
			this._pub = pub;
		}

		/**
   * @returns {string}
   */


		_createClass(KeyPair, [{
			key: "getName",
			value: function getName() {
				return this._name;
			}

			/**
    * Prevod na JSON-string
    * @returns {Promise<string>}
    */

		}, {
			key: "toString",
			value: function toString() {
				return new Promise(function ($return, $error) {
					var priv = void 0,
					    pub = void 0,
					    pair = void 0,
					    data = void 0;

					priv = subtle.exportKey("jwk", this._priv);
					pub = subtle.exportKey("jwk", this._pub);
					return Promise.all([priv, pub]).then(function ($await_13) {
						try {
							pair = $await_13;

							data = {
								name: this._name,
								priv: pair[0],
								pub: pair[1]
							};

							return $return(JSON.stringify(data));
						} catch ($boundEx) {
							return $error($boundEx);
						}
					}.bind(this), $error);
				}.bind(this));
			}

			/**
    * Podepsani base64 challenge
    * @param {string} challenge
    * @param {object} options
    * @returns {Promise<string>}
    */

		}, {
			key: "sign",
			value: function sign(challenge) {
				var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

				return new Promise(function ($return, $error) {
					var o = void 0,
					    signature = void 0;

					challenge = stringToAb(challenge);
					o = Object.assign({}, signOptions, options);
					return crypto.subtle.sign(o, this._priv, challenge).then(function ($await_14) {
						try {
							signature = $await_14;
							return $return(abToString(signature));
						} catch ($boundEx) {
							return $error($boundEx);
						}
					}.bind(this), $error);
				}.bind(this));
			}

			/**
    * Overeni base64 podpisu
    * @param {string} signature
    * @param {string} challenge
    * @param {object} options
    * @returns {Promise<bool>}
    */

		}, {
			key: "verify",
			value: function verify(signature, challenge, options) {
				return new Promise(function ($return, $error) {
					signature = stringToAb(signature);
					challenge = stringToAb(challenge);
					var o = Object.assign({}, signOptions, options);
					return $return(crypto.subtle.verify(o, this._pub, signature, challenge));
				}.bind(this));
			}

			/**
    * Export verejne casti
    * @returns {Promise<string>}
    */

		}, {
			key: "exportPublic",
			value: function exportPublic() {
				return new Promise(function ($return, $error) {
					var key = void 0;
					return subtle.exportKey("spki", this._pub).then(function ($await_15) {
						try {
							key = $await_15;
							key = fixOID(key);
							return $return(abToString(key));
						} catch ($boundEx) {
							return $error($boundEx);
						}
					}.bind(this), $error);
				}.bind(this));
			}
		}]);

		return KeyPair;
	}();

	var OPTIONS = {
		timeout: 0,
		prefix: "/api/v1",
		method: "post"
	};

	var HTTPError = function (_Error) {
		_inherits(HTTPError, _Error);

		function HTTPError(status, message, response) {
			_classCallCheck(this, HTTPError);

			var _this = _possibleConstructorReturn(this, (HTTPError.__proto__ || Object.getPrototypeOf(HTTPError)).call(this, message));

			_this.message = message; // Error.call(this, message) nefunguje
			_this.status = status;
			_this.response = response;

			if (status == 403) {
				location.reload();
				return _possibleConstructorReturn(_this);
			}
			return _this;
		}

		return HTTPError;
	}(Error);

	var TimeoutError = function (_Error2) {
		_inherits(TimeoutError, _Error2);

		function TimeoutError() {
			_classCallCheck(this, TimeoutError);

			var message = "Request timed out";

			var _this2 = _possibleConstructorReturn(this, (TimeoutError.__proto__ || Object.getPrototypeOf(TimeoutError)).call(this, message));

			_this2.message = message; // Error.call(this, message) nefunguje
			return _this2;
		}

		return TimeoutError;
	}(Error);

	var NetworkError = function (_Error3) {
		_inherits(NetworkError, _Error3);

		function NetworkError() {
			_classCallCheck(this, NetworkError);

			var message = "Network error";

			var _this3 = _possibleConstructorReturn(this, (NetworkError.__proto__ || Object.getPrototypeOf(NetworkError)).call(this, message));

			_this3.message = message; // Error.call(this, message) nefunguje
			return _this3;
		}

		return NetworkError;
	}(Error);

	var AbortError = function (_Error4) {
		_inherits(AbortError, _Error4);

		function AbortError() {
			_classCallCheck(this, AbortError);

			var message = "Request aborted";

			var _this4 = _possibleConstructorReturn(this, (AbortError.__proto__ || Object.getPrototypeOf(AbortError)).call(this, message));

			_this4.message = message; // Error.call(this, message) nefunguje
			return _this4;
		}

		return AbortError;
	}(Error);

	function request(url, data, options) {
		return new Request(url, data, options).getPromise();
	}

	var Request = function () {
		function Request() {
			var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "/";

			var _this5 = this;

			var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
			var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

			_classCallCheck(this, Request);

			this._resolve = null;
			this._reject = null;
			this._options = Object.assign({}, OPTIONS, options);

			this._promise = new Promise(function (resolve, reject) {
				_this5._resolve = resolve;
				_this5._reject = reject;
			});

			var xhr = new XMLHttpRequest();
			xhr.addEventListener("abort", this);
			xhr.addEventListener("error", this);
			xhr.addEventListener("timeout", this);
			xhr.addEventListener("load", this);
			xhr.open(this._options.method, "" + this._options.prefix + url, true);
			if ("timeout" in xhr && typeof xhr.timeout != "function") {
				xhr.timeout = this._options.timeout;
			} // IE lze az po .open()
			xhr.setRequestHeader("Accept", "application/json;q=0.9,*/*;q=0.8");

			if (data) {
				data = JSON.stringify(data);
				xhr.setRequestHeader("Content-type", "application/json");
			}
			xhr.send(data);
			this._xhr = xhr;
		}

		_createClass(Request, [{
			key: "getPromise",
			value: function getPromise() {
				return this._promise;
			}
		}, {
			key: "abort",
			value: function abort() {
				if (!this._xhr) {
					return;
				}
				this._xhr.abort();
				this._reject(new AbortError());
			}
		}, {
			key: "handleEvent",
			value: function handleEvent(e) {

				switch (e.type) {
					case "abort":
						this._reject(new AbortError());break;
					case "error":
						this._reject(new NetworkError());break;
					case "timeout":
						this._reject(new TimeoutError());break;
					case "load":
						this._response(e.target);break;
				}
			}
		}, {
			key: "_response",
			value: function _response(xhr) {
				var response = xhr.responseText;

				var ct = xhr.getResponseHeader("content-type");
				if (ct.indexOf("application/json") > -1) {
					try {
						response = JSON.parse(response);
					} catch (e) {
						this._reject(e);
						return;
					}
				}

				var status = xhr.status;
				if (status < 200 || status >= 300) {
					this._reject(new HTTPError(status, xhr.statusText, response));
				} else {
					this._resolve(response);
				}
			}
		}]);

		return Request;
	}();

	function getAndSign(email, browser_id, keyPair) {
		//	console.log("[hpbox] requesting challenge");
		return request("/2fa/challenge", { device_id: browser_id }).then(function (data) {
			return keyPair.sign(data.challenge);
		}).then(function (signature) {
			//		console.log("[hpbox] signature ready");
			return { browser_id: browser_id, signature: signature };
		});
	}

	function sign(email) {
		//	console.log(`[hpbox] signing ${email}`);
		var browser_id = localStorage.getItem("browser_id-" + email);
		var kp = localStorage.getItem("keypair-" + email);
		if (!browser_id || !kp) {
			//		console.log("[hpbox] localStorage does not contain relevant data");
			//		console.log(`[hpbox] localStorage.length ${localStorage.length}`);
			return Promise.reject();
		}

		return KeyPair.fromString(kp).then(function (keyPair) {
			return getAndSign(email, browser_id, keyPair);
		});
	}

	window.addEventListener("message", function (e) {
		//	console.log("[hpbox] message received");
		var origin = e.origin;
		//	if (!checkOrigin(origin)) { return; }

		sign(e.data).then(function (result) {
			return parent.postMessage(result, origin);
		}, function (e) {
			return parent.postMessage(null, origin);
		});
	});

	window.sign = sign;
	//console.log("[hpbox] ready and waiting");
})();

