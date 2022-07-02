const taskListEl = document.querySelector('.tasks-list');
const taskFormEl = document.querySelector('.task-form');
const titleInputEl = document.querySelector('#title');
const descriptionInputEl = document.querySelector('#description');
const removeLastEl = document.querySelector('.remove-last');
const clearAllEl = document.querySelector('.clear-all');
const addItemEl = document.querySelector('.add-item');
const errorMsgEl = document.querySelector('.error-msg');

const URL = 'http://localhost:3000';
const URL_ADD = `${URL}/api/add`;
const URL_REMOVE = `${URL}/api/remove`;
const URL_CLEAR = `${URL}/api/clear`;
const URL_GET = `${URL}/api/get`;

const createListItem = (title, desc) => {
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

const renderList = (list) => {
  taskListEl.innerHTML = '';
  errorMsgEl.textContent = '';

  list.forEach((task) => {
    const newEl = createListItem(task.title, task.description);
    taskListEl.appendChild(newEl);
  });
}

const get = (url) => {
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      renderList(data.items);
    })
    .catch((err) => console.error(err));
}

const clear = (url) => {
  return fetch(url, { method: 'PUT' })
    .then((res) => res.json())
    .then((data) => {
      renderList(data.items);
    });
}

const remove = (url) => {
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const { status, items } = data;

      if (data.status === 'OK') {
        renderList(items);
      } else {
        console.log(status);
        errorMsgEl.textContent = status;
      }
    });
}

const add = (url, item) => {
   return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    })
    .then((res) => res.json())
    .then((data) => {
      const { status, items } = data;

      if (status === 'OK') {
        renderList(items);
      } else {
        titleInputEl.value = item.title;
        descriptionInputEl.value = item.description;
        errorMsgEl.textContent = status;
      }
    });
}

taskFormEl.addEventListener('submit', (e) => {
  // Dodane tylko dlatego bo baza danych przechowywana jest w zmiennej
  e.preventDefault();

  // const id = 'id';
  const title = titleInputEl.value;
  const description = descriptionInputEl.value;

  const item = { title, description };

  titleInputEl.value = '';
  descriptionInputEl.value = '';

  add(URL_ADD, item);
});

clearAllEl.addEventListener('click', () => {
  clear(URL_CLEAR);
});

removeLastEl.addEventListener('click', () => {
  remove(URL_REMOVE);
});

get(URL_GET);
