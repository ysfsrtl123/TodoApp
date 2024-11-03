import { useState } from 'react';
import PropTypes from 'prop-types';

function Head({ handleToggle, isTodo }) {
  return (
    <div className="container" style={{ position: 'relative' }}>
      <nav className="navbar fixed-top bg-body-tertiary border border-2 rounded-3">
        <div className="container-fluid">
          <div className="navbar-brand"><strong>To Do</strong></div>
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
                  <button className="btn w-100 py-2" onClick={handleToggle}>
                    {isTodo ? "Notlar" : "Görevler"}
                  </button>
                </div>
                <div className="border-bottom border-2 mt-2">
                  <button className="btn w-100 py-2">Ekle</button>
                </div>
                <div className="border-bottom border-2 mt-2">
                  <button className="btn w-100 py-2">Sil</button>
                </div>
                <div className="border-bottom border-2 mt-2">
                  <button className="btn w-100 py-2"></button>
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

function Todo({ isTodo }) {
 function changeFunc () {
  
 }
  return (
    <section>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-10 col-md-6 mt-5 mx-auto mx-md-0">
            <div className="card rounded-4" style={{ width: '18rem' }}>
              <div className="card-body btn btn-outline-danger">
                <a href="#" className="btn d-flex justify-content-center">
                  <i className="bi bi-plus fs-1">+</i>
                </a>
                <div className="text-center mt-2" id="button" onClick={changeFunc}>{isTodo ? "Görev Ekle" : "Not Ekle"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Todo.propTypes = {
  isTodo: PropTypes.bool.isRequired,
};

function TodoApp() {
  const [isTodo, setIsTodo] = useState(true); 

  const handleToggle = () => {
    setIsTodo(!isTodo); 
  };

  return (
    <div>
      <Head handleToggle={handleToggle} isTodo={isTodo} />
      <Todo isTodo={isTodo} /> 
    </div>
  );
}

export default TodoApp;
