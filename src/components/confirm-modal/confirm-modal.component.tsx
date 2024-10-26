import { FC } from "react"
import { CustomModalEnum } from "../../enums/custom-modal.enum"

interface ConfirmModalProps {
    modalFunction?: (event: CustomModalEnum) => void,
    text: string,
    title: string,
    acceptButtonText?: string,
    cancelButtonText?: string
}

const ConfirmModal: FC<ConfirmModalProps> = (props) => {

    const handleButtonClick = (decision: CustomModalEnum) => {
        props.modalFunction?.(decision);
    }

    return (
        <div className="card">
            <div className="card-body">
                <span className="font-bold text-lg text-center my-2">{props.title}</span>
                <span className="text-left my-2">{props.text}</span>
                <div className="card-actions justify-end my-2">
                    <button className="btn btn-primary" onClick={() => handleButtonClick(CustomModalEnum.ACCEPT_ACTION)}>{props.acceptButtonText || 'Aceptar'}</button>
                    <button className="btn btn-ghost" onClick={() => handleButtonClick(CustomModalEnum.CLOSE_ACTION)}>{props.cancelButtonText || 'Cancelar'}</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal;