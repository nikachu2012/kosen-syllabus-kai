/**
 * 設定をDOMから読み込み
 * @returns {JSON}
 */
const readSetting = () => {
    let setting = {
        appearance: {
            unacceptableIsRed: document.querySelector('#kai_setting_unacceptable').checked,
            selectedColor: document.querySelector("#kai_setting_colors").value,
        }
    }
    return setting
}

/**
 * 設定をDOMに書き込み
 * @param {JSON} setting 
 */
const writeSetting = (setting) => {
    document.querySelector('#kai_setting_unacceptable').checked = setting.appearance.unacceptableIsRed
    document.querySelector("#kai_setting_colors").value = setting.appearance.selectedColor;
    document.documentElement.setAttribute("data-theme", setting.appearance.selectedColor);
}


document.querySelector('#kai_setting_save').addEventListener('click', () => {
    const setting = readSetting();
    localStorage.setItem('setting', JSON.stringify(setting))
})


function changeTheme() {
    const selectedColor = document.querySelector("#kai_setting_colors").value;
    document.documentElement.setAttribute("data-theme", selectedColor);
}

(()=>{
    document.querySelector('#kai_nonLoad_content').classList.add('hidden')
    document.querySelector('#kai_loaded_content').classList.remove('hidden')

    if(localStorage.getItem('setting') !== null){
        writeSetting(JSON.parse(localStorage.getItem('setting')))
    }
})();
