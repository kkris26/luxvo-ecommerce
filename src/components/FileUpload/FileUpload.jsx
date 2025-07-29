import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setOnEdit,
  setSelectedProduct,
} from "../../redux/store/product/manageProductSlice";
import db from "../../db/db";
import { doc, setDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { addToast } from "@heroui/react";
import { AuthContext } from "../../context/AuthContext";
import { setNewCategory } from "../../redux/features/category/manageCategorySlice";

function FileUpload({ type = null, userId }) {
  const dispatch = useDispatch();
  const { selectedProduct, onEdit } = useSelector(
    (state) => state.manageProduct
  );
  const { newCategory } = useSelector((state) => state.manageCategory);
  const [newImg, setNewImg] = useState(null);

  const { handleGetProfileUser } = useContext(AuthContext);

  useEffect(() => {
    if (newImg) {
      updateUserImg();
    }
  }, [newImg]);

  const updateUserImg = async () => {
    try {
      const profileRef = doc(db, "users", userId, "profile", "main");
      await setDoc(profileRef, { imgUrl: newImg }, { merge: true });
      addToast({
        title: "Success",
        description: "Update Image Successfully",
        timeout: 3000,
        size: "sm",
        color: "success",
        radius: "sm",
        shouldShowTimeoutProgress: true,
      });
      handleGetProfileUser(userId);
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <div>
      <FileUploaderRegular
        useCloudImageEditor={false}
        sourceList="local, camera, gdrive"
        cameraModes="photo"
        classNameUploader="uc-light"
        pubkey="427357aa49a54ca4bbcf"
        imageShrink="1400x1400"
        confirmUpload={true}
        multipleMax={1}
        imgOnly={true}
        onFileAdded={() => {
          if (!onEdit && !type) {
            dispatch(setOnEdit(true));
          }
        }}
        onCommonUploadSuccess={(e) => {
          const imgUrl = e.successEntries[0].cdnUrl;
          if (type === "profile") {
            setNewImg(e.successEntries[0].cdnUrl);
          } else if (type === "category") {
            dispatch(
              setNewCategory({
                ...newCategory,
                imgUrl,
              })
            );
          } else {
            dispatch(
              setSelectedProduct({
                ...selectedProduct,
                imgUrl: e.successEntries[0].cdnUrl,
              })
            );
          }
        }}
      />
    </div>
  );
}

export default FileUpload;
