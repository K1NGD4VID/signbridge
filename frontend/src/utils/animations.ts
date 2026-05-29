import gsap from 'gsap'

export const fadeUpStagger = (
  selector: gsap.DOMTarget, 
  delay: number = 0, 
  stagger: number = 0.1
) => {
  return gsap.fromTo(
    selector,
    {
      y: 30,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      delay,
      stagger,
      ease: 'expo.out',
    }
  )
}

export const splitTextReveal = (
  selector: gsap.DOMTarget,
  delay: number = 0
) => {
  return gsap.fromTo(
    selector,
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1.8,
      delay,
      stagger: 0.05,
      ease: 'expo.out',
    }
  )
}

export const springPhysicsScale = (
  selector: gsap.DOMTarget,
  active: boolean
) => {
  return gsap.to(selector, {
    scale: active ? 1.05 : 1,
    duration: 0.5,
    ease: 'elastic.out(1, 0.3)',
  })
}
