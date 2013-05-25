var EventEmitter = require("events").EventEmitter
var path = require("path")
var extend = require("util")._extend

var reemit = require("re-emitter/reemit")
var yawatch = require("yawatch")
var iterateFiles = require("iterate-files")

/*
    requireFresh := ({ dir: String, watch: Boolean })

    Watch an entire directory and ensure that require's into
        that directory are always fresh. This means that if any
        files in the directory changes we clear the entire
        require cache for that directory.

    This is useful for templates directories where we want to
        clear the cache for all templates when one changes
*/
module.exports = requireFresh

function requireFresh(opts) {
    var directory = opts.dir
    var watch = opts.watch !== false
    var filesToClear = {}

    extend(req, EventEmitter.prototype)
    req._events = {}

    if (watch) {
        var monitor = yawatch.createMonitor()

        reemit(monitor, req, ["add", "change", "remove", "*"])

        monitor.stat([directory], function (err) {
            if (err) {
                return req.emit("error", err)
            }

            monitor.on("add", function (pathname) {
                filesToClear[pathname] = true
            })

            monitor.on("change", function () {
                clearCache()
            })
        })

        iterateFiles(directory, function (filename) {
            filesToClear[filename] = true
        }, function (err) {
            if (err) {
                req.emit("error", err)
            }
        })
    }

    return req

    function req(uri) {
        return require(path.resolve(directory, uri))
    }

    function clearCache() {
        Object.keys(filesToClear).forEach(function (k) {
            delete require.cache[k]
        })
    }
}
