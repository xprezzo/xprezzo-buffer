/* eslint-disable node/no-deprecated-api, no-var */

var test = require('tape')
var XprezzoBuffer = require('../').Buffer

test('new XprezzoBuffer(value) works just like Buffer', function (t) {
  t.deepEqual(new XprezzoBuffer('hey'), new Buffer('hey'))
  t.deepEqual(new XprezzoBuffer('hey', 'utf8'), new Buffer('hey', 'utf8'))
  t.deepEqual(new XprezzoBuffer('686579', 'hex'), new Buffer('686579', 'hex'))
  t.deepEqual(new XprezzoBuffer([1, 2, 3]), new Buffer([1, 2, 3]))
  t.deepEqual(new XprezzoBuffer(new Uint8Array([1, 2, 3])), new Buffer(new Uint8Array([1, 2, 3])))

  t.equal(typeof XprezzoBuffer.isBuffer, 'function')
  t.equal(XprezzoBuffer.isBuffer(new XprezzoBuffer('hey')), true)
  t.equal(Buffer.isBuffer(new XprezzoBuffer('hey')), true)
  t.notOk(XprezzoBuffer.isBuffer({}))

  t.end()
})

test('XprezzoBuffer.from(value) converts to a Buffer', function (t) {
  t.deepEqual(XprezzoBuffer.from('hey'), new Buffer('hey'))
  t.deepEqual(XprezzoBuffer.from('hey', 'utf8'), new Buffer('hey', 'utf8'))
  t.deepEqual(XprezzoBuffer.from('686579', 'hex'), new Buffer('686579', 'hex'))
  t.deepEqual(XprezzoBuffer.from([1, 2, 3]), new Buffer([1, 2, 3]))
  t.deepEqual(XprezzoBuffer.from(new Uint8Array([1, 2, 3])), new Buffer(new Uint8Array([1, 2, 3])))

  t.end()
})

test('XprezzoBuffer.alloc(number) returns zeroed-out memory', function (t) {
  for (var i = 0; i < 10; i++) {
    var expected1 = new Buffer(1000)
    expected1.fill(0)
    t.deepEqual(XprezzoBuffer.alloc(1000), expected1)

    var expected2 = new Buffer(1000 * 1000)
    expected2.fill(0)
    t.deepEqual(XprezzoBuffer.alloc(1000 * 1000), expected2)
  }
  t.end()
})

test('XprezzoBuffer.allocUnsafe(number)', function (t) {
  var buf = XprezzoBuffer.allocUnsafe(100) // unitialized memory
  t.equal(buf.length, 100)
  t.equal(XprezzoBuffer.isBuffer(buf), true)
  t.equal(Buffer.isBuffer(buf), true)
  t.end()
})

test('XprezzoBuffer.from() throws with number types', function (t) {
  t.plan(5)
  t.throws(function () {
    XprezzoBuffer.from(0)
  })
  t.throws(function () {
    XprezzoBuffer.from(-1)
  })
  t.throws(function () {
    XprezzoBuffer.from(NaN)
  })
  t.throws(function () {
    XprezzoBuffer.from(Infinity)
  })
  t.throws(function () {
    XprezzoBuffer.from(99)
  })
})

test('XprezzoBuffer.allocUnsafe() throws with non-number types', function (t) {
  t.plan(4)
  t.throws(function () {
    XprezzoBuffer.allocUnsafe('hey')
  })
  t.throws(function () {
    XprezzoBuffer.allocUnsafe('hey', 'utf8')
  })
  t.throws(function () {
    XprezzoBuffer.allocUnsafe([1, 2, 3])
  })
  t.throws(function () {
    XprezzoBuffer.allocUnsafe({})
  })
})

test('XprezzoBuffer.alloc() throws with non-number types', function (t) {
  t.plan(4)
  t.throws(function () {
    XprezzoBuffer.alloc('hey')
  })
  t.throws(function () {
    XprezzoBuffer.alloc('hey', 'utf8')
  })
  t.throws(function () {
    XprezzoBuffer.alloc([1, 2, 3])
  })
  t.throws(function () {
    XprezzoBuffer.alloc({})
  })
})
