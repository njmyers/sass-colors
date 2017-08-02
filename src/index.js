import {default as generate} from '../colors';
import './sass/style.sass';
import readme from '../README.md';
// import './style.css';

document.getElementById('generate').addEventListener('click', generate);
document.getElementById('description').innerHTML = readme;

// console.log(readme);