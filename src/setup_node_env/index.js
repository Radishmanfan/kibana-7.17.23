/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

require('./no_transpilation');

// restore < Node 16 default DNS lookup behavior
require('./dns_ipv4_first');

// eslint-disable-next-line import/no-extraneous-dependencies
require('@kbn/babel-register').registerNodeAutoTranspilation();
