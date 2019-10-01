import {
	handleCors,
	handleBodyRequestParsing,
	handleCompression,
	applyConfig,
	setupDb
} from './common';

import {handleAPIDocs} from './apiDocs';

export default [
	handleCors,
	handleBodyRequestParsing,
	handleCompression,
	handleAPIDocs,
	applyConfig,
	setupDb
];
