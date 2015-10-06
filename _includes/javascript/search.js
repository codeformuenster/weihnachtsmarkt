var _resetSearch = function () {
  this._searchInputNode.value = "";
  // manually call _onSearchInput because programatically
  // setting the value does not trigger the event
  _onSearchInput.apply(this);
};

var _onSearchInput = function (evt) {
  // check if input is not empty
  if (evt && L.Util.trim(evt.target.value) !== "") {
    showNodeById("reset_search");
  } else {
    hideNodeById("reset_search");
  }
  // apply style to geojson..
  this._staendeLayer.setStyle(this._staendeStyleFunction.bind(this));
};

L.Util.extend(window.Weihnachtsmarkt, {
  _getSearchString: function () {
    var str = "";
    if (this._searchInputNode && this._searchInputNode.value) {
      str = L.Util.trim(this._searchInputNode.value).replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }
    return str;
  },
  _initSearch: function () {
    // searchable attributes..
    this._searchableProperties = ["betreiber", "angebot"];

    // init search input node
    this._searchInputNode = nodeById("search_input");
    // reset Button..
    attachClick("reset_search", _resetSearch.bind(this));

    // attach event on input
    this._searchInputNode.addEventListener("input", _onSearchInput.bind(this));
  }
});

