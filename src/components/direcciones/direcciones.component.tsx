import axios, { CancelTokenSource } from "axios";
import { FC, useEffect, useState } from "react";
import { apiUrl } from "../../utils/constantes.utils";
import { Address } from "../../interfaces/Address";
import { ReactComponent as AddIcon } from '@material-design-icons/svg/outlined/add_circle.svg';
import CustomModal from "../custom-modal/custom-modal.component";
import AddressForm from "../address-form/address-form.component";
import { openModalFn } from "../../utils/modal.utils";
import { toast } from "react-toastify";
import AddressItem from "../address-item/address-item.component";
import ConfirmModal from "../confirm-modal/confirm-modal.component";

const Direcciones: FC = () => {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [localAddress, setLocalAddress] = useState<Address | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    //delete logic
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const [confirmModalText, setConfirmModalText] = useState('');
    const [confirmModalTitle, setConfirmModalTitle] = useState('Alerta');
    const [deleteId, setDeleteId] = useState(0);

    useEffect(() => {
        const source = axios.CancelToken.source();
        fetchAddresses(source);
        return () => {
            source.cancel();
        }
    }, []);

    useEffect(() => {
        if(isModalVisible){
            openModalFn('my_modal_address_form');
        }
    }, [isModalVisible]);

    useEffect(() => {
        if(isConfirmModalVisible){
            openModalFn('my_modal_delete_address');
        }
    }, [isConfirmModalVisible]);

    const fetchAddresses = async (source: CancelTokenSource) => {
        try{
            let response = await axios.get(`${apiUrl}/profile/address`, {
                cancelToken: source.token
            });
            setAddresses(response.data);
        }catch{
            setAddresses([]);
        }
    }

    const openModal = (isEdit: boolean) => {
        setIsModalVisible(true);
        setIsEdit(isEdit);
    }

    const handleEditOpen = (item: Address) => {
        setLocalAddress(item);
        openModal(true);
    }

    const handleDeleteOpen = (item: Address) => {
        setDeleteId(item.id);
        setConfirmModalText(`Esta seguro de eliminar la direccion '${item.label}'? La accion es irreversible`);
        setIsConfirmModalVisible(true);
    }

    const handleSubmit = async (data: Address) => {
        try{
            if( isEdit ){
                await axios.put(`${apiUrl}/profile/address/${localAddress?.id}`, data);
                toast.success('Direccion actualizada con exito');
            }else{
                await axios.post(`${apiUrl}/profile/address`, data);
                toast.success('Direccion creada con exito');
            }
            setLocalAddress(null);
            setIsModalVisible(false);
            fetchAddresses(axios.CancelToken.source());
        }catch{
            setLocalAddress(data);
            openModal(isEdit);
            toast.error('Ocurrio un error');
        }
    }

    const handleDeleteSubmit = async () => {
        try{
            await axios.delete(`${apiUrl}/profile/address/${deleteId}`);
            toast.success('Se ha eliminado la direccion con exito');
            fetchAddresses(axios.CancelToken.source());
        }catch{
            toast.error('Ocurrio un error');
        }finally{
            setIsConfirmModalVisible(false);
        }
    }

    const handleClose = () => {
        setLocalAddress(null);
        setIsModalVisible(false);
    }

    const handleConfirmModalClose = () => {
        setIsConfirmModalVisible(false);
    }


    return (
        <div className="card ">
            <div className="card-body grid grid-cols-2">
                <div className="col-span-full flex justify-end">
                    <button className="btn btn-primary" onClick={() => openModal(false)}>
                        Crear
                        <AddIcon />
                    </button>
                </div>
                {
                    addresses.length === 0 ? 
                    <span>No se encontraron direcciones guardadas!</span>
                    :
                    <div className="col-span-full grid gap-y-4 mt-3">
                        {
                            addresses.map(it =>
                                <AddressItem key={it.id} address={it} onEditFunction={() => handleEditOpen(it)} onDeleteFunction={() => handleDeleteOpen(it)}/>
                            )
                        }
                    </div>
                }
            </div>
            {
                isModalVisible &&
                <CustomModal modalActionClass="justify-center" hasCloseButton={true} id="my_modal_address_form" submitEvent={handleSubmit} data={localAddress} closeEvent={handleClose}>
                    <AddressForm isEdit={isEdit}/>
                </CustomModal>
            }
            {
                isConfirmModalVisible &&
                <CustomModal modalActionClass="justify-center" hasCloseButton={true} id="my_modal_delete_address" acceptEvent={handleDeleteSubmit} closeEvent={handleConfirmModalClose}>
                    <ConfirmModal title={confirmModalTitle} text={confirmModalText} />
                </CustomModal>
            }
        </div>
    );
}

export default Direcciones;