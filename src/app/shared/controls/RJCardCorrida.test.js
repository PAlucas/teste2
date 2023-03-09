import React from 'react';
import { render, screen } from '@testing-library/react';

import { RJControls } from './RJControls';

const labelBotaoSelecionar = 'Selecionar Volta';

const onClickPesquisarVolta = (e) => {
  e.preventDefault();
};

const item = {
  empresa: 'BH EXPRESS 2021 AUTOTRANSPORTES',
  chegada: '16/12/2021 12:00:00',
  saida: '15/12/2021 12:00:00',
  cidade_origem: 'Belo Horizonte',
  cidade_destino: 'Ouro Preto',
  classe: 'Executiva',
  poltronasLivres: 60,
  poltronasTotal: 60,
  km: 100,
  preco: 350.25,
};

describe('Componente RJCardCorrida', () => {
  it('ver se mostra a cidade destino', () => {
    render(mockRJCardCorrida);

    expect(screen.getByText('Ouro Preto')).toBeInTheDocument();
  });

  it('ver se mostra a cidade origem', () => {
    render(mockRJCardCorrida);

    expect(screen.getByText('Belo Horizonte')).toBeInTheDocument();
  });

  it('ver se mostra a empresa', () => {
    render(mockRJCardCorrida);

    expect(
      screen.getByText('BH EXPRESS 2021 AUTOTRANSPORTES')
    ).toBeInTheDocument();
  });

  it('ver se mostra a classe e poltronas', () => {
    render(mockRJCardCorrida);

    expect(screen.getByText('Executiva')).toBeInTheDocument();
    expect(screen.getByText('60')).toBeInTheDocument();
  });
});

const mockRJCardCorrida = (
  <RJControls.RJCardCorrida
    empresa={item.empresa}
    dataIda={item.saida.substring(0, 10)}
    horaIda={item.saida.substring(11, 16)}
    dataChegada={item.chegada.substring(0, 10)}
    horaChegada={item.chegada.substring(11, 16)}
    origem={item.cidade_origem}
    destino={item.cidade_destino}
    classe={item.classe}
    poltronasLivres={item.poltronasLivres}
    poltronasTotal={item.poltronasTotal}
    distancia={item.km}
    preco={item.preco.toLocaleString('pt-br', { minimumFractionDigits: 2 })}
    labelBotaoSelecionar={labelBotaoSelecionar}
    selecionarClick={onClickPesquisarVolta}
  />
);
