class OpenInJOSM {
    constructor(config) {
        config.addJS('/node_modules/leaflet-editinosm/Leaflet.EditInOSM.js');
        config.addCSS('/node_modules/leaflet-editinosm/Leaflet.EditInOSM.css');
        config.addJS('/open-in-josm.js');
        config.on('server:init', this.attachRoutes.bind(this));
    }

    extendMap(req, res) {
        var front = function () {
            L.K.Map.addInitHook(function () {
                this.whenReady(function () {
                    var options = {
                        position: 'topleft',
                        widget: 'simplebutton',
                        widgetOptions: {
                            helpText: 'JOSM',
                            className: 'kosmtik-open-in-josm'
                        },
                        zoomThreshold: 14,
                        editors: ['josm']
                    };
                    this.openinjosm = (new L.Control.EditInOSM(options)).addTo(this);
                });
            });
        };
        this.pushToFront(res, front);
    };

    attachRoutes(e) {
        e.server.addRoute('/open-in-josm.js', this.extendMap);
    };
}

exports = { Plugin: OpenInJOSM };
