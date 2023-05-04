import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import axios from "axios";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "../Modal";
import Input from "../Input";
import ImageUpload from "../ImageUpload";

const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  
  const editModal = useEditModal();

  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [bio, setBio] = useState("");
  
  useEffect(() => {
    
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
    setName(currentUser?.name);
    setUserName(currentUser?.username);
    setBio(currentUser?.bio);
   
  }, [currentUser]);
  console.log("user",currentUser)

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit =useCallback(async() => {

    try {
        setIsLoading(true)
        console.log("datas" ,name,username,bio,profileImage,coverImage)
        await axios.patch("/api/edit", {
          name,
          username,
          bio,
          profileImage,
          coverImage,
        });
       
        mutateFetchedUser();
        toast.success("Updated");
        editModal.onClose()
    } catch (error) {
        console.log(error);
        toast.error("Something Went wrong")
    }finally{
        setIsLoading(false)
    }

  },[bio, coverImage, editModal, mutateFetchedUser, name, profileImage, username])
  const bodyContent = (
    <div className="flex flex-col gap-4">
        <ImageUpload 
        value={profileImage}
        onChange={(image:any)=>setProfileImage(image)}
        disabled={isLoading}
        label="Upload Profile Image"
        />
        <ImageUpload 
        value={coverImage}
        onChange={(image:any)=>setCoverImage(image)}
        disabled={isLoading}
        label="Upload Cover Image"
        />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        type="text"
        disabled={isLoading}
      />
      <Input
        placeholder="UserName"
        onChange={(e) => setUserName(e.target.value)}
        value={username}
        type="text"
        disabled={isLoading}
      />
       <Input
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        type="text"
        disabled={isLoading}
      />
    
    </div>
  );

  const fotterContent = (
    <div>
      <h2>Footer</h2>
    </div>
  );

  return (
    <Modal
      disable={isLoading}
      isOpen={editModal.isOpen}
      title="Edit your  Profile"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={fotterContent}
    />
  );
};

export default EditModal;
