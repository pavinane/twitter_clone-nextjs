import useLoginModal from "@/hooks/useLoginModal";
import {use, useCallback,useState} from 'react'
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import { signIn } from "next-auth/react";

const LoginModal = () => {
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal();
    const [email,setEmail] = useState('');
     const [password,setPassword] = useState('');
     const [loading,setLoading] = useState(false);

    const onSubmit = useCallback(async() => {

        try {
            setLoading(true)
            // TODO LOGIN
          
            signIn('credentials',{
              email,password
            })
            loginModal.onClose()
        } catch (error) {
            console.log(error)
        } finally{
            setLoading(false)
        }

    },[email, loginModal, password])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input placeholder="Email"
             onChange={(e) => setEmail(e.target.value) } 
            value={email}
            disabled={loading}
            />
            <Input placeholder="Password"
              value={password}
              type="password"
            onChange={(e) => setPassword(e.target.value) } 
            disabled={loading}
            />
        </div>
    );

    const onToggle = useCallback(() => {
        if (loading) {
            return;
        }
        registerModal.onOpen();
        loginModal.onClose();
    },[loading, loginModal, registerModal]) 

    const footerContent = (
      <div className=" text-neutral-400 text-center mt-4">
        <p>
          First Time using Twitter
          <span
            onClick={onToggle}
            className="text-white cursor-pointer hover:underline"
          >
           Create an account?
          </span>
        </p>
      </div>
    );

  return (
    <Modal
          disable={loading}
          isOpen={loginModal.isOpen}
          title="LogIn"
          onClose={loginModal.onClose}
          onSubmit={onSubmit}
          actionLabel="Sign in"
          body={bodyContent}
        footer={footerContent}    />
  );
}

export default LoginModal