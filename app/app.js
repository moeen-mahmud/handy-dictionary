// const API = `https://api.dictionaryapi.dev/api/v2/entries/en/hello`;
const searchField = document.getElementById("search-field");
const suggestions = document.getElementById("suggestions");

const triggerEvent = async () => {
  suggestions.textContent = "";
  // const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  if (searchText === "") {
    return;
  }
  const API = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchText}`;
  const res = await fetch(API);
  const data = await res.json();
  displaySuggestion(data);
};

const displaySuggestion = (data) => {
  if (data.length !== -1 && Array.isArray(data)) {
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
      <p><span>Definitions</span> ${meanings}</p>
      <p>${partOfSpeech}</p>
    `;
      div.classList.add("suggestions");
      suggestions.appendChild(div);
      console.log(phonetics);
    });
  }
};

searchField.addEventListener("change", triggerEvent);
searchField.addEventListener("keyup", triggerEvent);
