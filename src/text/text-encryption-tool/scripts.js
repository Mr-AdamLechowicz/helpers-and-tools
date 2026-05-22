(() => {
  document.querySelectorAll('.encrypter').forEach(encrypter => {
    const inputNormal = encrypter.querySelector('.js-normal-text');
    const inputEncrypted = encrypter.querySelector('.js-encrypted-text');

    let key = encrypter.querySelector('.js-key-input');
    let keyCounter = encrypter.querySelector('.js-key-input-counter');

    // for key counter under key input
    key.addEventListener('input', (e) => {
      keyCounter.innerHTML = e.target.value.length;
    });

    // for cipher btn
    encrypter.querySelector('.js-btn-cipher')
      .addEventListener('click', (e) => {
        inputEncrypted.innerHTML = '';
        if (key.value.length == 0) {
          window.alert('NIE PODANO KLUCZA');
          return;
        }
        cypherSelect(key.value, e);
      });

    // for uncipher btn
    encrypter.querySelector('.js-btn-un-cipher')
      .addEventListener('click' , (e) => {
        console.log(e.target);
        inputEncrypted.innerHTML = '';
        if (key.value.length == 0) {
          window.alert('NIE PODANO KLUCZA');
          return;
        }
        cypherSelect(key.value, e);
      });

      // for text clean
    encrypter.querySelector('.js-btn-cipher-cleaner')
      .addEventListener('click', () => {
        inputEncrypted.innerHTML = '';
        inputNormal.value = '';
      });

      // for encrypted text copy
    encrypter.querySelector('.js-btn-copy')
      .addEventListener('click', () => {
        navigator.clipboard.writeText(inputEncrypted.value);
      });

    const settingsIcon = encrypter.querySelector('.js-settings-icon');
    const checkboxesWrapper = encrypter.querySelector('.checkboxes-wrapper')
      settingsIcon.addEventListener('click', () => {
        settingsIcon.classList.toggle('active');
        checkboxesWrapper.classList.toggle('active');
      });

    let filtersClickCounter = 0;
    checkboxesWrapper.querySelector('.js-btn-start-filter').addEventListener('click', () => {
      if (filtersClickCounter == 0) {
        if (confirm(`Po wprowadzeniu filtrów tekst zostanie zmieniony i NIE będzie możliwość powrotu do pierwotnego tekstu.
Czy na pewno chcesz to zrobić?
ten komunikat pokaże się tylko raz`)) {
          filtersClickCounter = 1;
          filters(checkboxesWrapper);
        }
      } else if (filtersClickCounter === 1) {
          filters(checkboxesWrapper);
        }
    });

    function cypherSelect(key, e) {
      const select = document.querySelector('#cypher-select');
      select.querySelectorAll('option').forEach(option => {
        if (option.selected) {
          switch (option.value) {
            case "vigenere":
              vigenereEncryption(key, e);
              break;

            case "?":
              console.log('?');
              break;

            case "??":
              console.log('??');
              break;

            case "???":
              console.log('???');
              break;
          }
        }
      });
    }

    function vigenereEncryption(key, e) {
      const startTime = performance.now();
      key = key.replaceAll(/[' ']/g, '').split('');
      let i = 0;
      let result = '';
      const isUncipher = e.target.classList.contains('js-btn-un-cipher');
      inputNormal.value.split('').forEach(textLetter => {
        if (i >= key.length){i = 0}
        // console.log(textLetter.codePointAt());
        if (isNaN(key[i])) {
          key[i] = key[i].codePointAt();
        }
        // console.log(key[i]);

        let number = textLetter.codePointAt() + parseInt(key[i]);
        if (isUncipher) {
          number = textLetter.codePointAt() - parseInt(key[i]);
        }
        // console.log(number);
        // console.warn('======');
        i++;

        result += String.fromCodePoint(number);
      });
      inputEncrypted.insertAdjacentHTML('beforeend', result);
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      console.log(`Funkcja wykonała się w czasie: ${executionTime.toFixed(2)} ms`);
    }

    function filters(checkboxesWrapper) {
      checkboxesWrapper.querySelectorAll('input').forEach(input => {
        if (input.checked !== true) {
          switch (input.id) {
            case "emoji":
              console.log('emoji');
              console.log(inputNormal.value);
              inputNormal.value = inputNormal.value.replaceAll(/[\p{RGI_Emoji}\p{Symbol}]/gv, '');
              console.log(inputNormal.value);
              break;

            case "big-letters":
              console.log('big-letters');
              inputNormal.value = inputNormal.value.toLowerCase();
              break;

            case "polish-letters":
              console.log('polish-letters');
              inputNormal.value = inputNormal.value.replaceAll(/[ą, ć, ę, ł, ń, ó, ś, ź, ż, Ą, Ć, Ę, Ł, Ń, Ó, Ś, Ź, Ż]/g, '');
              break;

            case "duble-space":
              console.log('duble-space');
              inputNormal.value = inputNormal.value.replaceAll(/ + /g, ' ').trim();
              inputNormal.value = inputNormal.value.replaceAll(/ +,+ /g, ',');
              inputNormal.value = inputNormal.value.replaceAll(/,+ /g, ',');
              inputNormal.value = inputNormal.value.replaceAll(/ +,/g, ',');
              break;

            case "tab":
              console.log('tab');
              inputNormal.value = inputNormal.value.replaceAll(/[\t\v]/g, ' ').trim();
              break;

            case "html-characters":
              console.log('html-characters');
              inputNormal.value = inputNormal.value.replaceAll(/[\s]/g, ' ').trim();
              break;

            case "only-text":
              console.log('only-text');
              inputNormal.value = inputNormal.value.replaceAll(/\W/g, '');
              break;
          }
        }
      });
    }
  });
})();
