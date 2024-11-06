import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';
import { useLocomotiveScroll } from 'react-locomotive-scroll';

const ScrollTriggerProxy = () => {
    const { scroll } = useLocomotiveScroll();

    // Register the GSAP plugin for ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    useEffect(() => {
        if (scroll) {
            console.log("scroll initialized");
            // Get the scrollable element from LocomotiveScroll
            const element = scroll.el;
            if(!element){
                console.log("Element is missing");
                return;
            }

            // Update ScrollTrigger when LocomotiveScroll updates
            scroll.on('scroll', ScrollTrigger.update);

            ScrollTrigger.scrollerProxy(element, {
                scrollTop(value) {
                    return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
                },
                getBoundingClientRect() {
                    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
                },
                pinType: element.style.transform ? "transform" : "fixed",
            });
        }


        return () => {
            ScrollTrigger.addEventListener('refresh', () => scroll?.update());
            ScrollTrigger.refresh();
        };

    }, [scroll]);

    return null;
};

export default ScrollTriggerProxy;
