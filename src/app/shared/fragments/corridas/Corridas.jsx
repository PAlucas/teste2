import React from 'react';

import { Box } from '@mui/material';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';

import { ListaCorridas } from './ListaCorridas';

export const Corridas = (props) => {
  const {
    origem,
    destino,
    corridasIda,
    corridasVolta,
    selecionarClick,
    hasVolta,
  } = props;

  const [value, setValue] = React.useState('ida');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="IDA" value="ida" />
              <Tab
                label="VOLTA"
                disabled={!hasVolta}
                onClick={selecionarClick}
                value="volta"
              />
            </TabList>
          </Box>
          <TabPanel value="ida">
            <ListaCorridas
              origem={origem.cidade}
              destino={destino}
              listCorridas={corridasIda}
            ></ListaCorridas>
          </TabPanel>
          <TabPanel value="volta">
            <ListaCorridas
              origem={destino}
              destino={origem.cidade}
              listCorridas={corridasVolta}
            ></ListaCorridas>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};
