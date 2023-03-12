import localforage, { key } from "localforage"
let loadedData = {}

const modalClose = () => {
    document.querySelector("#kai_modal_fileSelector").classList.remove('modal-open')
    document.querySelector("#fileSelector").value = 'kai_default'
}

document.querySelector("#fileSelector").addEventListener('change', (event) => {
    const currentValue = event.currentTarget.value;
    if (currentValue === "kai_readtoFile") {
        document.querySelector("#kai_modal_fileSelector").classList.add('modal-open')
    }

    document.querySelector('#kai_modal_fileSelector #kai_modal_cancel').addEventListener('click', modalClose, { once: true })
    document.querySelector('#kai_modal_toggle').addEventListener('change', modalClose, { once: true })
})

document.querySelector('#kai_modal_fileSelector #kai_input_fileLoader').addEventListener('change', (event) => {
    if (event.target.files.length !== 0) {
        const filename = event.target.files[0].name
        document.querySelector('#kai_modal_fileSelector #kai_input_wrapper').classList.replace('bg-base-300', 'bg-accent')
        document.querySelector('#kai_modal_fileSelector #kai_input_wrapper').textContent = `ファイルを選択済み(${filename})`
        modalClose()

        const reader = new FileReader();
        reader.readAsText(event.target.files[0])

        reader.onload = () => {
            loadedData = JSON.parse(reader.result);
            console.log("File loaded")

            localforage.setItem(`${filename}/${new Date().getTime()}`, reader.result).then(function (value) {
            }).catch(function (err) {
                console.error(`localForage error\n${err}`);
            });

            LoadToJSON(loadedData)
        }

        CreateFileSelectMenu();

        document.querySelector('.drawer-overlay').click()
        event.currentTarget.value = ''
        
    }
    else {
        document.querySelector('#kai_modal_fileSelector #kai_input_wrapper').classList.replace('bg-accent', 'bg-base-300')
        document.querySelector('#kai_modal_fileSelector #kai_input_wrapper').textContent = `ファイルを選択`
    }
})

const CreateFileSelectMenu = () => {
    localforage.keys().then(function (keys) {
        console.log(keys);
        let selectList = []

        if (keys.length == 0) {
            const ele = document.createElement('option')
            ele.textContent = "データがありません"
            ele.value = "kai_dataNone"
            ele.disabled = true;

            document.querySelector('#fileSelector #kai_select').appendChild(ele)
        }
        else {
            keys.forEach((e, i) => {
                const ele = document.createElement('option')
                ele.textContent = e
                ele.value = e

                document.querySelector('#fileSelector #kai_select').appendChild(ele)
            })
        }

    }).catch(function (err) {
        console.error(`localForage error\n${err}`);
    });
}

window.onload = () => {
    CreateFileSelectMenu()
}