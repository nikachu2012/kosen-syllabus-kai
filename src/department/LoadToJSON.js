const LoadToJSON = (data, loaded) => {
    console.log(data)

    // 開講科目一覧のDOM生成

    const department_table = document.querySelector('#kai_department_table tbody')
    data.course.forEach((element, index) => {
        const department = document.createElement('tr')

        const code = document.createElement('td')
        code.textContent = element.code;
        department.appendChild(code)

        const title = document.createElement('td')
        title.textContent = element.title
        department.appendChild(title)

        const category_type = document.createElement('td')
        category_type.textContent = element.category.typeText
        department.appendChild(category_type)

        const category_take = document.createElement('td')
        category_take.textContent = element.category.takeText
        department.appendChild(category_take)

        const credit = document.createElement('td')
        credit.textContent = element.credit.text
        department.appendChild(credit)

        const creditCount = document.createElement('td')
        creditCount.textContent = element.credit.count
        department.appendChild(creditCount)

        const grade = document.createElement('td')
        grade.textContent = element.class.grade
        department.appendChild(grade)

        if (!element.class.concentration) {
            const classFirstSemester = document.createElement('td')
            classFirstSemester.textContent = element.class.semester.first
            department.appendChild(classFirstSemester)

            const classSecondSemester = document.createElement('td')
            classSecondSemester.textContent = element.class.semester.second
            department.appendChild(classSecondSemester)
        }
        else {
            const classConcentration = document.createElement('td')
            classConcentration.colSpan = 2;
            classConcentration.textContent = "集中講義"
            department.appendChild(classConcentration)
        }


        const division = document.createElement('td')
        division.textContent = element.division
        department.appendChild(division)

        const detail = document.createElement('td')

        const detailButton = document.createElement('a')
        detailButton.classList.add("btn", "btn-xs")
        detailButton.textContent = "詳細"
        detailButton.title = "シラバス改の詳細ページで見る"
        detailButton.href = `/courseDetail/?course=${element.code}&loaded=${encodeURIComponent(loaded)}`
        detail.appendChild(detailButton)

        const realSyllabusButton = document.createElement('a')
        realSyllabusButton.classList.add("btn", "btn-xs", "ml-[3px]")
        realSyllabusButton.textContent = "シラバス"
        realSyllabusButton.title = "高専機構Webシラバスで見る"
        realSyllabusButton.href = element.description
        realSyllabusButton.target = "_blank"
        detail.appendChild(realSyllabusButton)

        department.appendChild(detail)

        department_table.appendChild(department)
    });

    // フィルタ適用
    $('#kai_department_table').exTableFilter({
        filters: {
            1: {
                append: {
                    template: `<input type="text" placeholder="ここで検索" class="input input-sm input-bordered w-full mt-[5px]">`,
                    to: "#kai_modal_department_filter_nameInput",
                    type: 'text'
                }
            },
            2: {
                append: {
                    to: "#kai_modal_department_filter_category_type",
                    type: 'checkbox',
                    template: `<div class="form-control"><label class="label cursor-pointer"><span class="label-text">{label}</span><input type="checkbox" class="checkbox checkbox-sm"></label></div>`
                },
            },
            3: {
                append: {
                    to: "#kai_modal_department_filter_category_take",
                    type: 'checkbox',
                    template: `<div class="form-control"><label class="label cursor-pointer"><span class="label-text">{label}</span><input type="checkbox" class="checkbox checkbox-sm"></label></div>`
                },
            },
            4: {
                append: {
                    to: "#kai_modal_department_filter_credit",
                    type: 'checkbox',
                    template: `<div class="form-control"><label class="label cursor-pointer"><span class="label-text">{label}</span><input type="checkbox" class="checkbox checkbox-sm"></label></div>`
                },
            },
            6: {
                append: {
                    blankLabel: "全て",
                    to: "#kai_modal_department_filter_grade",
                    type: 'select',
                    template: `<select class="select select-sm select-bordered w-full mt-[5px]"></select>`,
                },
                selectValueMatch: true,
            },
        }
    });

    $('#kai_department_table').tablesorter({
        textExtraction: function (node) {
            var attr = $(node).attr('data-value');
            if (typeof attr !== 'undefined' && attr !== false) {
                return attr;
            }
            return $(node).text();
        }
    });

    document.title = `開講科目一覧 - 高専シラバス改`

    document.querySelector("#sidebar_department").href = '/?loaded=' + encodeURIComponent(loaded);
    document.querySelector("#sidebar_courseDetail").href = '/courseDetail/?loaded=' + encodeURIComponent(loaded);
    document.querySelector("#sidebar_teacher").href = '/teacher/?loaded=' + encodeURIComponent(loaded);
    document.querySelector('#sidebar_officialSyllabus').href = data.url;
    document.querySelector('#sidebar_browserStorage').href = '/browserStorage/?loaded=' + encodeURIComponent(loaded);
    document.querySelector('#sidebar_setting').href = '/setting/?loaded=' + encodeURIComponent(loaded);
}
