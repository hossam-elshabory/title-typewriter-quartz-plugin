export { QuartzPluginData, StaticResources } from '@quartz-community/types';

interface TypewriterTitleOptions {
    /** Milliseconds per character during typing animation. Lower is faster. */
    typingSpeed?: number;
    /** Whether the cursor keeps blinking indefinitely after typing finishes. */
    keepBlinking?: boolean;
    /** Speed of the blink cycle in milliseconds. */
    blinkSpeed?: number;
    /** Only play the typing animation on the home page. When false, typing plays on the first page visited. */
    animateOnlyOnHome?: boolean;
}

export type { TypewriterTitleOptions };
