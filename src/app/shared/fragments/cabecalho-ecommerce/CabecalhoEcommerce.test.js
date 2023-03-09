import React from 'react';

import { render, screen } from '@testing-library/react';
import { CabecalhoEcommerce } from './CabecalhoEcommerce';

describe('CabecalhoEcommerce', () => {
  it('ver se componente redenriza corretamente', () => {
    const component = render(<CabecalhoEcommerce />);

    expect(component).toBeTruthy();
  });

  it('ver se existe o iconButton', () => {
    render(<CabecalhoEcommerce />);

    const icon = screen.getByLabelText(/menu/i);
    expect(icon).toBeInTheDocument();
  });

  it('ver se existe a imagem', () => {
    render(<CabecalhoEcommerce />);

    const imagem = screen.getByAltText(/Logo da empresa/i);
    expect(imagem).toHaveAttribute('src', '/assets/images/logo.png');
  });

  it('ver se existe o botão para fazer login', () => {
    render(<CabecalhoEcommerce />);

    const button = screen.getByText(/fazer login/i);
    expect(button).toBeInTheDocument();
  });

  it('ver se existe o icon no button', () => {
    render(<CabecalhoEcommerce />);

    const button = screen.getByTestId(/AccountCircleIcon/i);
    expect(button).toBeInTheDocument();
  });
});
