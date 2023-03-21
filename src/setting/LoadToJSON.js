const LoadToJSON = (data, loaded) => {
    document.querySelector("#sidebar_department").href = '/?loaded=' + encodeURIComponent(loaded);
    document.querySelector("#sidebar_courseDetail").href = '/courseDetail/?loaded=' + encodeURIComponent(loaded);
    document.querySelector("#sidebar_teacher").href = '/teacher/?loaded=' + encodeURIComponent(loaded);
    document.querySelector('#sidebar_officialSyllabus').href = data.url;
    document.querySelector('#sidebar_browserStorage').href = '/browserStorage/?loaded=' + encodeURIComponent(loaded);
    document.querySelector('#sidebar_setting').href = '/setting/?loaded=' + encodeURIComponent(loaded);
}
