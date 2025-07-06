declare module 'embla-carousel-autoplay' {
  import { EmblaCarouselType, LoosePluginType } from 'embla-carousel'
  
  export interface AutoplayOptions {
    delay?: number
    stopOnInteraction?: boolean
    stopOnMouseEnter?: boolean
    stopOnLastSnap?: boolean
  }

  export interface AutoplayType {
    play: () => void
    stop: () => void
    reset: () => void
  }

  export default function Autoplay(
    options?: AutoplayOptions
  ): LoosePluginType
}