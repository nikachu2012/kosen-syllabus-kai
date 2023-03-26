let Setting;

(() => {
    if (localStorage.getItem('setting') !== null) {
        Setting = JSON.parse(localStorage.getItem('setting'));
        document.documentElement.setAttribute("data-theme", Setting.appearance.selectedColor);
    }
    else {
        const setData = {
            appearance: {
                unacceptableIsRed: false,
                selectedColor: "black",
            }
        }
        localStorage.setItem('setting', JSON.stringify(setData))
    }
})();
