import React, { FC, ReactElement } from "react";
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
    modalClass?: string,
    modalBoxClass?: string,
    modalActionClass?: string,
    closeButtonClass?: string,
    acceptButtonClass?: string,
    cancelButtonClass?: string
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
    modalClass = '',
    modalBoxClass = '',
    modalActionClass = '',
    closeButtonClass = '',
    acceptButtonClass = '',
    cancelButtonClass = ''
}) => {
    function triggerClose(eventType?: number){
        if( eventType === CustomModalEnum.ACCEPT_ACTION){
            acceptEvent?.();
        }else if(eventType === CustomModalEnum.CLOSE_ACTION){
            closeEvent?.();
        }
        (document.getElementById(id) as HTMLFormElement)?.close();
    }
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
                        modalFunction: triggerClose
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