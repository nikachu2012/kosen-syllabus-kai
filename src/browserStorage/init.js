import localforage from "localforage";

(() => {
    document.querySelector('#kai_nonLoad_content').classList.add('hidden')
    document.querySelector('#kai_loaded_content').classList.remove('hidden')

    let dataList = [];
    localforage.keys().then(function (keys) {
        
    }).catch(function (err) {
        // This code runs if there were any errors
        console.log(err);
    });
})();
