# set the image default path for leaflet in order to use local images
L.Icon.Default.imagePath = "images"

# Patch the popup class to support closing through additional link
L.Popup = L.Popup.extend
  _initLayout: ->
    prefix = "leaflet-popup"
    container = @_container = L.DomUtil.create("div", prefix + " " + (@options.className or "") + " leaflet-zoom-" + ((if @_zoomAnimated then "animated" else "hide")))
    if @options.closeButton
      closeButton = @_closeButton = L.DomUtil.create("a", prefix + "-close-button", container)
      closeButton.href = "#close"
      closeButton.innerHTML = "&#215;"
      L.DomEvent.on closeButton, "click", @_onCloseButtonClick, this
    wrapper = @_wrapper = L.DomUtil.create("div", prefix + "-content-wrapper", container)
    @_contentNode = L.DomUtil.create("div", prefix + "-content", wrapper)

    # patch: Add link
    closeLink = L.DomUtil.create('span', 'popup-close-link link pointer', wrapper)
    closeLink.innerHTML = 'schließen'
    L.DomEvent.on(closeLink, 'click', @_onCloseButtonClick, @)

    L.DomEvent.disableClickPropagation(wrapper).disableScrollPropagation(@_contentNode).on wrapper, "contextmenu", L.DomEvent.stopPropagation
    @_tipContainer = L.DomUtil.create("div", prefix + "-tip-container", container)
    @_tip = L.DomUtil.create("div", prefix + "-tip", @_tipContainer)

    return


# initialize angular app
angular.module "wm-map", ["leaflet-directive"]