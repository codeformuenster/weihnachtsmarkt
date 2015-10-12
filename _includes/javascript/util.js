var error = function (e) {
  console.log(e);
};
var attachClick = function (id, fun) {
  L.DomUtil.get(id).addEventListener("pointerup", fun);
};
var hideNodeById = function (id) {
  L.DomUtil.get(id).style.display = "none";
}
var showNodeById = function (id) {
  L.DomUtil.get(id).style.display = null;
}

