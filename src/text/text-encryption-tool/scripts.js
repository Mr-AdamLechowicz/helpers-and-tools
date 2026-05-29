(() => {
  document.querySelectorAll('.encrypter').forEach(encrypter => {
    const inputNormal = encrypter.querySelector('.js-normal-text');
    const inputEncrypted = encrypter.querySelector('.js-encrypted-text');

    let key = encrypter.querySelector('.js-key-input');

    // for key counter under key input
    key.addEventListener('input', (e) => {
      encrypter.querySelector('.js-key-input-counter').innerHTML = e.target.value.length;
    });

    // for cipher btn
    encrypter.querySelector('.js-btn-cipher')
      .addEventListener('click', (e) => {
        inputEncrypted.innerHTML = '';
        if (key.value.length == 0) {
          window.alert('NIE PODANO KLUCZA');
          return;
        }
        encryptionStatus()
        cypherSelect(key.value, e);
      });

    // for uncipher btn
    encrypter.querySelector('.js-btn-un-cipher')
      .addEventListener('click' , (e) => {
        inputEncrypted.innerHTML = '';
        if (key.value.length == 0) {
          window.alert('NIE PODANO KLUCZA');
          return;
        }
        encryptionStatus();
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
        // console.log(textLetter)
        if (i >= key.length){i = 0}
        // console.log(textLetter.codePointAt());
        if (isNaN(key[i])) {
          key[i] = key[i].codePointAt();
        }
        // console.log(key[i]);

        let number = textLetter.codePointAt() + parseInt(key[i]);
        console.log(number)
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

            // case "polish-letters":
            //   console.log('polish-letters');
            //   inputNormal.value = inputNormal.value.replaceAll(/\ą/g, 'a').replaceAll(/\Ą/g, 'A').replaceAll(/\ć/g, 'c').replaceAll(/\Ć/g, 'C').replaceAll(/\ę/g, 'e').replaceAll(/\Ę/g, 'E').replaceAll(/\ł/g, 'l').replaceAll(/\Ł/g, 'L').replaceAll(/\ń/g, 'n').replaceAll(/\Ń/g, 'N').replaceAll(/\ó/g, 'o').replaceAll(/\Ó/g, 'O').replaceAll(/\ś/g, 's').replaceAll(/\Ś/g, 'S').replaceAll(/[ź, ż, ]/g, 'z').replaceAll(/[Ź, Ż]/g, 'Z');
            //   break;

            case "polish-letters":
              console.log('polish-letters');
              inputNormal.value = replaceAllDiacriticsLetters(inputNormal.value);
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

    function replaceAllDiacriticsLetters(value) {
      return value.replaceAll(/\ą/g, 'a').replaceAll(/\Ą/g, 'A').replaceAll(/\ć/g, 'c').replaceAll(/\Ć/g, 'C').replaceAll(/\ę/g, 'e').replaceAll(/\Ę/g, 'E').replaceAll(/\ł/g, 'l').replaceAll(/\Ł/g, 'L').replaceAll(/\ń/g, 'n').replaceAll(/\Ń/g, 'N').replaceAll(/\ó/g, 'o').replaceAll(/\Ó/g, 'O').replaceAll(/\ś/g, 's').replaceAll(/\Ś/g, 'S').replaceAll(/[ź, ż, ]/g, 'z').replaceAll(/[Ź, Ż]/g, 'Z')
    }

    function encryptionStatus() {
      encrypter.querySelector('.js-encryption-status').querySelectorAll('input').forEach(input => {
        if (input.checked == true && input.classList.contains('simple-encryption')) {
          inputNormal.value = replaceAllDiacriticsLetters(inputNormal.value);

          // jak będzie powyżej numera co jest liczba to pętla

          // console.log(input);
        }

        // if (input.checked.classList.contains('.simple-encryption')) {
        //   console.log('Simple encryption')
        // } else {
        //   console.log('advanced-encryption')
        // }
      });
    }

  // console.log(encrypt('abc', '1') === 'bcd');
  // console.log(decrypt('bcd', '1') === 'abc');
  // console.log(encrypt('abc', '123') === 'bdf');
  // console.log(decrypt('bdf', '123') === 'abc');
  console.log(encrypt('ds', '121') === 'bca');
  // console.log(decrypt('bca', '111') === 'abz');
  // console.log(decrypt('abc', '135') === 'zyx');
  // console.log(decrypt('a', '1') === 'z');
  alert();
  function encrypt(inputs, passkey) {
    // const output;
    // return output;
    // passkey = passkey.split('')
    let result = '';
    let i = 0;

    passkey = passkey.replaceAll(/[' ']/g, '').split('');
    // passkey[i] = passkey[i].codePointAt();
    // console.log(passkey);

    replaceAllDiacriticsLetters(inputs).replaceAll(/[\W_]/ig, '').split('').forEach(input => {
      if (i >= passkey.length){i = 0}
      // console.log(parseInt(passkey[i]));
      number = input.codePointAt() + parseInt(passkey[i]);
      console.log(number);
      i++;
      if (number <= 97 || number >= 122) {
        console.log(`${number}====`);
        keyConverted = number - 122 - 1;
        number = 97 + keyConverted;
        console.log(`${number}++++++`);
      }
      result += String.fromCodePoint(number);
    });
    console.log(result);
    return result;
  }

  // function decrypt(inputs, passkey) {
  //   let result = '';
  //   let i = 0;
  //   passkey = passkey.replaceAll(/[' ']/g, '').split('');
  //   // console.log(parseInt(passkey[i]))

  //   inputs.split('').forEach(input => {
  //     if (i >= passkey.length){i = 0}
  //     number = input.codePointAt() - parseInt(passkey[i])
  //     i++
  //     if (number <= 97 || number >= 122) {
  //       console.log(`${number}====`)
  //       keyConverted = number - 122 - 1;
  //       number = 97 + keyConverted;
  //       console.log(`${number}++++++`)
  //     }
  //     result += String.fromCodePoint(number);
  //   });
  //   console.log(result);
  //   return result;
  // }
  });
})();
