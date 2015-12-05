(function(document) {
  'use strict';

  // 4. Conditionally load webcomponentsjs polyfill.
  var webComponentsSupported = ('registerElement' in document && 'import' in document.createElement('link') && 'content' in document.createElement('template'));

  function finishLazyLoading() {
    // HTML Import's link element.
    var link = document.querySelector('#bundle');

    // 6. Remove skeleton.
     function onImportLoaded() {
      var skeleton = document.getElementById('skeleton');
      skeleton.remove();

      console.log('Elements are upgraded!');
    }

    // 5. Go if the async Import loaded quickly. Otherwise wait for it.
    if (link.import && link.import.readyState === 'complete') {
      console.log('async Import loaded too quickly! Please wait...');
      onImportLoaded();
    }else {
      console.log('Removing skeleton...');
      link.addEventListener('load', onImportLoaded);
    }
  }

  // check if Native Shadow DOM is supported on current running browser.
  if (!webComponentsSupported) {
    var script = document.createElement('script');
    script.async = true;
    script.src = '/bower_components/webcomponentsjs/webcomponents-lite.min.js';
    script.onload = finishLazyLoading;
    document.head.appendChild(script);
    console.log('web-components polyfill is needed!');
  }else {
    console.log('Native Shadow DOM supported! finishlazyLoading...');
    finishLazyLoading();
  }

  // run this when polyfill is needed.
  window.addEventListener('WebComponentsReady', function(){
    console.log('web-components-ready');
  });


  // We use Page.js for routing. This is a Micro
  // client-side router inspired by the Express router
  // More info: https://visionmedia.github.io/page.js/
  // Middleware

  var blog = document.querySelector('semafloor-app-page');

  /**
   * Utility function to listen to an event on a node once.
   */
  function once(node, event, fn, args) {
    var self = this;
    var listener = function () {
      fn.apply(self, args);
      node.removeEventListener(event, listener, false);
    };
    node.addEventListener(event, listener, false);
  }

  /**
   * Routes
   */
  page('/:category/list', function (ctx, next) {
    console.log(ctx);
    var category = ctx.params.category;

    function setData() {
      // if (err) {
      //   blog.category = category;
      //   blog.page = 'main';
      //   return;
      // }

      blog.category = category;
      blog.page = category;
      window.scrollTo(0, 0);
    }

    // Check if element prototype has not been upgraded yet.
    if (!blog.upgraded) {
      once(blog, 'upgraded', setData);
    }else {
      setData();
    }

  });

  page('*', function () {
    console.log('Cant\'t find: ' + window.location.href + '. Redirected you to Home Page');
    page.redirect('/profile/list');
  });

  // add #! before urls
  page({
    hashbang: true
  });

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  // var app = document.querySelector('#app');
  //
  // app.displayInstalledToast = function() {
  //   // Check to make sure caching is actually enabled—it won't be in the dev environment.
  //   if (!document.querySelector('platinum-sw-cache').disabled) {
  //     document.querySelector('#caching-complete').show();
  //   }
  // };
  //
  // // Listen for template bound event to know when bindings
  // // have resolved and content has been stamped to the page
  // app.addEventListener('dom-change', function() {
  //   console.log('Our app is ready to rock!');
  // });
  //
  // // See https://github.com/Polymer/polymer/issues/1381
  // window.addEventListener('WebComponentsReady', function() {
  //   // imports are loaded and elements have been registered
  // });
  //
  // // Main area's paper-scroll-header-panel custom condensing transformation of
  // // the appName in the middle-container and the bottom title in the bottom-container.
  // // The appName is moved to top and shrunk on condensing. The bottom sub title
  // // is shrunk to nothing on condensing.
  // addEventListener('paper-header-transform', function(e) {
  //   var appName = document.querySelector('#mainToolbar .app-name');
  //   var middleContainer = document.querySelector('#mainToolbar .middle-container');
  //   var bottomContainer = document.querySelector('#mainToolbar .bottom-container');
  //   var detail = e.detail;
  //   var heightDiff = detail.height - detail.condensedHeight;
  //   var yRatio = Math.min(1, detail.y / heightDiff);
  //   var maxMiddleScale = 0.50;  // appName max size when condensed. The smaller the number the smaller the condensed size.
  //   var scaleMiddle = Math.max(maxMiddleScale, (heightDiff - detail.y) / (heightDiff / (1-maxMiddleScale))  + maxMiddleScale);
  //   var scaleBottom = 1 - yRatio;
  //
  //   // Move/translate middleContainer
  //   Polymer.Base.transform('translate3d(0,' + yRatio * 100 + '%,0)', middleContainer);
  //
  //   // Scale bottomContainer and bottom sub title to nothing and back
  //   Polymer.Base.transform('scale(' + scaleBottom + ') translateZ(0)', bottomContainer);
  //
  //   // Scale middleContainer appName
  //   Polymer.Base.transform('scale(' + scaleMiddle + ') translateZ(0)', appName);
  // });
  //
  // // Close drawer after menu item is selected if drawerPanel is narrow
  // app.onDataRouteClick = function() {
  //   var drawerPanel = document.querySelector('#paperDrawerPanel');
  //   if (drawerPanel.narrow) {
  //     drawerPanel.closeDrawer();
  //   }
  // };
  //
  // // Scroll page to top and expand header
  // app.scrollPageToTop = function() {
  //   document.getElementById('mainContainer').scrollTop = 0;
  // };

})(document);
