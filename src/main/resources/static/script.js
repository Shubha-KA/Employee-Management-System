const API="http://localhost:8080/api/employees";
let selectedId=null;

function fetchEmployees(){
    fetch(API)
    .then(res=>res.json())
    .then(data=>{
        const list=document.getElementById("employeeList");
        list.innerHTML="";

        data.forEach(emp=>{
            list.innerHTML+=`
            <div class="employee-card">
                <div>
                    <b>${emp.name}</b><br>
                    ${emp.email}<br>
                    ₹${emp.salary}
                </div>
                <button class="delete-btn" onclick="deleteEmployee(${emp.id})">Delete</button>
            </div>`;
        });
    });
}

function addEmployee(){
    const emp=getFormData();

    fetch(API,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(emp)
    }).then(()=>{
        clearForm();
        fetchEmployees();
    });
}

function searchById(){
    const id=document.getElementById("searchId").value;

    fetch(API+"/search/"+id)
    .then(res=>res.json())
    .then(emp=>{
        selectedId=emp.id;
        document.getElementById("name").value=emp.name;
        document.getElementById("email").value=emp.email;
        document.getElementById("salary").value=emp.salary;
    })
    .catch(()=>alert("Employee not found"));
}

function searchByName(){
    const name=document.getElementById("searchName").value;

    fetch(API+"/searchByName?name="+name)
    .then(res=>res.json())
    .then(data=>{
        const list=document.getElementById("employeeList");
        list.innerHTML="";

        data.forEach(emp=>{
            list.innerHTML+=`
            <div class="employee-card">
                <div>
                    <b>${emp.name}</b><br>
                    ${emp.email}<br>
                    ₹${emp.salary}
                </div>
            </div>`;
        });
    });
}

function updateEmployee(){

    if(selectedId==null){
        Swal.fire({
            icon: 'warning',
            title: 'No Employee Selected',
            text: 'Please search employee by ID first',
            confirmButtonColor: '#667eea'
        });
        return;
    }

    const emp=getFormData();

    fetch(API+"/search/"+selectedId)
    .then(res=>{
        if(!res.ok){
            throw new Error("Not found");
        }
        return res.json();
    })
    .then(existingEmp=>{
        fetch(API+"/"+selectedId,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(emp)
        })
        .then(()=>{
            Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: 'Employee updated successfully',
                confirmButtonColor: '#28a745'
            });
            clearForm();
            fetchEmployees();
        });
    })
    .catch(()=>{

        Swal.fire({
            title: 'Employee Not Found',
            text: 'Do you want to create a new employee?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Create',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#28a745'
        }).then((result)=>{
            if(result.isConfirmed){

                fetch(API,{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify(emp)
                })
                .then(()=>{
                    Swal.fire({
                        icon: 'success',
                        title: 'Created!',
                        text: 'New employee added successfully'
                    });
                    clearForm();
                    fetchEmployees();
                });
            }
        });
    });
}

function deleteEmployee(id){
    fetch(API+"/"+id,{method:"DELETE"})
    .then(()=>fetchEmployees());
}

function getFormData(){
    return{
        name:document.getElementById("name").value,
        email:document.getElementById("email").value,
        salary:document.getElementById("salary").value
    };
}

function clearForm(){
    document.getElementById("name").value="";
    document.getElementById("email").value="";
    document.getElementById("salary").value="";
    selectedId=null;
}

fetchEmployees();