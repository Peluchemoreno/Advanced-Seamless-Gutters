window.hjSiteSettings = window.hjSiteSettings || {"site_id":1839869,"r":1.0,"rec_value":0.2625,"state_change_listen_mode":"automatic","record":false,"continuous_capture_enabled":true,"recording_capture_keystrokes":false,"anonymize_digits":true,"anonymize_emails":true,"suppress_all":false,"suppress_text":false,"suppress_location":false,"user_attributes_enabled":false,"legal_name":null,"privacy_policy_url":null,"deferred_page_contents":[],"record_targeting_rules":[],"feedback_widgets":[],"heatmaps":[],"polls":[],"integrations":{"optimizely":{"tag_recordings":false},"google_optimize":{"tag_recordings":false}},"features":["settings.billing_v2","feedback.embeddable_widget","ingestion.http.page_content","client_script.metrics","feedback.widgetV2","client_script.safe_date","error_reporting","heatmap.continuous.manual_retaker","feedback.widget_telemetry"]};

!function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=270)}({270:function(e,t,r){"use strict";var n;function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.r(t);var s=function(){try{return"performance"in window&&"now"in window.performance}catch(e){return!1}},c={metricsUrl:(null===(n=window._hjSettings)||void 0===n?void 0:n.metricsUrl)||"https://csmetrics.hotjar.com",features:{metrics:{flag:"client_script.metrics",sampling:.1},debug:{flag:"client_script.metrics.debug",sampling:.5}},browser:{hasPerformance:!1,hasDebug:!1}},d={isDebugEnabled:!1,isMetricsEnabled:!1,loggedMetrics:{},genericTags:{}},u=function(e,t,r){d.loggedMetrics[e]=i(i({},d.loggedMetrics[e]),{},o({},t,r))},l=function(e){return e&&(e.task||e.reason||e.module)||"value"},f=function(e,t){var r=l(t),n=d.loggedMetrics[e],a=n&&n[r]||{};return{tagName:r,start:a.start,end:a.end,total:a.total}},p=function(e){var t=e.tag||void 0;return d.isDebugEnabled?i(i(i({},t),e.extraTags),d.genericTags):t},h=function(e){var t=d.isMetricsEnabled||d.isDebugEnabled;return e?t&&e.flush:t},g={getState:function(){return i({},d)},start:function(){try{c.browser={hasPerformance:s(),hasDebug:/hjDebug=1/.test(location.search)},d.metricsStartTime=c.browser.hasPerformance?performance.now():void 0;var e=window.hjSiteSettings||{},t=e.features,r=e.site_id,n=new Set(t),a=c.features,i=a.debug,o=a.metrics;d.genericTags={site_id:r},d.isDebugEnabled=n.has(i.flag)&&Math.random()<=i.sampling,d.isMetricsEnabled=n.has(o.flag)&&Math.random()<=o.sampling}catch(e){console.debug("Error in metrics.start",{error:e})}},reset:function(){try{d.loggedMetrics={},d.metricsStartTime=c.browser.hasPerformance?performance.now():void 0}catch(e){}},stop:function(){d.isDebugEnabled=!1,d.isMetricsEnabled=!1,d.genericTags={}},send:function(e,t){var r=!1,n=JSON.stringify([t]),a=d.isDebugEnabled?"".concat(e,"?debug=true"):e;if("sendBeacon"in navigator)try{r=navigator.sendBeacon.bind(navigator)(a,n)}catch(e){}if(!1===r)try{var i=new XMLHttpRequest;i.open("POST",a),i.send(n)}catch(e){}c.browser.hasDebug&&console.debug("New metric/log: ",n)},count:function(e,t){var r=t.incr,n=t.tag,a=t.extraTags;try{var s=l(n),u=d.loggedMetrics[e],f=(u&&u[s]||0)+((null==r?void 0:r.value)||1);if(d.loggedMetrics[e]=i(i({},u),{},o({},s,f)),h(r)){var m={name:e,type:"count",value:f,tags:p({tag:n,extraTags:a})};g.send(c.metricsUrl,m)}}catch(e){}},time:function(){try{return c.browser.hasPerformance?performance.now():0}catch(e){return 0}},timeStart:function(e,t){try{var r=g.time(),n=f(e,t),a=n.start,i=n.tagName;if(a)return;return u(e,i,{start:r}),r}catch(e){}},timeEnd:function(e,t){var r=t.tag,n=t.incr,a=t.extraTags;try{var i,o=g.time(),s=f(e,r),l=s.start,m=s.tagName,j=s.total;if(n)i=(j||0)+(o-n.start),u(e,m,{total:i});else{var w=l||d.metricsStartTime;i=w&&o?o-w:void 0,u(e,m,{start:w,end:o})}if(i&&h(n)){var _={name:e,type:"distribution",value:Math.round(i),tags:p({tag:r,extraTags:a})};g.send(c.metricsUrl,_)}return o}catch(t){console.debug("Failed to send timer metric: ",{name:e,tag:r,error:t})}}};window.hj=window.hj||function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];(window.hj.q=window.hj.q||[]).push(t)},window.hj.metrics=g,hj.metrics.start(),window.hjBootstrap=window.hjBootstrap||function(e,t,r){var n=["bot","google","headless","baidu","bing","msn","duckduckbot","teoma","slurp","yandex","phantomjs","pingdom","ahrefsbot"].join("|"),a=new RegExp(n,"i"),i=window.navigator||{userAgent:"unknown"},o=i.userAgent?i.userAgent:"unknown";if(a.test(o))return hj.metrics.count("session-rejection",{tag:{reason:"bot"}}),void console.warn("Hotjar not launching due to suspicious userAgent:",o);var s="http:"===window.location.protocol,c=Boolean(window._hjSettings.preview);if(s&&!c)return hj.metrics.count("session-rejection",{tag:{reason:"https"}}),void console.warn("For security reasons, Hotjar only works over HTTPS. Learn more: https://help.hotjar.com/hc/en-us/articles/115011624047");var d=function(e,t,r){window.hjBootstrapCalled=(window.hjBootstrapCalled||[]).concat(r),window.hj&&window.hj._init&&window.hj._init._verifyInstallation&&hj._init._verifyInstallation()};d(0,0,r);var u=window.document,l=u.head||u.getElementsByTagName("head")[0];if(u.addEventListener){hj.scriptDomain=e;var f=u.createElement("script");f.async=1,f.src=hj.scriptDomain+t,f.charset="utf-8",l.appendChild(f);var p=["iframe#_hjRemoteVarsFrame {","display: none !important; width: 1px !important; height: 1px !important; opacity: 0 !important; pointer-events: none !important;","}"],h=u.createElement("style");h.type="text/css",h.styleSheet?h.styleSheet.cssText=p.join(""):h.appendChild(u.createTextNode(p.join(""))),l.appendChild(h);var g=u.createElement("iframe");g.style.cssText=p[1],g.name="_hjRemoteVarsFrame",g.title="_hjRemoteVarsFrame",g.tabIndex=-1,g.setAttribute("aria-hidden","true"),g.id="_hjRemoteVarsFrame",g.src="https://"+(window._hjSettings.varsHost||"vars.hotjar.com")+"/box-5e66f98b4ee957db209dc6f63e3d59dd.html",g.onload=function(){d.varsLoaded=!0,"undefined"!=typeof hj&&hj.event&&hj.event.signal&&hj.event.signal("varsLoaded")},d.varsJar=g,"interactive"===u.readyState||"complete"===u.readyState||"loaded"===u.readyState?m():u.addEventListener("DOMContentLoaded",m),d.revision="84841b815d74",window.hjBootstrap=d}function m(){setTimeout((function(){u.body.appendChild(g)}),50)}},window.hjBootstrap("https://script.hotjar.com/","modules.2258f2bad9aa53d2a0c2.js","1839869"),window.hjLazyModules=window.hjLazyModules||{SURVEY_V2:{js:"survey-v2.fe6f17d7d6342d9abc9b.js"},SURVEY_BOOTSTRAPPER:{js:"survey-bootstrapper.671ec998ad535fd6e40f.js"},SURVEY_ISOLATED:{js:"survey-isolated.a1d8102a1f1597e4bd51.js"},HEATMAP_SCREENSHOTTER:{js:"heatmap-screenshotter.d81c8f7e24ce35212af2.js"},HEATMAP_VIEWER:{js:"heatmap-viewer.325cca4c6dc051ba64e8.js"},HEATMAP_DYNAMIC_VIEW:{js:"heatmap-dynamic-view.2361f5d42a90f8118dc1.js"},HEATMAP_RETAKER:{js:"heatmap-retaker.71936d518817b9897bc5.js"},SURVEY_INVITATION:{js:"survey-invitation.a36c19d04e55f2b6e381.js"},NOTIFICATION:{js:"notification.9ff05250da0f1b1a8f28.js"},INCOMING_FEEDBACK:{js:"incoming-feedback.68caa78f7667896490c8.js"},PREACT_INCOMING_FEEDBACK:{js:"preact-incoming-feedback.10c79b2c94bc18511ce6.js"},SENTRY:{js:"sentry.80ac424b277bfaaf0403.js"}}}});
