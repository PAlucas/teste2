import React, { useState } from 'react';

import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';

import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { RJControls } from '../../controls/RJControls';
import * as serviceLogin from '../../services/login-service';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  containerButtons: {
    textAlign: 'center',
  },
  mensagemErro: {
    color: 'red',
  },
  botao: {
    width: '80%',
  },
}));

export const DetalheLogin = (props) => {
  const { isLoginByEmail, closeModal } = props;

  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = useState({});
  const [dadosLogin, setDadosLogin] = useState({
    email: '',
    documento: '',
    senha: '',
    isShowSenha: false,
  });

  const classes = useStyles();

  const handleChange = (prop) => (event) => {
    setDadosLogin({ ...dadosLogin, [prop]: event.target.value });

    validateEmpty(prop, event.target.value);
  };

  const isValidate = () => {
    let hasDadoLogin = isLoginByEmail
      ? validateEmpty('email', dadosLogin.email)
      : validateEmpty('documento', dadosLogin.documento);

    let hasSenha = validateEmpty('senha', dadosLogin.senha);

    return hasDadoLogin && hasSenha;
  };

  const validateEmpty = (nomeCampo, valorCampo) => {
    let hasValueInField = true;

    if (!valorCampo.trim()) {
      setError((error) => {
        return {
          ...error,
          [`${nomeCampo}`]: `O campo ${nomeCampo} é obrigatório!`,
        };
      });

      hasValueInField = false;
    } else {
      setError({
        ...error,
        [`${nomeCampo}`]: false,
      });
    }

    return hasValueInField;
  };

  const handleClickIsShowSenha = () => {
    setDadosLogin({
      ...dadosLogin,
      isShowSenha: !dadosLogin.isShowSenha,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function logar() {
    if (isValidate()) {
      const reqApiBody = {
        usuario: isLoginByEmail ? dadosLogin.email : dadosLogin.documento,
        senha: dadosLogin.senha,
      };

      efetuarLogin(reqApiBody);
    }
  }

  function efetuarLogin(reqApiBody) {
    setAlert(false);
    setLoading(true);

    serviceLogin
      .logar(reqApiBody)
      .then((data) => {
        if (data.data.status === 'ERROR') {
          setAlert(true);
          setAlertMessage(data.data.mensagem);
        } else {
          closeModal();
        }

        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setAlert(true);
        setAlertMessage(err.response.data.message);
        setAlertMessage('Desculpe, dados não encontrados.');

        setLoading(false);
      });
  }

  return (
    <RJControls.RJForm className={classes.form}>
      {isLoginByEmail ? (
        <FormControl
          sx={{ m: 1 }}
          variant="outlined"
          {...(error['email'] && { error: true })}
        >
          <InputLabel htmlFor="login-email">Email</InputLabel>
          <OutlinedInput
            id="login-email"
            type={'text'}
            value={dadosLogin.email}
            onChange={handleChange('email')}
            required
            endAdornment={
              <InputAdornment position="end">
                <EmailIcon />
              </InputAdornment>
            }
            label="Senha"
          />
          {error && <FormHelperText>{error['email']}</FormHelperText>}
        </FormControl>
      ) : (
        <FormControl
          sx={{ m: 1 }}
          variant="outlined"
          {...(error['documento'] && { error: true })}
        >
          <InputLabel htmlFor="login-documento">Documento</InputLabel>
          <OutlinedInput
            id="login-documento"
            type={'text'}
            value={dadosLogin.documento}
            onChange={handleChange('documento')}
            required
            endAdornment={
              <InputAdornment position="end">
                <AccountBoxIcon />
              </InputAdornment>
            }
            label="Documento"
          />
          {error && <FormHelperText>{error['documento']}</FormHelperText>}
        </FormControl>
      )}
      <FormControl
        sx={{ m: 1 }}
        variant="outlined"
        {...(error['senha'] && { error: true })}
      >
        <InputLabel htmlFor="login-senha">Senha</InputLabel>
        <OutlinedInput
          id="login-senha"
          type={dadosLogin.isShowSenha ? 'text' : 'password'}
          value={dadosLogin.senha}
          onChange={handleChange('senha')}
          required
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickIsShowSenha}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {dadosLogin.isShowSenha ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Senha"
        />
        {error && <FormHelperText>{error['senha']}</FormHelperText>}
      </FormControl>
      <Box component="div" className={classes.containerButtons}>
        <RJControls.RJButton
          className={classes.botao}
          sx={{ marginTop: 2 }}
          text="Fazer login"
          size="meddium"
          onClick={logar}
        ></RJControls.RJButton>
        {<RJControls.RJLoading open={loading} />}
        {alert ? (
          <RJControls.RJAlert
            severity="error"
            title=""
            message={alertMessage}
          ></RJControls.RJAlert>
        ) : (
          <></>
        )}
      </Box>
    </RJControls.RJForm>
  );
};
