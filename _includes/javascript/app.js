L.extend(window.Weihnachtsmarkt, {
  init: function () {
    this._initMap();
    this._initWelcomeModal();
    this._initSearch();

    attachClick("info_button", function () {
      L.DomUtil.get("welcome").style.display = null;
    });
  }
});
