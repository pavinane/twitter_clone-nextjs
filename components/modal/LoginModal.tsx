import useLoginModal from "@/hooks/useLoginModal";
import {use, useCallback,useState} from 'react'
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";

const LoginModal = () => {
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal();
    const [email,setEmail] = useState('');
     const [password,setPassword] = useState('');
     const [loading,setLoading] = useState(false);

    const onSubmit = useCallback(() => {

        try {
            setLoading(true)
            // TODO LOGIN
            loginModal.onClose()
        } catch (error) {
            console.log(error)
        } finally{
            setLoading(false)
        }

    },[loginModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input placeholder="Email"
             onChange={(e) => setEmail(e.target.value) } 
            value={email}
            disabled={loading}
            />
            <Input placeholder="Password"
              value={password}
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