const LoadToJSON = (data, loaded) => {
    const url = new URL(window.location.href);
    const params = url.searchParams;

    if (params.get('course') !== null) {
        document.querySelector('#kai_loaded_content').innerHTML = `
        <div class="w-full h-[32px] my-[10px] relative">
            <div class="absolute left-0 text-2xl font-bold ml-5">科目詳細情報</div>
            <div class="absolute right-0 mr-5">
                <!-- right -->
            </div>
        </div>
        `

        const courseData = data.courseData[decodeURI(params.get('course'))]

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
