const LoadToJSON = (data, loaded) => {
    const url = new URL(window.location.href);
    const params = url.searchParams;

    if (params.get('course') !== null) {
        if (data.courseData[decodeURI(params.get('course'))] == undefined) {
            document.querySelector('#kai_loaded_content').innerHTML = `
            <div class="w-full h-[100dvh] flex flex-col items-center justify-center">
                <span class="font-bold text-2xl">指定された科目の詳細情報が存在しません。</span>
                <button class="btn btn-sm mt-[10px]" id="kai_reload">やり直す</button>
            </div>
            `

            document.querySelector('#kai_reload').addEventListener('click', () => {
                document.querySelector('#sidebar_courseDetail').click();
            })
        }
        else {
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
            if(courseData.information.class.semester.concentration){
                semester = `<tr><th>週時間数</th><td>集中講義</td></tr>`
            }
            else if (courseData.information.class.semester.first == courseData.information.class.semester.second) {
                semester = `<tr><th>週時間数</th><td>${courseData.information.class.semester.first}</td></tr>`
            }
            else {
                semester = `<tr><th>週時間数</th><td>${courseData.information.class.semester.first} / ${courseData.information.class.semester.second}</td></tr>`
            }
            

            // 教員リストの生成
            let teacherList = []
            courseData.information.instructor.list.forEach((e, i) => {
                teacherList.push(`<a class="link underline-offset-4" href="/teacher/?teacher=${encodeURIComponent(e)}&loaded=${encodeURIComponent(loaded)}">${e}</a>`)
            })

            // ルーブリック
            const rubricData = courseData.rubric

            // ルーブリック 理想的
            let rubricIdeal = [];
            Object.keys(rubricData).forEach((e, i) => {
                rubricIdeal.push(`<tr><th class="max-w-sm break-all">${e.replace(/(?:\n)+/g, '<br>')}</th><td>${rubricData[e].ideal.replace(/(?:\n)+/g, '<br>')}</td></tr>`)
            })

            // ルーブリック 標準的
            let rubricStandard = [];
            Object.keys(rubricData).forEach((e, i) => {
                rubricStandard.push(`<tr><th class="max-w-sm break-all">${e.replace(/(?:\n)+/g, '<br>')}</th><td>${rubricData[e].standard.replace(/(?:\n)+/g, '<br>')}</td></tr>`)
            })

            // ルーブリック 未到達
            let rubricUnacceptable = [];
            
            Object.keys(rubricData).forEach((e, i) => {
                rubricUnacceptable.push(`<tr><th class="max-w-sm break-all">${e.replace(/(?:\n)+/g, '<br>')}</th><td>${rubricData[e].unacceptable.replace(/(?:\n)+/g, '<br>')}</td></tr>`)
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
                planFirst.push(`<tr><th>${e.week}週</th><td>${e.theme.replace(/(?:\n)+/g, '<br>')}</td><td>${e.goal.replace(/(?:\n)+/g, '<br>')}</td></tr>`)
            })

            // 後期授業計画
            const planSecondData = courseData.plan.second
            let planSecond = [];

            planSecondData.forEach((e, i) => {
                planSecond.push(`<tr><th>${e.week}週</th><td>${e.theme.replace(/(?:\n)+/g, '<br>')}</td><td>${e.goal.replace(/(?:\n)+/g, '<br>')}</td></tr>`)
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

            let unacceptableColorBackground;
            let unacceptableColorContent;
            let unacceptableColorBorder;
            if(Setting.appearance.unacceptableIsRed){
                unacceptableColorBackground = "bg-error"
                unacceptableColorContent = "text-error-content"
                unacceptableColorBorder = "border-error"
            }
            else{
                unacceptableColorBackground = "bg-warning"
                unacceptableColorContent = "text-warning-content"
                unacceptableColorBorder = "border-warning"
            }

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
                <tr><th>教員</th><td colspan="3">${teacherList.join(',&nbsp;')}</td></tr>
                <tr><th>教材</th><td>${courseData.information.textbook.all}</td></tr>
            </tbody></table></div>

            <div class="text-xl font-bold mt-5 mb-[10px] pb-1 border-b border-neutral">到達目標</div>
            <div class="bg-base-300 w-full h-auto p-2">${courseData.objectives.replace(/(?:\n)+/g, '<br>')}</div>

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
                <table class="table table-compact table-zebra w-full border ${unacceptableColorBorder}">
                    <thead><tr class="[&>*]:${unacceptableColorBackground} [&>*]:${unacceptableColorContent}">
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
            <div class="bg-base-300 w-full h-auto p-2">${courseData.method.outline.replace(/(?:\n)+/g, '<br>')}</div>
            <div class="text-lg font-bold my-[5px]">授業の進め方・方法</div>
            <div class="bg-base-300 w-full h-auto p-2">${courseData.method.style.replace(/(?:\n)+/g, '<br>')}</div>
            <div class="text-lg font-bold my-[5px]">注意点</div>
            <div class="bg-base-300 w-full h-auto p-2">${courseData.method.notice.replace(/(?:\n)+/g, '<br>')}</div>

            <div class="text-xl font-bold mt-5 mb-[10px] pb-1 border-b border-neutral">学科の到達目標項目との関係</div>
            ${assignObjectives.join('')}

            <div class="text-xl font-bold mt-5 mb-[10px] pb-1 border-b border-neutral">授業計画 (前期)</div>
            <div class="overflow-x-auto">
                <table class="table table-compact table-zebra w-full">
                    <thead><tr class="[&>*]:bg-base-300 [&>*]:normal-case"><th>週</th><th>授業内容</th><th>週ごとの到達目標</th></tr></thead>
                    <tbody>${planFirst.join('')}</tbody>
                </table>
            </div>

            <div class="text-xl font-bold mt-5 mb-[10px] pb-1 border-b border-neutral">授業計画 (後期)</div>
            <div class="overflow-x-auto">
                <table class="table table-compact table-zebra w-full">
                    <thead><tr class="[&>*]:bg-base-300 [&>*]:normal-case"><th>週</th><th>授業内容</th><th>週ごとの到達目標</th></tr></thead>
                    <tbody>${planSecond.join('')}</tbody>
                </table>
            </div>

            <div class="text-xl font-bold mt-5 mb-[10px] pb-1 border-b border-neutral">評価割合</div>
            <div class="overflow-x-auto">
                <table class="table table-compact table-zebra w-full">
                    <thead><tr class="[&>*]:bg-base-300 [&>*]:normal-case"><th></th>${weightPoint.join('')}</tr></thead>
                    <tbody>${weightData.join('')}</tbody>
                </table>
            </div>

            <div class="text-xl font-bold mt-5 mb-[10px] pb-1 border-b border-neutral">モデルコアカリキュラムの学習内容と到達目標</div>
            <div class="overflow-y-auto">${courseData.mccHTML}</div>
        `

            document.querySelector('#MainContent_SubjectSyllabus_mccTable').classList.remove(...document.querySelector('#MainContent_SubjectSyllabus_mccTable').classList)
            document.querySelector('#MainContent_SubjectSyllabus_mccTable').classList.add('table', 'table-compact', 'w-full')
            document.querySelector('#MainContent_SubjectSyllabus_mccTable tbody tr').classList.replace('bg-success','[&>*]:bg-base-300', "[&>*]:normal-case")
            document.querySelector('#MainContent_SubjectSyllabus_mccTable').removeAttribute('style')
        }
    }
    else {
        // 科目リストの生成
        let courseList = [];

        data.course.forEach((e, i) => {
            courseList.push(`<option value="${e.code}">${e.title} (${e.code})</option>`)
        })
        document.querySelector('#kai_loaded_content').innerHTML = `
        <div class="w-full h-[calc(100dvh_-_64px)] md:h-[100dvh] flex flex-col items-center justify-center">
            <span class="font-bold text-2xl">科目のデータを選択してください</span>
            <select id="selector" class="select select-bordered w-full max-w-xs mt-[5px]">
                <option disabled selected>未指定</option>
                ${courseList.join('')}
            </select>
        </div>
        `

        document.querySelector('#selector').addEventListener('change', (event) => {
            const selectValue = event.currentTarget.value;
            console.log(selectValue)

            const url = new URL(window.location.href);
            url.searchParams.delete('course');
            url.searchParams.set('course', encodeURI(selectValue))

            history.replaceState(null, null, url.search);
            location.reload();
        })
    }
    document.querySelector("#sidebar_department").href = '/?loaded=' + encodeURIComponent(loaded);
    document.querySelector("#sidebar_courseDetail").href = '/courseDetail/?loaded=' + encodeURIComponent(loaded);
    document.querySelector("#sidebar_teacher").href = '/teacher/?loaded=' + encodeURIComponent(loaded);
    document.querySelector('#sidebar_officialSyllabus').href = data.url;
    document.querySelector('#sidebar_browserStorage').href = '/browserStorage/?loaded=' + encodeURIComponent(loaded);
    document.querySelector('#sidebar_setting').href = '/setting/?loaded=' + encodeURIComponent(loaded);
}
