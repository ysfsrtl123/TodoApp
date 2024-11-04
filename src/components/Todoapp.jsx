import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Head({ handleToggle, isTodo }) {
  return (
    <div className="container-fluid">
      <nav className="navbar fixed-top bg-body-tertiary border border-2 rounded-3">
        <div className="container-fluid">
          <div className="navbar-brand"><strong>To Do</strong></div>
           <div className="navbar-brand">
             {isTodo ? "Görevler" : "Notlar "}
           </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header border-bottom border-4">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                <strong>Ayarlar</strong>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <div className="container-fluid">
                <div className="border-bottom border-2 mt-2">
                  <button type='submit' className="btn w-100 py-2" onClick={handleToggle}>
                    {isTodo ? "Notlar" : "Görevler"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

Head.propTypes = {
  handleToggle: PropTypes.func.isRequired,
  isTodo: PropTypes.bool.isRequired,
};

function Todo() {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState('');
  const [items, setItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const quillRef = useRef(null);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('todoItems')) || [];
    setItems(savedItems);
  }, []);

  const saveApp = () => {
    const plainText = quillRef.current.getEditor().getText();
    const date = new Date().toLocaleDateString();
    const newItem = { id: Date.now(), content: plainText, date, type: "Görev" };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    localStorage.setItem('todoItems', JSON.stringify(updatedItems));

    setIsEditing(false);
    setContent('');
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem('todoItems', JSON.stringify(updatedItems));
  };

  const toggleCheck = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const changeFunc = () => {
    setIsEditing(true);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  return (
    <section className="d-flex justify-content-center">
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-12 col-md-6 mx-auto mt-5">
            {items.map((item) => (
              <div key={item.id} className="card rounded-4 mb-3">
                <div className="card-body">
                  <div className="form-check form-switch">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      role="switch" 
                      id={`flexSwitchCheck${item.id}`} 
                      checked={checkedItems[item.id] || false}
                      onChange={() => toggleCheck(item.id)} 
                    />
                    <p className={checkedItems[item.id] ? 'animated' : ''} 
                       style={{ display: checkedItems[item.id] ? 'block' : 'none' }}>
                       Tamamlandı
                     </p>
                  </div>
                  <p style={{ textDecoration: checkedItems[item.id] ? 'line-through' : 'none' }}>
                    {item.content}
                  </p>
                  <small className="text-muted">{item.date} - {item.type}</small>
                  <button
                    className="btn btn-outline-danger rounded-pill mt-2 mx-2"
                    onClick={() => deleteItem(item.id)}
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))}

            <div
              className={`card rounded-4 mt-5 ${isEditing ? 'position-absolute top-50 start-50 translate-middle' : 'mx-auto mx-md-0'}`}
              style={{ width: '100%', maxWidth: '18rem', transition: 'all 0.5s ease' }}
            >
              {isEditing ? (
                <>
                  <div className="card-title text-center">Görev Ekleyin</div>
                  <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    value={content}
                    onChange={handleContentChange}
                    placeholder="Yeni Görev Girin..."
                  />
                  <div>
                    <button className='btn btn-outline-success rounded-4 mt-2 mx-2' onClick={saveApp}>Kaydet</button>
                    <button className='btn btn-outline-danger rounded-4 mt-2 mx-2' onClick={() => setIsEditing(false)}>İptal</button>
                  </div>
                </>
              ) : (
                <div className="card-body btn btn-outline-danger" onClick={changeFunc}>
                  <div className="d-flex justify-content-center">
                    <i className="bi bi-plus fs-1">+</i>
                  </div>
                  <div className="text-center mt-2" id="button">Görev Ekle</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Note() {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState('');
  const [items, setItems] = useState([]);
  const quillRef = useRef(null);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('noteItems')) || [];
    setItems(savedItems);
  }, []);

  const saveNote = () => {
    const plainText = quillRef.current.getEditor().getText();
    const date = new Date().toLocaleDateString();
    const newItem = { id: Date.now(), content: plainText, date, type: "Not" };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    localStorage.setItem('noteItems', JSON.stringify(updatedItems));

    setIsEditing(false);
    setContent('');
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem('noteItems', JSON.stringify(updatedItems));
  };

  const changeFunc = () => {
    setIsEditing(true);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  return (
    <section className="d-flex justify-content-center">
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-12 col-md-6 mx-auto mt-5">
            {items.map((item) => (
              <div key={item.id} className="card rounded-4 mb-3">
                <div className="card-body">
                  <p>{item.content}</p>
                  <small className="text-muted">{item.date} - {item.type}</small>
                  <button
                    className="btn btn-outline-danger rounded-pill mt-2 mx-2"
                    onClick={() => deleteItem(item.id)}
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))}

            <div
              className={`card rounded-4 mt-5 ${isEditing ? 'position-absolute top-50 start-50 translate-middle' : 'mx-auto mx-md-0'}`}
              style={{ width: '100%', maxWidth: '18rem', transition: 'all 0.5s ease' }}
            >
              {isEditing ? (
                <>
                  <div className="card-title text-center">Notunuzu Ekleyin</div>
                  <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    value={content}
                    onChange={handleContentChange}
                    placeholder="Yeni Not Girin..."
                  />
                  <div>
                    <button className='btn btn-outline-success rounded-4 mt-2 mx-2' onClick={saveNote}>Kaydet</button>
                    <button className='btn btn-outline-danger rounded-4 mt-2 mx-2' onClick={() => setIsEditing(false)}>İptal</button>
                  </div>
                </>
              ) : (
                <div className="card-body btn btn-outline-danger" onClick={changeFunc}>
                  <div className="d-flex justify-content-center">
                    <i className="bi bi-plus fs-1">+</i>
                  </div>
                  <div className="text-center mt-2" id="button">Not Ekle</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TodoApp() {
  const [isTodo, setIsTodo] = useState(true);

  const handleToggle = () => {
    setIsTodo(!isTodo);
  };

  return (
    <div>
      <Head handleToggle={handleToggle} isTodo={isTodo} />
      {isTodo ? <Todo /> : <Note />}
    </div>
  );
}

export default TodoApp;
