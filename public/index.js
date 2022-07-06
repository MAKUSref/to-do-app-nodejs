const taskListEl = document.querySelector('.tasks-list');
const taskFormEl = document.querySelector('.task-form');
const titleInputEl = document.querySelector('#title');
const descriptionInputEl = document.querySelector('#description');
const removeLastEl = document.querySelector('.remove-last');
const clearAllEl = document.querySelector('.clear-all');
const addItemEl = document.querySelector('.add-item');
const errorMsgEl = document.querySelector('.error-msg');

const URL = 'http://localhost:3000';
const API_URL = `${URL}/api`;

window.addEventListener('DOMContentLoaded', () => {
  get(`${API_URL}/get`);

  taskFormEl.addEventListener('submit', (e) => {
    // Dodane tylko dlatego bo baza danych przechowywana jest w zmiennej
    e.preventDefault();
  
    const title = titleInputEl.value;
    const description = descriptionInputEl.value;
  
    const item = { title, description };
  
    titleInputEl.value = '';
    descriptionInputEl.value = '';
  
    add(`${API_URL}/add`, item);
  });
  
  clearAllEl.addEventListener('click', () => {
    clear(`${API_URL}/clear`);
  });
  
  removeLastEl.addEventListener('click', () => {
    remove(`${API_URL}/remove`);
  });
});

function add(url, item) {
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  })
    .then((res) => res.json().then((data) => [data, res.status]))
    .then((data) => {
      const [databaseData, httpStatus] = data;
      const { status, items } = databaseData;

      if (httpStatus === 201) {
        clearStatus();
        addNewListItem(items[0]);
      } else {
        titleInputEl.value = item.title;
        descriptionInputEl.value = item.description;
        errorMsgEl.textContent = status;
      }
    });
}

function get(url) {
  return fetch(url)
    .then((res) => res.json().then((data) => [data, res.status]))
    .then((data) => {
      const [databaseData, httpStatus] = data;
      const { items } = databaseData;

      if (httpStatus === 200) {
        clearStatus();
        renderList(items);
      }
    });
}

function clear(url) {
  return fetch(url, { method: 'PUT' })
    .then((res) => res.json().then((data) => [data, res.status]))
    .then((data) => {
      const [databaseData, httpStatus] = data;

      if (httpStatus === 200) {
        clearStatus();
        taskListEl.innerHTML = '';
      }
    });
}

function remove(url) {
  return fetch(url, {
    method: 'DELETE'
  })
    .then((res) => res.json().then((data) => [data, res.status]))
    .then((data) => {
      const [databaseData, httpStatus] = data;
      const { status } = databaseData;

      if (httpStatus === 200) {
        clearStatus();
        taskListEl.removeChild(taskListEl.lastChild);
      } else {
        errorMsgEl.textContent = status;
      }
    })
}

function renderList(list) {
  taskListEl.innerHTML = '';
  clearStatus();

  list.forEach((task) => {
    addNewListItem(task);
  });
}

function clearStatus() {
  errorMsgEl.textContent = '';
}

function addNewListItem(item) {
  const newEl = createListItem(item.title, item.description);
  taskListEl.appendChild(newEl);
}

function createListItem(title, desc) {
  const listItemEl = document.createElement('li');
  const titleEl = document.createElement('p');
  titleEl.classList.add('item-title');
  const descEl = document.createElement('p');
  descEl.classList.add('item-desc');

  titleEl.textContent = title;
  descEl.textContent = desc;

  listItemEl.appendChild(titleEl);
  listItemEl.appendChild(descEl);

  return listItemEl;
}
