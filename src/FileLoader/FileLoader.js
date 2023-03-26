let loadedData = {}

const modalClose = () => {
    document.querySelector("#kai_modal_fileSelector").classList.remove('modal-open')
    document.querySelector("#fileSelector").value = 'kai_default'
}

document.querySelector("#fileSelector").addEventListener('change', (event) => {
    const currentValue = event.currentTarget.value;
    if (currentValue === "kai_readtoFile") {
        document.querySelector("#kai_modal_fileSelector").classList.add('modal-open')

        document.querySelector('#kai_modal_fileSelector #kai_modal_cancel').addEventListener('click', () => {
            modalClose()
        }, { once: true })

        document.querySelector('#kai_modal_fileSelector').addEventListener('click', () => {
            modalClose()
        }, { once: true })
    }
    else {
        LoadToKey(currentValue)
    }
})

let savefileName;
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

            savefileName = `${filename}/${new Date().getTime()}`
            localforage.setItem(savefileName, reader.result).then(function (value) {
                CreateFileSelectMenu(savefileName);

                document.querySelectorAll('#kai_nonLoad_content').forEach((e, i) => {
                    e.classList.add('hidden')
                })

                document.querySelectorAll('#kai_loaded_content').forEach((e, i) => {
                    e.classList.remove('hidden')
                })

                const url = new URL(window.location.href);
                url.searchParams.delete('loaded');
                url.searchParams.set('loaded', encodeURI(savefileName))

                history.replaceState(null, null, url.search);

                location.reload()




                LoadToJSON(loadedData, savefileName)
            }).catch(function (err) {
                console.error(`localForage error\n${err}`);
            });
        }

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

        const ele = document.querySelector('#fileSelector #kai_select')
        // DOM全削除
        const clone = ele.cloneNode(false);
        ele.parentNode.replaceChild(clone, ele);

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

        if (savefileName !== undefined) {
            document.querySelector('#fileSelector').value = savefileName;
        }
    }).catch(function (err) {
        console.error(err);
    });
}

const LoadToKey = (currentValue) => {
    localforage.getItem(currentValue).then(function (value) {
        const selectJSON = JSON.parse(value)

        document.querySelector('#kai_nonLoad_content').classList.add('hidden')
        document.querySelector('#kai_loaded_content').classList.remove('hidden')

        const url = new URL(window.location.href);
        url.searchParams.delete('loaded');
        url.searchParams.set('loaded', encodeURI(currentValue))

        history.replaceState(null, null, url.search);

            
        LoadToJSON(selectJSON, currentValue)

    }).catch(function (err) {
        alert('エラーが発生しました。DevToolsを参照してください')
        console.log(err);
    });
}

window.onload = () => {
    CreateFileSelectMenu()


    const url = new URL(window.location.href);
    const params = url.searchParams;

    const loadedData = decodeURI(params.get('loaded'));

    if (params.get('loaded') !== null) {
        localforage.getItem(loadedData).then(function (value) {
            if (value !== null) {
                console.log(loadedData)

                LoadToKey(loadedData)

                setInterval(() => {
                    document.querySelector('#fileSelector').value = loadedData;
                }, 10);
            }
        }).catch(function (err) {
            alert('エラーが発生しました。DevToolsを参照してください')
            console.log(err);
        });
    }
}
