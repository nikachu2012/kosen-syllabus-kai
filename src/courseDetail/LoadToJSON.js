const LoadToJSON = (data, loaded) => {
    const url = new URL(window.location.href);
    const params = url.searchParams;

    if (params.get('course') !== null) {
        const courseData = data.courseData[decodeURI(params.get('course'))]

        let characteristics = [];
        // 授業の属性を生成
        if (courseData.characteristics.ActiveLearning) {
            characteristics.push('<span class="badge badge-primary ml-[3px]">アクティブラーニング</span>')
        }
        if (courseData.characteristics.AidedByICT) {
            characteristics.push('<span class="badge badge-primary ml-[3px]">ICT利用</span>')
        }
        if (courseData.characteristics.ApplicableForRemoteClass) {
            characteristics.push('<span class="badge badge-primary ml-[3px]">遠隔授業対応</span>')
        }
        if (courseData.characteristics.InstructorProfessionallyExperienced) {
            characteristics.push('<span class="badge badge-primary ml-[3px]">実務経験のある教員による授業</span>')
        }

        // PDF生成ページのURL作成
        const createPDFurl = new URL(courseData.url)
        createPDFurl.pathname = '/Pages/SyllabusPDF'

        // 週時間数の生成
        let semester;
        if (courseData.information.class.semester.first == courseData.information.class.semester.second) {
            semester = `<tr><th>週時間数</th><td>${courseData.information.class.semester.first}</td></tr>`
        }
        else {
            semester = `<tr><th>週時間数</th><td>${courseData.information.class.semester.first} / ${courseData.information.class.semester.second}</td></tr>`
        }

        // ルーブリック
        const rubricData = courseData.rubric

        // ルーブリック 理想的
        let rubricIdeal = [];
        Object.keys(rubricData).forEach((e, i) => {
            rubricIdeal.push(`<tr><th class="max-w-sm break-all">${e}</th><td>${rubricData[e].ideal}</td></tr>`)
        })

        // ルーブリック 標準的
        let rubricStandard = [];
        Object.keys(rubricData).forEach((e, i) => {
            rubricStandard.push(`<tr><th class="max-w-sm break-all">${e}</th><td>${rubricData[e].standard}</td></tr>`)
        })

        // ルーブリック 未到達
        let rubricUnacceptable = [];
        Object.keys(rubricData).forEach((e, i) => {
            rubricUnacceptable.push(`<tr><th class="max-w-sm break-all">${e}</th><td>${rubricData[e].unacceptable}</td></tr>`)
        })

        // 学科の到達目標項目との関係
        const assignData = courseData.assignObjectives
        let assignObjectives = [];

        assignData.list.forEach((e, i) => {
            assignObjectives.push(`
            <div class="alert shadow-lg"><div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-success flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <div><div class="font-bold">${e}</div><div class="text-sm">${assignData[e]}</div></div>
            </div></div>
            `)
        })

        // 前期授業計画
        const planFirstData = courseData.plan.first
        let planFirst = [];

        planFirstData.forEach((e, i) => {
            planFirst.push(`<tr><th>${e.week}週</th><td>${e.theme}</td><td>${e.goal}</td></tr>`)
        })

        // 後期授業計画
        const planSecondData = courseData.plan.second
        let planSecond = [];

        planSecondData.forEach((e, i) => {
            planSecond.push(`<tr><th>${e.week}週</th><td>${e.theme}</td><td>${e.goal}</td></tr>`)
        })

        // 評価割合
        const weight = courseData.weight
        let weightPoint = [];

        weight.point.forEach((e, i) => {
            weightPoint.push(`<td>${e}</td>`)
        })

        let weightData = [];
        weight.contents.forEach((e, i) => {
            let value = [];

            Object.keys(weight[e]).forEach((e1, i1) => {
                value.push(`<td>${weight[e][e1]}</td>`)
            })

            weightData.push(`<tr><th>${e}</th>${value.join('')}</tr>`)
        });



        document.querySelector('#kai_loaded_content').innerHTML = `
            <style>
                .table :where(th, td){
                    white-space: normal;
                }
            </style>

            <div class="m-5">
                <div class="md:flex md:justify-between">
                    <div class="flex flex-col">
                        <span class="text-sm">教科番号: ${courseData.information.code}</span>
                        <span class="text-4xl font-bold ">
                            ${courseData.information.title}
                            ${characteristics.join('')}
                        </span>
                    </div>

                    <div class="flex justify-end mt-[10px] md:items-end md:mt-0 md:[justify-content:normal]">
                        <div class="tooltip tooltip-left" data-tip="高専Webシラバスで開く"><a class="btn btn-sm" href="${courseData.url}" target="_blank">シラバス</a></div>
                        <div class="tooltip tooltip-left" data-tip="高専Webシラバス内でPDFを生成"><a class="btn btn-sm normal-case ml-[10px]" href="${createPDFurl.toString()}" target="_blank">PDFを生成</a></div>
                    </div>
                </div>


            <hr class="border-base-content my-3">
            <div class="overflow-x-auto"><table class="table table-compact w-full border-[1px] border-secondary"><tbody>
                <tr><th>授業形態</th><td>${courseData.information.format}</td></tr>
                <tr><th>科目区分</th><td>${courseData.information.category.typeText} / ${courseData.information.category.takeText}</td></tr>
                <tr><th>単位の種別</th><td>${courseData.information.credit.text}</td></tr>
                <tr><th>単位数</th><td>${courseData.information.credit.count}</td></tr>
                <tr><th>開設期</th><td>${courseData.information.class.semester.text}</td></tr>
                ${semester}
                <tr><th>教員</th><td colspan="3">${courseData.information.instructor.all}</td></tr>
                <tr><th>教材</th><td>${courseData.information.textbook.all}</td></tr>
            </tbody></table></div>

            <div class="text-xl font-bold mt-5 mb-[10px] pb-1 border-b border-neutral">到達目標</div>
            <div class="bg-base-300 w-full h-auto p-2">${courseData.objectives}</div>

            <div class="text-xl font-bold mt-5 mb-[10px] pb-1 border-b border-neutral">ルーブリック</div>
            <div class="overflow-x-auto">
                <table class="table table-compact table-zebra w-full border-success border">
                    <thead><tr class="[&>*]:bg-success [&>*]:text-success-content">
                        <th class="rounded-none"></th>
                        <th class="rounded-none">理想的な到達レベルの目安</th>
                    </tr></thead>
                    <tbody>
                        ${rubricIdeal.join('')}
                    </tbody>
                </table>
            </div>

            <div class="overflow-x-auto mt-[10px]">
                <table class="table table-compact table-zebra w-full border border-info">
                    <thead><tr class="[&>*]:bg-info [&>*]:text-info-content">
                        <th class="rounded-none"></th>
                        <th class="rounded-none">標準的な到達レベルの目安</th>
                    </tr></thead>
                    <tbody>
                        ${rubricStandard.join('')}
                    </tbody>
                </table>
            </div>

            <div class="overflow-x-auto mt-[10px]">
                <table class="table table-compact table-zebra w-full border border-warning">
                    <thead><tr class="[&>*]:bg-warning [&>*]:text-warning-content">
                        <th class="rounded-none"></th>
                        <td class="rounded-none">未到達レベルの目安</th>
                    </tr></thead>
                    <tbody>
                        ${rubricUnacceptable.join('')}
                    </tbody>
                </table>
            </div>

            <div class="text-xl font-bold mt-5 mb-[10px] pb-1 border-b border-neutral">教育方法等</div>
            <div class="text-lg font-bold my-[5px]">概要</div>
            <div class="bg-base-300 w-full h-auto p-2">${courseData.method.outline}</div>
            <div class="text-lg font-bold my-[5px]">授業の進め方・方法</div>
            <div class="bg-base-300 w-full h-auto p-2">${courseData.method.style}</div>
            <div class="text-lg font-bold my-[5px]">注意点</div>
            <div class="bg-base-300 w-full h-auto p-2">${courseData.method.notice}</div>

            <div class="text-xl font-bold mt-5 mb-[10px] pb-1 border-b border-neutral">学科の到達目標項目との関係</div>
            ${assignObjectives.join('')}

            <div class="text-xl font-bold mt-5 mb-[10px] pb-1 border-b border-neutral">授業計画 (前期)</div>
            <div class="overflow-x-auto">
                <table class="table table-compact table-zebra w-full">
                    <thead><tr class="[&>*]:bg-base-300"><th>週</th><th>授業内容</th><th>週ごとの到達目標</th></tr></thead>
                    <tbody>${planFirst.join('')}</tbody>
                </table>
            </div>

            <div class="text-xl font-bold mt-5 mb-[10px] pb-1 border-b border-neutral">授業計画 (後期)</div>
            <div class="overflow-x-auto">
                <table class="table table-compact table-zebra w-full">
                    <thead><tr class="[&>*]:bg-base-300"><th>週</th><th>授業内容</th><th>週ごとの到達目標</th></tr></thead>
                    <tbody>${planSecond.join('')}</tbody>
                </table>
            </div>

            <div class="text-xl font-bold mt-5 mb-[10px] pb-1 border-b border-neutral">評価割合</div>
            <div class="overflow-x-auto">
                <table class="table table-compact table-zebra w-full">
                    <thead><tr><th></th>${weightPoint.join('')}</tr></thead>
                    <tbody>${weightData.join('')}</tbody>
                </table>
            </div>

            <div class="text-xl font-bold mt-5 mb-[10px] pb-1 border-b border-neutral">モデルコアカリキュラムの学習内容と到達目標</div>
            <div class="overflow-y-auto">${courseData.mccHTML}</div>
        `

        document.querySelector('#MainContent_SubjectSyllabus_mccTable').classList.remove(...document.querySelector('#MainContent_SubjectSyllabus_mccTable').classList)
        document.querySelector('#MainContent_SubjectSyllabus_mccTable').classList.add('table', 'table-compact', 'w-full')
        document.querySelector('#MainContent_SubjectSyllabus_mccTable').removeAttribute('style')

    }
    else {
        /*
        document.querySelector('#kai_loaded_content').innerHTML = `
        <div class="w-full h-[32px] my-[10px] relative">
            <div class="absolute left-0 text-2xl font-bold ml-5">科目詳細情報</div>
            <div class="absolute right-0 mr-5">
                <!-- right -->
            </div>
        </div>
        <div class="w-full h-[calc(100dvh_-_52px)] flex flex-col items-center justify-center">
            <span class="font-bold text-2xl">科目のデータを選択してください</span>
            <span></span>
        </div>
        `
        */
    }
    document.querySelector("#sidebar_department").href = '/?loaded=' + encodeURI(loaded);
    document.querySelector("#sidebar_courseDetail").href = '/courseDetail/?loaded=' + encodeURI(loaded);
    document.querySelector("#sidebar_mcc").href = '/mcc/?loaded=' + encodeURI(loaded);
    document.querySelector("#sidebar_curriculumMap").href = '/curriculumMap/?loaded=' + encodeURI(loaded);
}
