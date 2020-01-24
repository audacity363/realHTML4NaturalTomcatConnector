// Copyright (c) Software AG, Darmstadt
var m_globalChartConfigInited = false
function iccGlobalChartConfig() {
if (m_globalChartConfigInited) return;
m_globalChartConfigInited = true;
Chart.defaults.global.responsive = true;
}