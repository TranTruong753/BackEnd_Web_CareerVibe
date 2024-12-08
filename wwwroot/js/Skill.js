﻿var dataTable;

$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#tblSkillData').DataTable({
        "ajax": {
            url: '/skill/getall',
            dataSrc: function (json) {
                console.log(json);  // In ra dữ liệu từ API
                return json.data || [];
            }
        },
        "columns": [
            { data: 'id', "width": "35%", "className": "text-center" },
            { data: 'name', "width": "35%", "className": "text-center" },
            {
                data: 'id',
                "render": function (data) {
                    return `
                    <a href="/skill/update/${data}" class="btn btn-sm btn-warning" > <i class="fa-solid fa-pen-to-square"></i></a>
                    <a onClick=Delete('/skill/delete/${data}') class="btn btn-sm btn-danger" > <i class="fa-solid fa-trash"></i></a>`
                },
                "width": "30%"
            }
        ]
    });
}

function Delete(url) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function (data) {
                    dataTable.ajax.reload();
                    toastr.success(data.message);
                }
            })
        }
    });
}