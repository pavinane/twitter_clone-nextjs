import { useCallback } from "react";
import {AiOutlineClose} from 'react-icons/ai'
import Button from "./Button";

interface ModalProps{
    isOpen?:boolean,
    onClose:() => void,
    onSubmit:() => void,
    title?:string,
    body?:React.ReactElement,
    footer:React.ReactElement,
    actionLabel:string,
    disable:boolean

}

const Modal:React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disable
}) => {

    const  hanleClose =  useCallback(() => {

        if(disable){
            return
        }

        onClose()

    },[disable, onClose])
    const  hanleSubmit =  useCallback(() => {

        if(disable){
            return
        }

        onSubmit()

    },[disable, onSubmit])

    if(!isOpen){
        return null
    }
  return (
    <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800 bg-opacity-80">
        <div className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto">
            {/* Content */}
            <div className="h-full lg:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none">
                {/* Header */}
                <div className="flex items-center justify-center p-10 rounded-t ">
                    <h1 className="text-white text-3xl">{title}</h1>
                    <button
                    onClick={hanleClose}
                    className="p-1 ml-auto border-0 text-white hover:opacity-70 transition">
                        <AiOutlineClose color="white" size={28} />
                    </button>
                </div>
                {/* body */}
                <div className=" relative p-10 flex-auto">
                    {body}
                </div>
                {/* Footer */}
                <div className="flex flex-col gap-2 p-10">
                    <Button disabled={disable} label={actionLabel} secondary fullWidth large onClick={hanleSubmit} />
                    {footer}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Modal