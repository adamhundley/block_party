import React from 'react';
import { render } from 'react-dom';
import { BlockParty } from './BlockParty';
import style from './style.css';
require('../assets/favicon.ico');
require('../assets/icon-horizontal.png');

render(<BlockParty title='BlockParty'/>, document.getElementById('root'));
