(() => {
    document.querySelector('#kai_nonLoad_content').classList.add('hidden')
    document.querySelector('#kai_loaded_content').classList.remove('hidden')

    const tableFileName = document.querySelector('#kai_table_fileName');

    localforage.keys().then(function (keys) {
        keys.forEach((e, i) => {


            localforage.getItem(e).then(function (value) {
                value = JSON.parse(value)

                const tr = document.createElement('tr')

                const th_count = document.createElement('th')
                th_count.textContent = i + 1;
                tr.appendChild(th_count)

                const th_name = document.createElement('th')
                th_name.innerHTML = `
                <div>${e}</div>
                <div class="font-normal text-xs">生成日時: ${new Date(value.time)}</div>
                <div class="font-normal text-xs">読み込み日時: ${new Date(parseFloat(e.match(/(?<=.*\/)[0-9]*/gm)))}</div>
                <div class="font-normal text-xs">学校名 / 学科名: ${value.school} / ${value.department}</div>
                <div class="font-normal text-xs">ソースURL: <a href="${value.url}" target="_blank" class="link">${value.url}</a></div>
                `
                tr.appendChild(th_name)

                const th_action = document.createElement('th')

                const btn_data_del = document.createElement('button')
                btn_data_del.textContent = "削除"
                btn_data_del.classList.add('btn', 'mr-[5px]')
                btn_data_del.addEventListener('click', () => {
                    if (window.confirm(`${e}を削除してもよろしいですか`)) {
                        const url = new URL(window.location.href);
                        const loadedData = decodeURI(url.searchParams.get('loaded'));

                        if (e == loadedData) {
                            localforage.removeItem(e).then(function () {
                                location.href = "/"
                            }).catch(function (err) {
                                console.log(err);
                            });
                        }
                        else {
                            localforage.removeItem(e).then(function () {
                                location.reload()
                            }).catch(function (err) {
                                console.log(err);
                            });
                        }
                    }

                })
                th_action.appendChild(btn_data_del)

                tr.appendChild(th_action)

                tableFileName.appendChild(tr)
            }).catch(function (err) {
                console.log(err);
            });





        })
    }).catch(function (err) {
        // This code runs if there were any errors
        console.log(err);
    });
})();
