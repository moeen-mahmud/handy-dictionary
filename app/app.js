// const API = `https://api.dictionaryapi.dev/api/v2/entries/en/hello`;
const searchField = document.getElementById("search-field");
const suggestions = document.getElementById("suggestions");

const triggerEvent = () => {
  suggestions.textContent = "";
  // const searchField = document.getElementById("search-field");
  if (searchField.value === "") {
    return;
  }
  const searchText = searchField.value;
  const API = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchText}`;
  fetch(API)
    .then((res) => res.json())
    .then((data) => displaySuggestion(data));
};

const displaySuggestion = (data) => {
  if (data.length !== -1) {
    data.forEach((w) => {
      const word = w.word;
      const origin = w.origin ? `Origin: ${w.origin}` : "";
      const meanings = w.meanings.map((def) =>
        def.definitions.map((d) => `${d.definition}`).join(" ")
      );
      const partOfSpeech = w.meanings.map((pos) => pos.partOfSpeech);
      const div = document.createElement("div");
      div.innerHTML = `
      <h2>${word}</h2>
      <small>${origin}</small>
      <p><span>Meaning</span> ${meanings}</p>
      <p>${partOfSpeech}</p>
    `;
      div.classList.add("suggestions");
      suggestions.appendChild(div);
    });
  }
};

searchField.addEventListener("change", triggerEvent);
searchField.addEventListener("keyup", triggerEvent);
