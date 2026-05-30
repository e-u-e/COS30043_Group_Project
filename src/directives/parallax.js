const DEFAULT_SPEED = 0.5
const DEFAULT_ROTATE_SPEED = 0
const DEFAULT_SCALE_SPEED = 0
const DEFAULT_SCALE_BASE = 1
const DEFAULT_REVEAL_TRANSLATE = 0
const DEFAULT_REVEAL_OPACITY = 1
const DEFAULT_REVEAL_START = 0.9
const DEFAULT_REVEAL_END = 0.6

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function getSpeed(binding) {
  if (typeof binding.value === 'number') {
    return binding.value
  }

  if (binding.value && typeof binding.value.speed === 'number') {
    return binding.value.speed
  }

  return DEFAULT_SPEED
}

function getRotateSpeed(binding) {
  if (!binding.value || typeof binding.value === 'number') {
    return DEFAULT_ROTATE_SPEED
  }

  if (typeof binding.value.rotate === 'number') {
    return binding.value.rotate
  }

  if (typeof binding.value.rotation === 'number') {
    return binding.value.rotation
  }

  if (typeof binding.value.rotateSpeed === 'number') {
    return binding.value.rotateSpeed
  }

  return DEFAULT_ROTATE_SPEED
}

function getScaleSpeed(binding) {
  if (!binding.value || typeof binding.value === 'number') {
    return DEFAULT_SCALE_SPEED
  }

  if (typeof binding.value.scale === 'number') {
    return binding.value.scale
  }

  if (typeof binding.value.scaleSpeed === 'number') {
    return binding.value.scaleSpeed
  }

  return DEFAULT_SCALE_SPEED
}

function getScaleBase(binding) {
  if (!binding.value || typeof binding.value === 'number') {
    return DEFAULT_SCALE_BASE
  }

  if (typeof binding.value.scaleBase === 'number') {
    return binding.value.scaleBase
  }

  if (typeof binding.value.baseScale === 'number') {
    return binding.value.baseScale
  }

  return DEFAULT_SCALE_BASE
}

function getRevealTranslate(binding) {
  if (!binding.value || typeof binding.value === 'number') {
    return DEFAULT_REVEAL_TRANSLATE
  }

  if (typeof binding.value.translate === 'number') {
    return binding.value.translate
  }

  if (binding.value.reveal && typeof binding.value.reveal.translate === 'number') {
    return binding.value.reveal.translate
  }

  if (binding.value.reveal && typeof binding.value.reveal.y === 'number') {
    return binding.value.reveal.y
  }

  return DEFAULT_REVEAL_TRANSLATE
}

function getRevealOpacity(binding) {
  if (!binding.value || typeof binding.value === 'number') {
    return DEFAULT_REVEAL_OPACITY
  }

  if (typeof binding.value.opacity === 'number') {
    return binding.value.opacity
  }

  if (binding.value.reveal && typeof binding.value.reveal.opacity === 'number') {
    return binding.value.reveal.opacity
  }

  return DEFAULT_REVEAL_OPACITY
}

function getRevealStart(binding) {
  if (!binding.value || typeof binding.value === 'number') {
    return DEFAULT_REVEAL_START
  }

  if (typeof binding.value.start === 'number') {
    return binding.value.start
  }

  if (binding.value.reveal && typeof binding.value.reveal.start === 'number') {
    return binding.value.reveal.start
  }

  return DEFAULT_REVEAL_START
}

function getRevealEnd(binding) {
  if (!binding.value || typeof binding.value === 'number') {
    return DEFAULT_REVEAL_END
  }

  if (typeof binding.value.end === 'number') {
    return binding.value.end
  }

  if (binding.value.reveal && typeof binding.value.reveal.end === 'number') {
    return binding.value.reveal.end
  }

  return DEFAULT_REVEAL_END
}

