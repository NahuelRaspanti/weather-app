import {render, renderSearch} from "./dom";

document.addEventListener('click', (event) => {
    const searchInput = document.querySelector('#search');
    const searchResults = document.querySelector('.results');

    if (!searchInput.contains(event.target) && !searchResults.contains(event.target)) {
        searchResults.style.display = 'none';
    }
});

const initHandlers = () => {
    document.querySelector('#search').addEventListener('keyup', (event) => {
        if(event.key == 'Enter' && event.target.value) {
            render(event.target.value);
        }
        else if (event.target.value){
            let timerId;
            clearTimeout(timerId);
                timerId = setTimeout(() => {
                  renderSearch(event.target.value);
            }, 300);
        }
        
        event.stopPropagation();
    });
}

export default initHandlers;