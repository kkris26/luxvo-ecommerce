import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setOnEdit,
  setSelectedProduct,
} from "../../redux/store/product/manageProductSlice";

function FileUpload() {
  const dispatch = useDispatch();
  const { selectedProduct, onEdit } = useSelector(
    (state) => state.manageProduct
  );
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
          if (!onEdit) {
            dispatch(setOnEdit(true));
          }
        }}
        onCommonUploadSuccess={(e) => {
          dispatch(
            setSelectedProduct({
              ...selectedProduct,
              imgUrl: e.successEntries[0].cdnUrl,
            })
          );
        }}
      />
    </div>
  );
}

export default FileUpload;
