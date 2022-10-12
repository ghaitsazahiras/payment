<template>
    <div>
        <div class="card">
            <h5 class="card-header"><center>Student List</center></h5>
                <button @click="Add()" data-bs-toggle="modal" data-bs-target="#student_modal" class="btn btn-dark btn-sm float-end"><i class="fas fa-plus fa-fw"></i>Add Student</button>
            <div class="table-responsive text-nowrap">
                <table class="table table-hover">
                    <caption class="ms-4">
                      List of Moklet's Students
                    </caption>
                <thead>
                    <tr>
                    <th>NISN</th>
                    <th>NIS</th>
                    <th>Student Name</th>
                    <th>Class ID</th>
                    <th>Address</th>
                    <th>Telephone</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody class="table-border-bottom-0">
                    <tr v-for="(sl, index) in student_list" :key="index">
                    <td><i class="fab fa-angular fa-lg text-danger me-3"></i> {{ index+1 }}</td>
                    <td>{{ sl.nis }}</td>
                    <td>{{ sl.student_name }}</td>
                    <td><span class="badge bg-label-danger me-1">{{ sl.class_id }}</span></td>
                    <td>{{ sl.address }}</td>
                    <td>{{ sl.telephone }}</td>
                    <td>
                        <button class="btn btn-sm btn-secondary" @click="Edit(sl)" data-bs-toggle="modal" data-bs-target="#student_modal" ><i class="bx bx-edit-alt me-1"></i></button>&nbsp;
                        <button class="btn btn-sm btn-danger" @click="Delete(sl.nisn)"><i class="bx bx-trash me-1"></i></button>
                    </td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="student_modal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-md bg-primary">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Student Data</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="nis" class="form-label">NIS</label>
                            <input type="number" class="form-control" id="nis" v-model="nis" placeholder="NIS">
                        </div>

                        <div class="mb-3">
                            <label for="student_name" class="form-label">Student Name</label>
                            <input type="text" class="form-control" id="student_name" v-model="student_name" placeholder="Student Name">
                        </div>

                        <div class="mb-3">
                            <label for="class_id" class="form-label">Class</label>
                            <select class="form-control" v-model="class_id">
                                <option value="" disabled>-- Choose Class --</option>
                                <option v-for="gl in grade_list" :key="gl" v-bind:value="gl.class_id">{{ gl.class_name }} - {{ gl.direction }}</option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label for="address" class="form-label">Address</label>
                            <input type="text" class="form-control" id="address" v-model="address" placeholder="Address">
                        </div>

                        <div class="mb-3">
                            <label for="telephone" class="form-label">Telephone</label>
                            <input type="number" class="form-control" id="telephone" v-model="telephone" placeholder="Telephone">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-dark" @click="Save()" data-bs-dismiss="modal">Submit</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal -->
    </div>
</template>

<script>
export default {
    name: 'Student_Page',

    data(){
        return {
            nisn : "",
            nis : "",
            student_name : "",
            class_id : "",
            address : "",
            telephone : "",
            student_list : [],
            grade_list : []
        }
    },

    methods : {
        getStudentList : function(){
            this.axios.get('/student')
            .then(response => {
                this.student_list = response.data;
                console.log(response);
            });
        },

        getGrade: function(){
            // let token = {
            //     headers : { "Authorization" : "Bearer " + localStorage.getItem("Authorization")}
            // }

            this.axios.get("/grade")
            .then( response => {
                this.grade_list = response.data;
            })
        },

        Add: function() {
            this.nisn = ""
            this.nis = ""
            this.student_name = ""
            this.class_id = ""
            this.address = ""
            this.telephone = ""
            this.action = "insert"
            this.getGrade()
        },

        Edit: function(sl){
            this.nisn = sl.nisn
            this.nis = sl.nis
            this.student_name = sl.student_name
            this.class_id = sl.class_id
            this.address = sl.address
            this.telephone = sl.telephone
            this.action = "update"
            this.getGrade()
        },

        Save: function() {
            // let token = {
            //     headers : { 
            //         "Authorization" : "Bearer " + localStorage.getItem("Authorization")
            //     }
            // }
            
            let form  = {
                'nis' : this.nis,
                'student_name': this.student_name,
                'class_id': this.class_id,
                'address': this.address,
                'telephone': this.telephone,
            }

            if(this.action === 'insert'){ //POST
                this.axios.post('/student', form)
                .then( response => {
                   this.$swal({
                        title: 'Success!',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                    this.getStudentList()
                })
            }
            
            else { //PUT
                this.axios.put('/student/' + this.nisn, form)
                .then( response => {
                    this.$swal({
                        title: 'Success!',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                    this.getStudentList()
                })
            }
        },
        Delete: function(nisn){
            //mapping header token
            // let token = {
            //     headers : { "Authorization" : "Bearer " + localStorage.getItem("Authorization")}
            // }
            
            this.$swal({
                title: 'Delete student data?',
                text: 'Are you sure you want to delete this data?',
                icon: 'warning',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Yes',
                denyButtonText: `No`,
            }).then((result) => {
                if (result.isConfirmed) {
                     this.axios.delete('/student/' + nisn)
                    .then( response => {
                        this.$swal({
                            title: 'Success!',
                            text: response.data.message,
                            icon: 'success',
                            confirmButtonText: 'OK'
                        })
                        this.getStudentList()
                    })
                } else if (result.isDenied) {
                    this.$swal({
                        title: 'Cancel!',
                        text: 'Student data is safe',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }
            })
        }
    },

    mounted(){
        this.getStudentList()
    }
}
</script>