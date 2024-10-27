import { FC } from "react";
import { Address } from "../../interfaces/Address";
import { ReactComponent as AddressIcon } from '@material-design-icons/svg/outlined/person_pin_circle.svg';
import { ReactComponent as EditIcon } from '@material-design-icons/svg/outlined/edit.svg';
import { ReactComponent as DeleteIcon } from '@material-design-icons/svg/outlined/delete.svg';

interface AddressItemProps {
    address: Address,
    onEditFunction: () => void,
    onDeleteFunction: () => void
}

const AddressItem: FC<AddressItemProps> = ({
    address,
    ...props
}) => {
    return (
        <div className="card border border-2">
            <div className="card-body grid grid-cols-8">
                <div className="col-span-6 flex flex-col">
                    <div className="w-fit flex align-center space-x-2">
                        <AddressIcon />
                        <span className="w-fit">{address.label}</span>
                    </div>
                    <span className="my-auto text-left">Codigo postal {address.postalCode} - {address.city} - {address.state}</span>
                    <span className="my-auto text-left">{address.name} {address.lastname}</span>
                </div>
                <div className="col-span-2 grid grid-rows-2 gap-y-3">
                    <button className="btn btn-secondary" onClick={() => props.onEditFunction()}>
                        Editar
                        <EditIcon />
                    </button>
                    <button className="btn btn-error" onClick={() => props.onDeleteFunction()}>
                        Borrar
                        <DeleteIcon />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddressItem;