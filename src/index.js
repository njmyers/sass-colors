import {default as generate} from '../colors';
import './sass/style.sass';
import readme from '../README.md';
import stretch from './js/stretch';
// import './style.css';

document.getElementById('generate').addEventListener('click', generate);
document.getElementById('description').innerHTML = readme;

stretch.letters();

// console.log(readme);