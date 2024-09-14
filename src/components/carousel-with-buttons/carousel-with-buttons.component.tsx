import { FC, ReactElement, useEffect, useRef, useState } from "react";
import {ReactComponent as PreviousIcon} from '@material-design-icons/svg/outlined/chevron_left.svg';
import {ReactComponent as NextIcon} from '@material-design-icons/svg/outlined/chevron_right.svg';

interface CarouselWithButtonsProps {
    previousButtonContainerClass?: string,
    previousButtonClass?: string,
    nextButtonContainerClass?: string,
    nextButtonClass?: string,
    nextIcon?: ReactElement,
    previousIcon?: ReactElement,
    mainContainerClass?: string,
    itemsContainerClass?: string,
    children: ReactElement,
}

const CarouselWithButtons : FC<CarouselWithButtonsProps> = (props) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);

    const checkScrollPosition = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
            console.log(scrollLeft, scrollWidth, clientWidth);
            
        
            // Check if we're at the start
            setIsAtStart(scrollLeft === 0);
        
            // Check if we're at the end
            //.5 % tolerance for irregular displays
            const disableEndButton = scrollLeft + clientWidth >= (scrollWidth * 0.995);
            setIsAtEnd(disableEndButton);
        }
        
    };


    const handleNext = () => {
        if (carouselRef.current) {
          carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' }); // Scrolls to the right
        }
    };
    
      // Step 3: Create a function to handle scrolling to the previous item
    const handlePrev = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' }); // Scrolls to the left
        }
    };

    useEffect(() => {
        // Check the scroll position after each render or resize
        const refCurrent = carouselRef.current;

        const resizeObserver = new ResizeObserver(() => {
            checkScrollPosition();
        });
    
        if (refCurrent) {
          refCurrent.addEventListener('scroll', checkScrollPosition);
          resizeObserver.observe(refCurrent);
        }
    
        // Initial check
        //after repaint(did update)?
        requestAnimationFrame(() => {
            setTimeout(() => {
                checkScrollPosition();
            }, 150);
        });
    
        // Cleanup event listener when the component unmounts
        return () => {
          if (refCurrent) {
            refCurrent.removeEventListener('scroll', checkScrollPosition);
            resizeObserver.disconnect();
          }
        };
    }, [props.children]);

    return (
        <div className={"" + props.mainContainerClass}>
            <div className={"flex items-center justify-end me-3 " + props.previousButtonContainerClass}>
                <button className={"btn "+ props.previousButtonClass}
                    onClick={handlePrev}
                    disabled={isAtStart} // Disable button when at the start
                >
                    {props.previousIcon ?? null}
                    {
                        !props.previousIcon && 
                        <PreviousIcon className="h-10 w-10 "/>
                    }
                </button>
            </div>
            <div ref={carouselRef} className={" carousel rounded-box overflow-y-hidden " + props.itemsContainerClass}>
                {props.children}
            </div>
            <div className={"flex items-center justify-start ms-3 " + props.nextButtonContainerClass}>
                <button className={"btn "+ props.previousButtonClass} 
                    onClick={handleNext}
                    disabled={isAtEnd} // Disable button when at the end
                >
                    {props.nextIcon ?? null}
                    {
                        !props.nextIcon &&
                        <NextIcon className="h-10 w-10" />
                    }
                </button>
            </div>
        </div>
    )
}

export default CarouselWithButtons;