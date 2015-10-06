L.extend(window.Weihnachtsmarkt, {
  init: function () {
    // make local copy of data
    this._rawdata = cloneObj(window.WeihnachtsmarktData);

    this._initMap();
    this._initWelcomeModal();
    this._initSearch();

  }
});
