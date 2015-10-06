var error = function (e) {
  console.log(e);
};
var cloneObj = function (obj) {
  return L.Util.extend({}, obj);
};
var nodeById = function (id) {
  return document.getElementById(id);
};
var attachClick = function (id, fun) {
  nodeById(id).addEventListener("pointerup", fun);
};
var hideNodeById = function (id) {
  nodeById(id).style.display = "none";
}
var showNodeById = function (id) {
  nodeById(id).style.display = null;
}

