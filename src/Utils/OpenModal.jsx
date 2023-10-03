import React from "react";
import css from "./OpenModal.module.css";
import { closeModal } from "../Cart/cartSlice";
import { useDispatch } from "react-redux";

const OpenModal = ({ onConfirmRemove, title }) => {
  const dispatch = useDispatch();
  return (
    <div className={css.fullCover}>
      <div className={css.OpenModal}>
        <h1>Are you Sure ? </h1>
        <h3>You want to remove {title} from the shopping bag?</h3>
        <div className={css.btn}>
          <button type="button" onClick={onConfirmRemove}>
            Yes
          </button>
          <button type="button" onClick={() => dispatch(closeModal())}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpenModal;
