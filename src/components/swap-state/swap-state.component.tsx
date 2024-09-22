import { ReactComponent as CorrectIcon} from '@material-design-icons/svg/outlined/check.svg';
import { ReactComponent as WrongIcon} from '@material-design-icons/svg/outlined/dangerous.svg';
import { useEffect, useRef, useState } from 'react';
import ConfettiExplosion from "react-canvas-confetti/dist/presets/realistic";

const SwapState = ({
    state = false,
    message = '',
    hasCompletedAnimation = true
}) => {
    const componentRef = useRef<HTMLDivElement | null>(null);
    const [numberOfParticles, setNumberOfParticles] = useState(200);

    useEffect(() => {
        if(state){
            setNumberOfParticles(300);
            setTimeout(() => {
                setNumberOfParticles(0);
            }, 3000);
        }else{
            setNumberOfParticles(0);
        }
    }, [state]);

    return (
        <div ref={componentRef} className="flex items-start relative">
            <label className="swap">
                {/* this hidden checkbox controls the state */}
                <input type="checkbox" checked={state} readOnly disabled/>

                <CorrectIcon className="swap-on text-success h-10 w-10"/>

                <WrongIcon className="swap-off text-error h-10 w-10"/>
            </label>
            {/** TODO Revisar mejor alternativa */}
            {/* {
                hasCompletedAnimation &&
                numberOfParticles !== 0 &&
                <ReactConfetti numberOfPieces={numberOfParticles} height={40} width={40} className='absolute top-0 left-0'/>
            } */}
            {
                hasCompletedAnimation &&
                numberOfParticles !== 0 &&
                <ConfettiExplosion autorun={{ speed: 5, duration: 100 }} height={40} width={60} className='absolute top-0 left-0'/>
            }
            <span className={'duration-300 ' + (state ? 'text-success' : 'text-error')}>{message}</span>
        </div>
    )
}

export default SwapState;