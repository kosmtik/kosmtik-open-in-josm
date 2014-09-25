var Hash = function (config) {
    config.addJS('/node_modules/leaflet-editinosm/Leaflet.EditInOSM.js');
    config.addCSS('/node_modules/leaflet-editinosm/Leaflet.EditInOSM.css');
    config.addJS('/editinosm.js');
    config.on('server:init', this.attachRoutes.bind(this));
};

Hash.prototype.extendMap = function (req, res) {

    var front = function () {
        L.K.Map.addInitHook(function () {
            this.whenReady(function () {
                var options = {
                    position: 'topleft',
                    widget: 'simplebutton',
                    widgetOptions: {
                        helpText: 'OSM',
                        className: 'kosmtik-editinosm'
                    },
                    zoomThreshold: 14,
                    editors: ['josm']
                };
                this.editinosm = (new L.Control.EditInOSM(options)).addTo(this);
            });
        });
    };
    this.pushToFront(res, front);
};

Hash.prototype.attachRoutes = function (e) {
    e.server.addRoute('/editinosm.js', this.extendMap);
};

exports.Plugin = Hash;
