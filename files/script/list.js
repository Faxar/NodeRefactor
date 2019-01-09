function filter(inputF){
    var input, filter, table, tr, td;
    input = document.getElementById(userEntries);
    filter = input.value.toUpperCase();
    table = (input.id === "myInput") ? document.getElementById("myTable") : document.getElementById("userTabl");
    tr = table.getElementsByTagName("tr");
    for(var i = 0; i< tr.length; i++){
        td = tr[i].getElementsByTagName("td")[0];
        if(td){
            if(td.innerHTML.toUpperCase().indexOf(filter) > -1){
                tr[i].style.display = '';
            } else {
                tr[i].style.display = "none";
            }
        }
    }
};

$('#listd').find('input').keyup(function() {
    // filter($(this).attr('id'));
    console.log($(this).val());
})