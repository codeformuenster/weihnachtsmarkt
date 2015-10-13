var error = function (e) {
  console.log(e);
};
var attachClick = function (id, fun) {
  L.DomEvent.on(L.DomUtil.get(id), {"pointerup": fun});
};
var hideNodeById = function (id) {
  L.DomUtil.addClass(L.DomUtil.get(id), "hidden");
}
var showNodeById = function (id) {
  L.DomUtil.removeClass(L.DomUtil.get(id), "hidden");
}

