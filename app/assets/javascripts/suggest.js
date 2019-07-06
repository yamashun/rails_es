document.addEventListener('turbolinks:load', function () {
  let timeout = null;

  function selectSuggest(e) {
    document.querySelector("#search_word").value = e.target.textContent;
    document.querySelector(".SearchForm").submit();
  }

  function removeSuggestList() {
    const suggestList = document.querySelector("#sugget-list");
    if (suggestList) {
      suggestList.remove();
    }
  }

  function updateSuggestWords(words) {
    const searchInput = document.querySelector(".SearchInput");

    if (words.length > 0) {
      let wordList = "";
      words.forEach(word => {
        wordList += `<li class="SuggetListElement" role="option">${word}</li>`;
      });

      const html = `<ul id="sugget-list" role="listbox">${wordList}</ul>`;

      removeSuggestList();
      searchInput.insertAdjacentHTML("beforeend", html);

      const suggestList = document.querySelectorAll(".SuggetListElement");
      if (suggestList) {
        suggestList.forEach(element => {
          element.addEventListener("click", selectSuggest);
        });
      }
    } else {
      removeSuggestList();
    }
  }

  function getSuggetWords(e) {
    const value = e.target.value;
    clearTimeout(timeout);

    if (value.length > 1) {
      timeout = setTimeout(function () {
        fetch(`http://localhost:3003/mangas/suggest?word=${value}`)
          .then(res => {
            return res.json();
          })
          .then(resJson => {
            updateSuggestWords(resJson.suggest_words);
          })
          .catch(error => console.log(error))
      }, 300);
    } else {
      removeSuggestList();
    }
  }
  const inputWord = document.querySelector("#search_word");
  inputWord.addEventListener("input", getSuggetWords);
});



