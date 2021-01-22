import axios from 'axios';

const addCommentForm = document.querySelector('#js-add-comment');
const commentList = document.querySelector('#js-comment-list');
const commentNumber = document.querySelector('#js-comment-number');

const increaseNumber = () => {
  commentNumber.innerHTML = +commentNumber.innerHTML + 1 + ' ';
};

const addComment = comment => {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.innerHTML = comment;
  li.appendChild(span);
  commentList.prepend(li);
  increaseNumber();
};

const sendComment = async comment => {
  const [_, id] = window.location.pathname.split('/videos/');
  const response = await axios.post(`/api/${id}/comment`, { comment });
  if (response.status === 200) {
    addComment(comment);
  }
};

const handleSubmit = event => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector('input');
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = '';
};

const init = () => {
  addCommentForm.addEventListener('submit', handleSubmit);
};

if (addCommentForm) {
  init();
}
