---
---
"use strict";
(function() {
  "use strict";
  {% include vendor/pep.min.js %}
  {% include vendor/leaflet.js %}

  window.Weihnachtsmarkt = {};
  {% include javascript/util.js %}
  {% include javascript/map.js %}
  {% include javascript/welcome_modal.js %}
  {% include javascript/search.js %}
  {% include javascript/app.js %}

  // check for Leaflet Library
  if (!window.L) {
    error("Leaflet not found");
    return;
  }

}).call(this);
