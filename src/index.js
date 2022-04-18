import 'regenerator-runtime/runtime'

import {initContract} from './utils'

const submitButton = document.getElementById('callContract')
const nameButton = document.getElementById('nameButton')
const resultBlock = document.getElementById('resultText')
const helloImage = document.getElementById('helloImage')
const note = document.getElementById('note')

document.querySelector('form').onsubmit = async (event) => {
    event.preventDefault();
    submitButton.disabled = true;
    try {
        let greeting = await window.contract.get_greeting({
            account_id: nameButton.value
        });
        resultBlock.innerHTML = `<b>${greeting}</b> I'm NEAR blockchain.`;
    } catch (e) {
        alert('Something went wrong!');
    } finally {
        submitButton.disabled = false;
        helloImage.hidden = false;
        note.hidden = false;
    }
}

helloImage.onclick = async (event) => {
    console.log('Bye!');
    resultBlock.innerHTML = '';
    helloImage.hidden = true;
    note.hidden = true;
    nameButton.value = '';
}

// `nearInitPromise` gets called on page load
window.nearInitPromise = initContract()
    .then(() => {
        console.log('JS Initialized');
    })
    .catch(console.error)
