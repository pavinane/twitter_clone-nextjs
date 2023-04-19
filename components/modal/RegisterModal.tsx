import useLoginModal from "@/hooks/useLoginModal";
import {use, useCallback,useState} from 'react'
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";

const RegisterModal = () => {

    const loginModal = useLoginModal();
    const registerModal = useRegisterModal()
    const [email,setEmail] = useState('');
     const [password,setPassword] = useState('');
     const [name,setName] = useState('');
     const [userName,setUserName] = useState('');

     const [loading,setLoading] = useState(false);

    const onSubmit = useCallback(() => {

        try {
            setLoading(true)
            // TODO Register and LOGIN
            registerModal.onClose()
        } catch (error) {
            console.log(error)
        } finally{
            setLoading(false)
        }

    },[registerModal])
    
    const onToggle = useCallback(() => {
        if (loading) {
            return;
        }
        registerModal.onClose();
        loginModal.onOpen();
    },[loading, loginModal, registerModal]) 

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input placeholder="Email"
             onChange={(e) => setEmail(e.target.value) } 
            value={email}
            disabled={loading}
            />
            <Input placeholder="Name"
             onChange={(e) => setName(e.target.value) } 
            value={name}
            disabled={loading}
            />
            <Input placeholder="UserName"
             onChange={(e) => setUserName(e.target.value) } 
            value={userName}
            disabled={loading}
            />
            <Input placeholder="Password"
              value={password}
            onChange={(e) => setPassword(e.target.value) } 
            disabled={loading}
            />
        </div>
    )

    const footerContent = (
        <div className=" text-neutral-400 text-center mt-4">
            <p>Already an account?

            <span onClick={onToggle} className="text-white cursor-pointer hover:underline">Sign In</span>
            </p>
           
        </div>
    )

  return (
    <Modal
      disable={loading}
      isOpen={registerModal.isOpen}
      title="Create an account"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      actionLabel="Register"
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default RegisterModal