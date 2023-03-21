const LoadToJSON = (data, loaded) => {
    const url = new URL(window.location.href);
    const params = url.searchParams;

    if (params.get('teacher') !== null) {
        if (data.instructor[decodeURI(params.get('teacher'))] == undefined) {
            document.querySelector('#kai_loaded_content').innerHTML = `
            <div class="w-full h-[100dvh] flex flex-col items-center justify-center">
                <span class="font-bold text-2xl">指定された教員が存在しません</span>
                <button class="btn btn-sm mt-[10px]" id="kai_reload">やり直す</button>
            </div>
            `

            document.querySelector('#kai_reload').addEventListener('click', () => {
                document.querySelector('#sidebar_teacher').click();
            })
        }
        else {
            const teacherData = data.instructor[decodeURI(params.get('teacher'))]

            // 1年次生成
            let firstGrade = [];
            if (teacherData.subject.grade[0].length !== 0) {
                teacherData.subject.grade[0].forEach((e, i) => {
                    firstGrade.push(`
                    <div class="alert shadow-lg mt-[5px]"><div>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24" style="fill: hsl(var(--su));"><path d="M479 936 189 777V537L40 456l439-240 441 240v317h-60V491l-91 46v240L479 936Zm0-308 315-172-315-169-313 169 313 172Zm0 240 230-127V573L479 696 249 571v170l230 127Zm1-240Zm-1 74Zm0 0Z" /></svg>
                        <span><a class="link underline-offset-4 text-xl font-bold" href="/courseDetail/?course=${e.code}&loaded=${encodeURIComponent(loaded)}">${e.title}</a></span>
                    </div></div>
                `)
                })
            }
            else {
                firstGrade.push(`
                    <div class="mt-[5px]">
                        担当科目なし
                    </div>
                `)
            }

            // 2年次生成
            let secondGrade = [];
            if (teacherData.subject.grade[1].length !== 0) {
                teacherData.subject.grade[1].forEach((e, i) => {
                    secondGrade.push(`
                    <div class="alert shadow-lg mt-[5px]"><div>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24" style="fill: hsl(var(--su));"><path d="M479 936 189 777V537L40 456l439-240 441 240v317h-60V491l-91 46v240L479 936Zm0-308 315-172-315-169-313 169 313 172Zm0 240 230-127V573L479 696 249 571v170l230 127Zm1-240Zm-1 74Zm0 0Z" /></svg>
                        <span><a class="link underline-offset-4 text-xl font-bold" href="/courseDetail/?course=${e.code}&loaded=${encodeURIComponent(loaded)}">${e.title}</a></span>
                    </div></div>
                `)
                })
            }
            else {
                secondGrade.push(`
                    <div class="mt-[5px]">
                        担当科目なし
                    </div>
                `)
            }

            // 3年次生成
            let thirdGrade = [];
            if (teacherData.subject.grade[2].length !== 0) {
                teacherData.subject.grade[2].forEach((e, i) => {
                    thirdGrade.push(`
                    <div class="alert shadow-lg mt-[5px]"><div>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24" style="fill: hsl(var(--su));"><path d="M479 936 189 777V537L40 456l439-240 441 240v317h-60V491l-91 46v240L479 936Zm0-308 315-172-315-169-313 169 313 172Zm0 240 230-127V573L479 696 249 571v170l230 127Zm1-240Zm-1 74Zm0 0Z" /></svg>
                        <span><a class="link underline-offset-4 text-xl font-bold" href="/courseDetail/?course=${e.code}&loaded=${encodeURIComponent(loaded)}">${e.title}</a></span>
                    </div></div>
                `)
                })
            }
            else {
                thirdGrade.push(`
                    <div class="mt-[5px]">
                        担当科目なし
                    </div>
                `)
            }

            // 4年次生成
            let forthGrade = [];
            if (teacherData.subject.grade[3].length !== 0) {
                teacherData.subject.grade[3].forEach((e, i) => {
                    forthGrade.push(`
                    <div class="alert shadow-lg mt-[5px]"><div>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24" style="fill: hsl(var(--su));"><path d="M479 936 189 777V537L40 456l439-240 441 240v317h-60V491l-91 46v240L479 936Zm0-308 315-172-315-169-313 169 313 172Zm0 240 230-127V573L479 696 249 571v170l230 127Zm1-240Zm-1 74Zm0 0Z" /></svg>
                        <span><a class="link underline-offset-4 text-xl font-bold" href="/courseDetail/?course=${e.code}&loaded=${encodeURIComponent(loaded)}">${e.title}</a></span>
                    </div></div>
                `)
                })
            }
            else {
                forthGrade.push(`
                    <div class="mt-[5px]">
                        担当科目なし
                    </div>
                `)
            }

            // 5年次生成
            let fifthGrade = [];
            if (teacherData.subject.grade[4].length !== 0) {
                teacherData.subject.grade[4].forEach((e, i) => {
                    fifthGrade.push(`
                        <div class="alert shadow-lg mt-[5px]"><div>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24" style="fill: hsl(var(--su));"><path d="M479 936 189 777V537L40 456l439-240 441 240v317h-60V491l-91 46v240L479 936Zm0-308 315-172-315-169-313 169 313 172Zm0 240 230-127V573L479 696 249 571v170l230 127Zm1-240Zm-1 74Zm0 0Z" /></svg>
                            <span><a class="link underline-offset-4 text-xl font-bold" href="/courseDetail/?course=${e.code}&loaded=${encodeURIComponent(loaded)}">${e.title}</a></span>
                        </div></div>
                    `)
                })
            }
            else {
                fifthGrade.push(`
                    <div class="mt-[5px]">
                        担当科目なし
                    </div>
                `)
            }


            document.querySelector('#kai_loaded_content').innerHTML = `
            <div class="p-5">
                <div class="md:flex md:justify-between">
                    <div class="flex flex-col">
                        <span class="text-4xl font-bold">
                            ${teacherData.name}
                        </span>
                    </div>

                    <div class="flex justify-end mt-[10px] md:items-end md:mt-0 md:[justify-content:normal]">
                        <div class="tooltip tooltip-left" data-tip="researchmapで開く"><a class="btn btn-sm" href="${teacherData.url}" target="_blank">researchmapで開く</a></div>
                    </div>
                </div>

                <div class="text-xl font-bold mt-5 mb-[10px] pb-1 border-b border-neutral">１年次の担当科目</div>
                ${firstGrade.join('')}
                <div class="text-xl font-bold mt-5 mb-[10px] pb-1 border-b border-neutral">２年次の担当科目</div>
                ${secondGrade.join('')}
                <div class="text-xl font-bold mt-5 mb-[10px] pb-1 border-b border-neutral">３年次の担当科目</div>
                ${thirdGrade.join('')}
                <div class="text-xl font-bold mt-5 mb-[10px] pb-1 border-b border-neutral">４年次の担当科目</div>
                ${forthGrade.join('')}
                <div class="text-xl font-bold mt-5 mb-[10px] pb-1 border-b border-neutral">５年次の担当科目</div>
                ${fifthGrade.join('')}
            </div>
            `
        }
    }
    else {

        // 教員リストの生成
        let teacherList = [];

        Object.keys(data.instructor).forEach((e, i) => {
            teacherList.push(`<option value="${e}">${e}</option>`)
        })
        document.querySelector('#kai_loaded_content').innerHTML = `
        <div class="w-full h-[calc(100dvh_-_64px)] md:h-[100dvh] flex flex-col items-center justify-center">
            <span class="font-bold text-2xl">教員を選択してください</span>
            <select id="selector" class="select select-bordered w-full max-w-xs mt-[5px]">
                <option disabled selected>未指定</option>
                ${teacherList.join('')}
            </select>
        </div>
        `

        document.querySelector('#selector').addEventListener('change', (event) => {
            const selectValue = event.currentTarget.value;
            console.log(selectValue)

            const url = new URL(window.location.href);
            url.searchParams.delete('teacher');
            url.searchParams.set('teacher', encodeURI(selectValue))

            history.replaceState(null, null, url.search);
            location.reload();
        })
    }

    document.querySelector("#sidebar_department").href = '/?loaded=' + encodeURIComponent(loaded);
    document.querySelector("#sidebar_courseDetail").href = '/courseDetail/?loaded=' + encodeURIComponent(loaded);
    document.querySelector("#sidebar_teacher").href = '/teacher/?loaded=' + encodeURIComponent(loaded);
    document.querySelector('#sidebar_officialSyllabus').href = data.url;
}
