/*
 * Copyright (c) 2020. by Pablo Klaschka
 */

let mockAnalyticsHelper = {};

mockAnalyticsHelper.send = jest.fn();
mockAnalyticsHelper.verifyAcceptance = jest.fn().mockResolvedValue(true);

module.exports = mockAnalyticsHelper;
