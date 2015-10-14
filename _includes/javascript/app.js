L.extend(window.Weihnachtsmarkt, {
  init: function () {
    this._initMap();
    this._initWelcomeModal();
    this._initSearch();

    attachClick("menu_btn", function () {
      showNodeById("welcome");
    });
  }
});
