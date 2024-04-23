import { useEffect, useRef, ReactNode } from "react"

interface modalProps{
    openModal: boolean
    closeModal: () => void
    children: ReactNode
}

function Modal({openModal, closeModal, children}: modalProps){
    const ref = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        if (openModal) {
            ref.current?.showModal()
        }
        else {
            ref.current?.close()
        }

    }, [openModal])

    return (
        <dialog className="modal" ref={ref} onCancel={closeModal}>
            <div className="modal-box">
                <button onClick={closeModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                {children}
            </div>
        </dialog>
    )
}

export default Modal
