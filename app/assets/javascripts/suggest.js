document.addEventListener('turbolinks:load', function () {
  let timeout = null;

  function selectSuggest(e) {
    document.querySelector("#search_word").value = e.target.textContent;
    document.querySelector(".SearchForm").submit();
  }

  function displayNoneSuggestList () {
    let classList = document.querySelector(".dropdown").classList;
    if (classList.contains("is-active")) {
      classList.remove("is-active")
    }
  }

  function displaySuggestList() {
    let classList = document.querySelector(".dropdown").classList;
    if (!classList.contains("is-active")) {
      classList.add("is-active")
    }
  }

  function updateSuggestWords(words) {
    if (words.length > 0) {
      const dropdownMenu = document.querySelector("#dropdown-menu");

      let wordList = "";
      words.forEach(word => {
        wordList += `<div class="dropdown-item" role="option">${word}</div>`;
      });

      const html = `<div id="sugget-list" class="dropdown-content">${wordList}</div>`;

      dropdownMenu.innerHTML = html;
      displaySuggestList();

      const suggestList = document.querySelectorAll(".dropdown-item");
      if (suggestList) {
        suggestList.forEach(element => {
          element.addEventListener("click", selectSuggest);
        });
      }
    } else {
      displayNoneSuggestList();
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
      displayNoneSuggestList()
    }
  }
  const inputWord = document.querySelector("#search_word");
  inputWord.addEventListener("input", getSuggetWords);
});



