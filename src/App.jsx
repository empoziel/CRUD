import { useState } from "react";
import { v4 as getPass } from "uuid";
import BookCard from "./components/BookCard";
import DeleteModal from "./components/DeleteModal";
import EditModal from "./components/EditModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [books, setBooks] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  //form gönderilme olayı
  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    if (!title) {
      toast.warn("Lütfen kitap ismi giriniz", { autoClose: 2000 });
      return;
    }

    const newBook = {
      id: getPass(),
      title,
      date: new Date(),
      isRead: false,
    };

    //oluşturulan objeyi kitaplar dizisine aktar
    setBooks([newBook, ...books]);

    //input temizleme
    e.target[0].value = "";

    //bildirim
    toast.success("kitap başarıyla eklendi", { autoClose: 2500 });
  };
  //silme modalı için fonk
  const handleModal = (id) => {
    //modalı açar
    setShowDelete(true);
    //silinecek elemanın id sini state e aktarma
    setDeleteId(id);
  };
  //silme işlemini yapar
  const handleDelete = () => {
    //idsini bilidğimiz elemanı diziden çıkarma
    const filtred = books.filter((books) => books.id !== deleteId);

    //update state
    setBooks(filtred);

    //close modal
    setShowDelete(false);

    //bildirim verme
    toast.error("kitap başarıyla silindi", { autoClose: 2500 });
  };

  const handleRead = (editItem) => {
    //! 1. yöntem
    //read değerini tersine çevririr
    const updated = { ...editItem, isRead: !editItem.isRead };

    //state in kopyasını alma
    const clone = [...books];

    //düzenlenecek elemanın sırasını bul
    const index = books.findIndex((book) => book.id === updated.id);

    // clone dizi güncelleme
    clone[index] = updated;

    //! 2. yöntem
    const newBooks = books.map((item) =>
      item.id !== updated.id ? item : updated
    );
    //state güncelle
    setBooks(clone);
  };

  const handleEditModal = (item) => {
    //modalı açar
    setShowEdit(true);
    //düzenlenecek eleman state aktar
    setEditingItem(item);
  };
  //eleman düzenle
  const updateItem = () => {
    //kitaplarda 1 elemanı güncelle
    const newBooks = books.map((book) =>
      book.id !== editingItem.id ? book : editingItem
    );

    setBooks(newBooks);

    //modalı kapat
    setShowEdit(false);

    //bildirim
    toast.info("kitap ismi düzenlendi", { autoClose: 2000 });
  };
  return (
    <div className="App">
      <header className="bg-dark text-light py-2 fs-5 text-center">
        <h1>Kitap Kurdu</h1>
      </header>
      <main className="container">
        {/* form */}
        <form onSubmit={handleSubmit} className="d-flex gap-3 mt-4 p-4">
          <input
            className="form-control shadow "
            type="text"
            placeholder="Bir kitap ismi giriniz..."
          />
          <button className="btn btn-warning shadow">Ekle</button>
        </form>
        {/* kitap listesi boşsa */}
        {books.length === 0 && (
          <h4 className="mt-5 text-center">Henüz listeye kitap eklenmedi</h4>
        )}
        {/* kitap listesi doluysa*/}
        {books.map((book) => (
          <BookCard
            key={book.id}
            data={book}
            handleModal={handleModal}
            handleRead={handleRead}
            handleEditModal={handleEditModal}
          />
        ))}
      </main>

      {/* Modallar */}
      {showDelete && (
        <DeleteModal
          setShowDelete={setShowDelete}
          handleDelete={handleDelete}
        />
      )}

      {showEdit && (
        <EditModal
          editingItem={editingItem}
          setShowEdit={setShowEdit}
          setEditingItem={setEditingItem}
          updateItem={updateItem}
        />
      )}

      {/*bildirim */}
      <ToastContainer />
    </div>
  );
}

export default App;
