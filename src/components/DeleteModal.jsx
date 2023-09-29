const DeleteModal = (props) => {
  return (
    <div className="delete-modal">
      <div className="modal-inner">
        <h5>Silmek istiyor musunuz?</h5>
        <button
          onClick={() => props.setShowDelete(false)}
          className="btn btn-warning"
        >
          Hayır
        </button>
        <button
          onClick={() => props.handleDelete(false)}
          className="btn btn-danger"
        >
          Onayla
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
