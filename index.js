/* eslint-disable node/no-deprecated-api */
const buffer = require('buffer')
const Buffer = buffer.Buffer
const mixin = require('xprezzo-mixin')

function XprezzoBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

XprezzoBuffer.prototype = Object.create(Buffer.prototype)

// Copy static methods from Buffer
mixin(Buffer, XprezzoBuffer)

XprezzoBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

XprezzoBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  const buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

XprezzoBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

XprezzoBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}

if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
  // after Node.js v12
} else {
  // Copy properties from require('buffer')
  mixin(buffer, exports)
  exports.Buffer = XprezzoBuffer
}

module.exports.mixin = mixin
