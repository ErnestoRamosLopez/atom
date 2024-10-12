export function openModalFn(id: string){
    (document.getElementById(id) as HTMLFormElement)?.showModal()
}