import React, { FC, ReactElement, useEffect } from "react";
import { CustomModalEnum } from "../../enums/custom-modal.enum";

interface CustomModalProps {
    id: string,
    children: ReactElement,
    hasCloseButton?: boolean,
    hasCancelButton?: boolean,
    hasAcceptButton?: boolean,
    isDismissable?: boolean,
    closeEvent?: () => void,
    acceptEvent?: () => void,
    submitEvent?: (args: any) => void,
    modalClass?: string,
    modalBoxClass?: string,
    modalActionClass?: string,
    closeButtonClass?: string,
    acceptButtonClass?: string,
    cancelButtonClass?: string,
    data?: any
}

const CustomModal: FC<CustomModalProps> = ({
    id,
    children,
    hasCloseButton = true,
    hasCancelButton = false,
    hasAcceptButton = false,
    isDismissable = true,
    closeEvent = undefined,
    acceptEvent = undefined,
    submitEvent = undefined,
    modalClass = '',
    modalBoxClass = '',
    modalActionClass = '',
    closeButtonClass = '',
    acceptButtonClass = '',
    cancelButtonClass = '',
    data = null
}) => {
    function triggerClose(eventType?: CustomModalEnum, data?: any){
        switch( eventType ){
            case CustomModalEnum.ACCEPT_ACTION:
                acceptEvent?.();
                break;
            case CustomModalEnum.CLOSE_ACTION:
                closeEvent?.();
                break;
            case CustomModalEnum.SUBMIT_ACTION:
                submitEvent?.(data);
                break;
            default:
                break;
        }
        (document.getElementById(id) as HTMLFormElement)?.close();
    }

    useEffect(() => {
        const handleEscButton = (event: any) => {
            const key = event.key; // Or const {key} = event; in ES6+
            if (key === "Escape") {
                event.preventDefault();
                triggerClose?.(CustomModalEnum.CLOSE_ACTION);
            }
        }
        window.addEventListener("keydown", handleEscButton);

        return () => {
            window.removeEventListener("keydown", handleEscButton);
        }
    }, []);
    
    return (
        <dialog id={id} className={`modal ${modalClass}`} onCancel={closeEvent}>
            <div className={`modal-box ${modalBoxClass}`}>
                {
                    hasCloseButton &&
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button onClick={closeEvent} className={`btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ${closeButtonClass}`}>✕</button>
                    </form>
                }
                {
                    React.cloneElement(children, {
                        modalFunction: triggerClose,
                        data: data
                    })
                }
                <div className={`modal-action ${modalActionClass}`}>
                    {
                        hasAcceptButton && 
                        <form method="dialog">
                            <button className={`btn btn-success ${acceptButtonClass}`} onClick={acceptEvent}>Aceptar</button>
                        </form>
                    }
                    {
                        hasCancelButton && 
                        <form method="dialog">
                            <button className={`btn ${cancelButtonClass}`} onClick={closeEvent}>Close</button>
                        </form>
                    }
                </div>
            </div>
            {
                isDismissable && 
                <form method="dialog" className="modal-backdrop">
                    <button onClick={closeEvent}>close</button>
                </form>
            }
        </dialog>
    )
}

export default CustomModal;