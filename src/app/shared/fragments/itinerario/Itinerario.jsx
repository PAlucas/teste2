import React, { useState } from 'react';

import { RJControls } from '../../controls/RJControls';
import { ModalItinerario } from './ModalItinerario';

import * as serviceItinerario from '../../services/itinerario-service';

export const Itinerario = (props) => {
  const { servicoViagem, dataViagem } = props;

  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = React.useState(false);
  const [listaParadas, setListaParadas] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);

  function buscarRoteiro() {
    setIsShowModal(false);

    const reqApiBody = {
      data: dataViagem,
      servico: servicoViagem,
    };

    pesquisarItinerario(reqApiBody);
  }

  function pesquisarItinerario(reqApiBody) {
    console.log(reqApiBody);

    setAlert(false);
    setLoading(true);

    serviceItinerario
      .pesquisarItinerario(reqApiBody)
      .then((data) => {
        setListaParadas(data.data.lsParadas);
        setIsShowModal(true);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setAlert(true);
        setAlertMessage(err.response.data.message);
        setAlertMessage('Desculpe, Itinerário não encontrado.');

        setLoading(false);
      });
  }

  return (
    <>
      <RJControls.RJButton
        variant="text"
        text="Ver roteiro +"
        size="small"
        type="button"
        onClick={buscarRoteiro}
      />
      <ModalItinerario
        listaItinerarios={listaParadas}
        isShowModal={isShowModal}
      ></ModalItinerario>
    </>
  );
};
