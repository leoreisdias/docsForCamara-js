import React, { useEffect, useState } from "react";
import api from "../../services/api";

import "./styles.css";

const IndexPauta = ({ history }) => {
  const [flag, setFlag] = useState(false);
  const [pautas, setPautas] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    async function countPages() {
      const maxPages = await api.get("/pautaIndex");
      console.log(maxPages.data);
      setTotalPages(maxPages.data.pages);
    }
    countPages();
  }, []);

  useEffect(() => {
    async function loadPautas(currentPage) {
      const response = await api.get(`/pautaIndex?page=${currentPage}`);
      const arrPautas = response.data.docs.reverse();
      setPautas(arrPautas);
    }

    loadPautas(page);
  }, [page]);

  const prevPage = () => {
    if (page === totalPages) return;

    const pageNumber = page + 1;
    setPage(pageNumber);
  };

  const nextPage = () => {
    if (page === 1) return;

    const pageNumber = page - 1;
    setPage(pageNumber);
  };

  const invertPages = () => {
    const pageNumber = totalPages;
    setPage(pageNumber);
    setFlag(true);
  };

  const newPauta = () => {
    history.push("/");
  };

  const checkFile = data => {
    window.open(data);
  };

  const deletePauta = async id => {
    let bar = window.confirm("Excluir Pauta?");
    if (bar) {
      await api.delete(`/pautas/${id}`);
      window.location.reload();
    }
  };

  return (
    <div className="listFiles">
      <div className="header">
        <p>PAUTAS ATÉ O MOMENTO</p>
        <button className="sendNew" onClick={newPauta}>
          Enviar nova Pauta
        </button>
      </div>
      <div onLoad={flag ? null : invertPages} className="divFiles">
        <ul className="pauta-list">
          {pautas.map(pautas => (
            <li key={pautas._id} id="teste">
              <header id="pautaHeader">{pautas.pauta}</header>
              <button onClick={() => checkFile(pautas.pautaDoDia)}>
                Visualizar
              </button>
              <button
                className="deleteButton"
                onClick={() => deletePauta(pautas._id)}
              >
                Deletar
              </button>
              <iframe
                title={pautas._id}
                src={pautas.pautaDoDia}
                frameBorder="0"
              ></iframe>
            </li>
          ))}
        </ul>
      </div>
      <div className="actions">
        <button disabled={page === totalPages} onClick={prevPage}>
          Anterior
        </button>
        <button disabled={page === 1} onClick={nextPage}>
          Próximo
        </button>
      </div>
    </div>
  );
};

export default IndexPauta;
