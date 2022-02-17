import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageUploader from './service/ImageUploader';
import ImageFileInput from './components/ImageFileInput';

const imageUploader = new ImageUploader();
const FileInput = (props) => (
  <ImageFileInput {...props} imageUploader={imageUploader} />
);

ReactDOM.render(
  <BrowserRouter>
    <App FileInput={FileInput} />
  </BrowserRouter>,
  document.getElementById('root'),
);
