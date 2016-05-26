import React from 'react';
import { render } from 'react-dom';
import { BlockParty } from './BlockParty';
import style from './style.css';
import json from './manifest.json';

render(<BlockParty title='BlockParty'/>, document.getElementById('root'));
