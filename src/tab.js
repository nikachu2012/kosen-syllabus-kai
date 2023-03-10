const tab = {
    /**
     * タブ作成
     * @param {Array} button 
     * @param {Array} element 
     */
    create: (button, element) => {
        tab.allClose = () => {
            element.forEach((e,i)=>{
                e.classList.add("hidden");
            })
        }

        tab.open = (index) => {
            element[index].classList.remove('hidden')
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

tab.create(document.querySelectorAll('.kai_sidebar'), document.querySelectorAll('.content'))
