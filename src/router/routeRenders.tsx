import React from 'react';
import {Empty, createRouteRender, emptyQueryableInstance} from 'utils/router/core';
import HotseatPage from 'components/pages/HotseatPage';

export const hotseatRender = createRouteRender(emptyQueryableInstance)<Empty>(() => (
  <HotseatPage />
));
