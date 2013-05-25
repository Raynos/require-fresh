var test = require("tape")

var require-fresh = require("../index")

test("require-fresh is a function", function (assert) {
    assert.equal(typeof require-fresh, "function")
    assert.end()
})
