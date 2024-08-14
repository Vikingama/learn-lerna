Math.easeInOutQuad = (t, b, c, d) => {
  let mT = t
  mT /= d / 2
  if (mT < 1) {
    return (c / 2) * mT * mT + b
  }
  mT -= 1
  return (-c / 2) * (mT * (mT - 2) - 1) + b
}

// requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
const requestAnimFrame = (function f1() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function f2(callback) {
      window.setTimeout(callback, 1000 / 60)
    }
  )
})()

/**
 * Because it's so fucking difficult to detect the scrolling element, just move them all
 * @param {number} amount
 */
function move(amount) {
  document.documentElement.scrollTop = amount
  document.body.parentNode.scrollTop = amount
  document.body.scrollTop = amount
}

function position() {
  return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop
}

/**
 * @param {number} to
 * @param {number} duration
 * @param {Function} callback
 */
export default (to, duration, callback) => {
  const start = position()
  const change = to - start
  const increment = 20
  let currentTime = 0
  const mDuration = typeof duration === 'undefined' ? 500 : duration
  const animateScroll = () => {
    // increment the time
    currentTime += increment
    // find the value with the quadratic in-out easing function
    const val = Math.easeInOutQuad(currentTime, start, change, mDuration)
    // move the document.body
    move(val)
    // do the animation unless its over
    if (currentTime < mDuration) {
      requestAnimFrame(animateScroll)
    } else if (callback && typeof callback === 'function') {
      // the animation is done so lets callback
      callback()
    }
  }
  animateScroll()
}
