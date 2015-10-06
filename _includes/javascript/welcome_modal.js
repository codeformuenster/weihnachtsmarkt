var _hideWelcomeModal = function () {
  hideNodeById("welcome");
};
var _showWelcomeModal = function () {
  showNodeById("welcome");
};

L.Util.extend(window.Weihnachtsmarkt, {
  _initWelcomeModal: function () {
    attachClick("closeWelcome", _hideWelcomeModal);
    attachClick("confirmWelcome", _hideWelcomeModal);
  }
});
