import React, { useState, useMemo } from "react";

import camera from "../../assets/camera.svg";

import api from "../../services/api";

import confirm from "../../assets/confirm.png";

import "../../App.css";

const NewPauta = ({ history }) => {
  const [pauta, setPauta] = useState(null);

  const preview = useMemo(() => {
    return pauta ? confirm : null;
  }, [pauta]);

  async function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();

    data.append("pauta", pauta);

    await api.post("/upload", data);

    alert("Pauta enviada com sucesso!!");

    history.push("/pautaIndex");
  }

  const listPautas = () => {
    history.push("/pautaIndex");
  };

  return (
    <div className="content">
      <p>
        Clique para selecionar o arquivo <strong>PDF</strong> da{" "}
        <strong>Pauta</strong> dessa semana.
      </p>
      <form onSubmit={handleSubmit} id="formPauta">
        <label
          id="pdfpauta"
          style={{
            backgroundImage: `url(${preview})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
          className={pauta ? "pauta-added" : null}
        >
          <input
            type="file"
            onChange={event => setPauta(event.target.files[0])}
          />
          <img src={camera} alt="SelectionFile" />
        </label>

        <button
          form="formPauta"
          type="submit"
          className="btn"
          disabled={!pauta}
        >
          Enviar Pauta
        </button>
        <button className="listPautas" onClick={listPautas}>
          Lista de Pautas
        </button>
      </form>
    </div>
  );
};

export default NewPauta;