function applyParallax(el) {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0
  const offset = scrollTop * (el._parallaxSpeed ?? DEFAULT_SPEED)
  const rotation = scrollTop * (el._parallaxRotateSpeed ?? DEFAULT_ROTATE_SPEED)
  const scaleBase = el._parallaxScaleBase ?? DEFAULT_SCALE_BASE
  const scale = scaleBase + scrollTop * (el._parallaxScaleSpeed ?? DEFAULT_SCALE_SPEED)
  const revealTranslate = el._parallaxRevealTranslate ?? DEFAULT_REVEAL_TRANSLATE
  const revealOpacity = el._parallaxRevealOpacity ?? DEFAULT_REVEAL_OPACITY
  const revealStart = el._parallaxRevealStart ?? DEFAULT_REVEAL_START
  const revealEnd = el._parallaxRevealEnd ?? DEFAULT_REVEAL_END
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1
  const rect = el.getBoundingClientRect()
  const startPoint = viewportHeight * revealStart
  const endPoint = viewportHeight * revealEnd
  const denom = startPoint - endPoint || 1
  const progress = clamp((startPoint - rect.top) / denom, 0, 1)
  const revealOffset = (1 - progress) * revealTranslate
  const revealAlpha = revealOpacity + progress * (1 - revealOpacity)
  el.style.setProperty('--parallax-y', `${offset}px`)
  el.style.setProperty('--parallax-rotate', `${rotation}deg`)
  el.style.setProperty('--parallax-scale', String(scale))
  el.style.setProperty('--parallax-reveal-translate', `${revealOffset}px`)
  el.style.setProperty('--parallax-reveal-opacity', String(revealAlpha))
}

export const parallaxDirective = {
  mounted(el, binding) {
    el._parallaxSpeed = getSpeed(binding)
    el._parallaxRotateSpeed = getRotateSpeed(binding)
    el._parallaxScaleSpeed = getScaleSpeed(binding)
    el._parallaxScaleBase = getScaleBase(binding)
    el._parallaxRevealTranslate = getRevealTranslate(binding)
    el._parallaxRevealOpacity = getRevealOpacity(binding)
    el._parallaxRevealStart = getRevealStart(binding)
    el._parallaxRevealEnd = getRevealEnd(binding)

    el.style.setProperty('--parallax-reveal-translate', `${el._parallaxRevealTranslate}px`)
    el.style.setProperty('--parallax-reveal-opacity', String(el._parallaxRevealOpacity))

    const onScroll = () => {
      if (el._parallaxRafId) {
        return
      }

      el._parallaxRafId = requestAnimationFrame(() => {
        applyParallax(el)
        el._parallaxRafId = null
      })
    }

    el._parallaxHandler = onScroll

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    el._parallaxInitRafId = requestAnimationFrame(() => {
      applyParallax(el)
      el._parallaxInitRafId = null
    })
  },

  updated(el, binding) {
    const nextSpeed = getSpeed(binding)
    const nextRotateSpeed = getRotateSpeed(binding)
    const nextScaleSpeed = getScaleSpeed(binding)
    const nextScaleBase = getScaleBase(binding)
    const nextRevealTranslate = getRevealTranslate(binding)
    const nextRevealOpacity = getRevealOpacity(binding)
    const nextRevealStart = getRevealStart(binding)
    const nextRevealEnd = getRevealEnd(binding)
    if (
      nextSpeed !== el._parallaxSpeed
      || nextRotateSpeed !== el._parallaxRotateSpeed
      || nextScaleSpeed !== el._parallaxScaleSpeed
      || nextScaleBase !== el._parallaxScaleBase
      || nextRevealTranslate !== el._parallaxRevealTranslate
      || nextRevealOpacity !== el._parallaxRevealOpacity
      || nextRevealStart !== el._parallaxRevealStart
      || nextRevealEnd !== el._parallaxRevealEnd
    ) {
      el._parallaxSpeed = nextSpeed
      el._parallaxRotateSpeed = nextRotateSpeed
      el._parallaxScaleSpeed = nextScaleSpeed
      el._parallaxScaleBase = nextScaleBase
      el._parallaxRevealTranslate = nextRevealTranslate
      el._parallaxRevealOpacity = nextRevealOpacity
      el._parallaxRevealStart = nextRevealStart
      el._parallaxRevealEnd = nextRevealEnd
      applyParallax(el)
    }
  },

  unmounted(el) {
    window.removeEventListener('scroll', el._parallaxHandler)
    window.removeEventListener('resize', el._parallaxHandler)

    if (el._parallaxInitRafId) {
      cancelAnimationFrame(el._parallaxInitRafId)
    }

    if (el._parallaxRafId) {
      cancelAnimationFrame(el._parallaxRafId)
    }

    delete el._parallaxHandler
    delete el._parallaxInitRafId
    delete el._parallaxRafId
    delete el._parallaxSpeed
    delete el._parallaxRotateSpeed
    delete el._parallaxScaleSpeed
    delete el._parallaxScaleBase
    delete el._parallaxRevealTranslate
    delete el._parallaxRevealOpacity
    delete el._parallaxRevealStart
    delete el._parallaxRevealEnd
  }
}
