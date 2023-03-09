import { RJControls } from './RJControls';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import * as serviceBloquearPoltrona from '../services/bloquear-poltrona-service';
import { Typography, Box, Grid } from '@mui/material';

export const RJModalPoltrona = props => {
    const { setarTransacao, setarPoltronaOcupada, statusPoltrona, exibirModalPoltrona, numeroPoltrona, fecharModal, corridaSelecionada } = props;
    
    const poltronaToilet = (numeroPoltrona != 'WC' && numeroPoltrona != 'ES' && numeroPoltrona != 'CF');
    const poltronaVazia = numeroPoltrona == '';

    const abrirModalBloqueio = statusPoltrona === 'libre' && !poltronaVazia && poltronaToilet && exibirModalPoltrona;
    
    const useStyles = makeStyles(() => ({
        form: { 
            display: 'flex',
            flexDirection: 'column',   
        },
        containerButtons: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        mensagemErro: {
            color: 'red'
        },
        botao: {
            width: '45%'
        }
    }));

    const classes = useStyles();

    let tituloPoltrona = "";

    if (numeroPoltrona) {
        tituloPoltrona = `Poltrona ${numeroPoltrona}`;
    }

    const [dadosPassageiro, setDadosPassageiro] = useState({
        nome: "",
        rg: "",
        cpf: ""
    });

    const [erros, setErros] = useState({});
    const [erroBloqueioPoltrona, setErroBloqueioPoltrona] = useState("");

    const changeDadosPassageiro = e => {
        let dadosForm = dadosPassageiro;
        dadosForm[e.target.name] = e.target.value;
        setDadosPassageiro(dadosForm);
    }

    const limparDadosPassageiro = dadosPassageiro => {
        let nomePassageiro = dadosPassageiro.nome;
        // Nome: retirar números, espaços em branco, traços e ponto
        nomePassageiro = nomePassageiro.replace(/\d+/g, '');
        nomePassageiro = nomePassageiro.replace(/[ .-]/g, '');

        let rgPassageiro = dadosPassageiro.rg;
        // RG e CPF: retirar espaços, ponto, traço e letras
        rgPassageiro = rgPassageiro.replace(/\D+/g, '');
        rgPassageiro = rgPassageiro.replace(/[ .-]/g, '');

        let cpfPassageiro = dadosPassageiro.cpf;
        cpfPassageiro = cpfPassageiro.replace(/\D+/g, '');
        cpfPassageiro = cpfPassageiro.replace(/[ .-]/g, '');

        dadosPassageiro = {
            nome: nomePassageiro,
            rg: rgPassageiro,
            cpf: cpfPassageiro
        }

        setDadosPassageiro(dadosPassageiro);
        return dadosPassageiro;
    }

    const validarDadosPassageiro = dadosPassageiro => {
        dadosPassageiro = limparDadosPassageiro(dadosPassageiro);

        let camposValidos = true;

        let nomePassageiro = dadosPassageiro.nome;

        if (!nomePassageiro || nomePassageiro.length < 3) {
            erros["nome"] = "Campo 'Nome' está inválido";
            setErros(erros);
            camposValidos = false;
            return camposValidos;
        }

        erros["nome"] = "";
        setErros(erros);

        let rgPassageiro = dadosPassageiro.rg;

        if (!rgPassageiro || rgPassageiro.length > 14) {
            erros["rg"] = "Campo 'RG' está inválido";
            setErros(erros);
            camposValidos = false;
            return camposValidos;
        }

        erros["rg"] = "";
        setErros(erros);

        let cpfPassageiro = dadosPassageiro.cpf;

        if (!cpfPassageiro || cpfPassageiro.length != 11) {
            erros["cpf"] = "Campo 'CPF' está inválido";
            setErros(erros);
            camposValidos = false;
            return camposValidos;
        }

        erros["cpf"] = "";
        setErros(erros);

        camposValidos = true;
        return camposValidos;
    }

    const onClickSelecionarPoltrona = e => {
        e.preventDefault();

        let camposValidos = validarDadosPassageiro(dadosPassageiro);

        if (corridaSelecionada && camposValidos) {
            const dataConsulta = corridaSelecionada.saida.split(" ")[0];

            const bodyBloqueioPoltrona = {
                origem: corridaSelecionada.grupoOrigemId,
                destino: corridaSelecionada.grupoDestinoId,
                data: dataConsulta,
                servico: corridaSelecionada.servico,
                poltrona: numeroPoltrona
            }

            serviceBloquearPoltrona
            .bloquearPoltrona(bodyBloqueioPoltrona)
            .then(dadosResponsePoltrona => {
                console.log("Retorno: ");
                console.log(dadosResponsePoltrona);

                if (dadosResponsePoltrona.data) {
                    const transacaoTemp = dadosResponsePoltrona.data.transacao;

                    if (transacaoTemp) {
                        setarTransacao(transacaoTemp);
                    }
                }

                setErroBloqueioPoltrona("");
                setarPoltronaOcupada();
                fecharModal();
            }).catch(error => {
                setErroBloqueioPoltrona("Ocorreu um erro ao bloquear a poltrona. Tente novamente.");
                console.log("Erro ao bloquear a poltrona: ");
                console.log(error);
            });
        }
    }

    return (     
        abrirModalBloqueio &&   
        <RJControls.RJModal
            titulo={tituloPoltrona}
            isShowFecharModal={false}
            isShowConfirmarModal={false}
            conteudo={
                <RJControls.RJForm className={classes.form}>
                    <RJControls.RJTextField
                        sx={{ marginTop: 2 }}
                        type="text"
                        label="Nome"
                        name="nome"
                        id="nome"
                        onChange={(e) => changeDadosPassageiro(e)}
                    >
                    </RJControls.RJTextField>
                    <Typography className={classes.mensagemErro} component="span">
                        <Grid component="span">
                            {erros["nome"]}
                        </Grid>
                    </Typography>
                    <RJControls.RJTextField
                        sx={{ marginTop: 2 }}
                        type="text"
                        label="RG"
                        name="rg"
                        id="rg"
                        onChange={(e) => changeDadosPassageiro(e)}
                    >
                    </RJControls.RJTextField>
                    <Typography className={classes.mensagemErro} component="span">
                        <Grid component="span">
                            {erros["rg"]}
                        </Grid>
                    </Typography>
                    <RJControls.RJTextField
                        sx={{ marginTop: 2 }}
                        type="text" 
                        label="CPF"
                        name="cpf"
                        id="cpf"
                        onChange={(e) => changeDadosPassageiro(e)}
                    >
                    </RJControls.RJTextField>
                    <Typography 
                        className={classes.mensagemErro} 
                        component="span">
                        <Grid component="span">
                            {erros["cpf"]}
                        </Grid>
                    </Typography>
                    <Typography 
                        className={classes.mensagemErro} 
                        component="span">
                        <Grid component="span">
                            {erroBloqueioPoltrona}
                        </Grid>
                    </Typography>
                    <Box 
                        component="div" 
                        className={classes.containerButtons}>
                        <RJControls.RJButton
                            className={classes.botao}
                            sx={{ marginTop: 2 }}
                            text="Continuar"
                            size="small"
                            type="submit"
                            onClick={onClickSelecionarPoltrona}
                        ></RJControls.RJButton>
                        <RJControls.RJButton
                            className={classes.botao}
                            sx={{ marginTop: 2 }}
                            text="Fechar"
                            size="small"
                            type="submit"
                            onClick={fecharModal}
                        ></RJControls.RJButton>
                    </Box>
                </RJControls.RJForm>
            }
        >
        </RJControls.RJModal>
    )
}