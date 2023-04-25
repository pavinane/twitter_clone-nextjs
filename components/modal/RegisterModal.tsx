import axios from "axios";
import useLoginModal from "@/hooks/useLoginModal";
import {use, useCallback,useState} from 'react'
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

const RegisterModal = () => {

    const loginModal = useLoginModal();
    const registerModal = useRegisterModal()
    const [email,setEmail] = useState('');
     const [password,setPassword] = useState('');
     const [name,setName] = useState('');
     const [username,setUserName] = useState('');

     const [loading,setLoading] = useState(false);

    const onSubmit = useCallback(async() => {

        try {
            setLoading(true)
            // TODO Register and LOGIN
            await axios.post('/api/register',{
                email,
                username,
                password,
                name
            });
            toast.success('Acoount Created');
            signIn('credentials',{
                email,
                password,
            })
            registerModal.onClose()
        } catch (error) {
            console.log(error)
            toast.error('Something went Wrong')
        } finally{
            setLoading(false)
        }

    },[email, name, password, registerModal, username])
    
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
            <Input placeholder="username"
             onChange={(e) => setUserName(e.target.value) } 
            value={username}
            disabled={loading}
            />
            <Input placeholder="Password"
              value={password}
              type="password"
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