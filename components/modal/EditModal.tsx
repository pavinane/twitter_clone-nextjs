import useCurrentUser from "@/hooks/useCurrentUser"
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import axios from "axios";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "../Modal";

const EditModal = () => {
    const {data:currentUser} = useCurrentUser();
    const {mutate:mutateFetchedUser} = useUser(currentUser?.id);
    const editModal = useEditModal();

    const[profileImage,setProfileImage] = useState("");
    const[coverImage,setCoverImage] = useState("");
    const[name,setName] = useState("");
    const[username,setUserName] = useState("");
    const[bio,setBio] = useState("");

    useEffect(() => {
        setProfileImage(currentUser?.profileImage);
        setCoverImage(currentUser?.coverImage);
        setName(currentUser?.name);
        setUserName(currentUser?.username);
        setBio(currentUser?.bio);
    },[currentUser?.bio, currentUser?.coverImage, currentUser?.name, currentUser?.profileImage, currentUser?.username])
    
    
    const [isLoading,setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);
            await axios.patch('/api/edit',{
                name,
                username,
                profileImage,
                coverImage,
                bio

            });
            mutateFetchedUser();
            toast.success("Updated");
            editModal.onClose();

        } catch (error) {
           
            toast.error("Somthing Went Wrong")
        }finally{
            setIsLoading(false)
        }
    },[bio, coverImage, editModal, mutateFetchedUser, name, profileImage, username])

  return (
    <Modal
          disable={isLoading}
          isOpen={editModal.isOpen}
          title="Edit your  Profile"
          actionLabel="Save"
          onClose={editModal.onClose}
          onSubmit={onSubmit} 
              />
  )
}

export default EditModal