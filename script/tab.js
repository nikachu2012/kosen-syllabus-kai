const tab = {
    /**
     * タブ作成
     * @param {Array} button 
     * @param {Array} element 
     */
    create: (button, element) => {
        tab.allClose = () => {
            element.forEach((e,i)=>{
                e.display = "none";
            })
        }

        tab.open = (index) => {
            element[index].display = "block"
        }

        button.forEach((e, i) => {
            e.addEventListener('click', () => {
                tab.allClose();
                tab.open(i);
            })
        })

        tab.open(0);
    },
}

tab.create(document.querySelectorAll('.content'), document.querySelectorAll('.kai_sidebar'))