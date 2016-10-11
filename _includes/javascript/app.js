L.extend(window.Weihnachtsmarkt, {
  init: function () {
    var map = this._initMap();
    this._initWelcomeModal();
    this._initSearch();

    attachClick("menu_btn", function () {
      showNodeById("welcome");
    });

    // Editable
    this._enableEditingControls(map);
  }
});
