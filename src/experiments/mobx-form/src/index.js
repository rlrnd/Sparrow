import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import {observable, extendObservable, computed} from "mobx";
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const person = observable({ firstName: "Jian", lastName: "Zhou" });

function createExpression(obj, propName, stmt) {
  // eslint-disable-next-line
  let propFunc = new Function(stmt);
  let exObj = {}
  _.set(exObj, propName, computed(propFunc));
  extendObservable(obj, exObj);
}

extendObservable(person, {age: 34}); 
createExpression(person, "fullName", "return this.firstName + ' ' + this.lastName;");
createExpression(person, "isFather", "return (this.firstName == 'Jian')?'yes':'no';");

ReactDOM.render(<App person={person} />, document.getElementById('root'));
_.set(person, "firstName", "Lucas");

registerServiceWorker();



