document.addEventListener("DOMContentLoaded", function() {
  const dragItems = document.querySelectorAll('.image');
  const parent = document.querySelector('.flex');

  let draggedElement = null;

  dragItems.forEach(item => {
    item.addEventListener('dragstart', drag);
    item.addEventListener('dragover', allowDrop);
    item.addEventListener('drop', drop);
    item.addEventListener('dragend', dragEnd);
  });

  function drag(ev) {
    draggedElement = ev.target;
    ev.dataTransfer.setData("text/plain", ev.target.id);
    this.classList.add('selected');
  }

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drop(ev) {
    ev.preventDefault();
    if (ev.target.classList.contains('image') && ev.target !== draggedElement) {
      // Swap the elements in the DOM
      const temp = document.createElement('div');
      parent.insertBefore(temp, ev.target);
      parent.insertBefore(ev.target, draggedElement);
      parent.insertBefore(draggedElement, temp);
      parent.removeChild(temp);
    }
  }

  function dragEnd(ev) {
    this.classList.remove('selected');
  }
});