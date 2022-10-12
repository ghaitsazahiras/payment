<template>
    <div>
        <div class="card">
            <h5 class="card-header"><center>Grade List</center></h5>
                <button @click="Add()" data-bs-toggle="modal" data-bs-target="#grade_modal" class="btn btn-dark btn-sm float-end"><i class="fas fa-plus fa-fw"></i>Add Grade</button>
            <div class="table-responsive text-nowrap">
                <table class="table table-hover">
                    <caption class="ms-4">
                      List of Moklet's Grades
                    </caption>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Class Name</th>
                    <th>Direction</th>
                    <th>Line</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody class="table-border-bottom-0">
                    <tr v-for="(gl, index) in grade_list" :key="index">
                    <td><i class="fab fa-angular fa-lg text-danger me-3"></i> {{ index+1 }}</td>
                    <td>{{ gl.class_name }}</td>
                    <td><span class="badge bg-label-danger me-1">{{ gl.direction }}</span></td>
                    <td>{{ gl.line }}</td>
                    <td>
                        <button class="btn btn-sm btn-secondary" @click="Edit(gl)" data-bs-toggle="modal" data-bs-target="#grade_modal" ><i class="bx bx-edit-alt me-1"></i></button>&nbsp;
                        <button class="btn btn-sm btn-danger" @click="Delete(gl.class_id)"><i class="bx bx-trash me-1"></i></button>
                    </td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="grade_modal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-md bg-primary">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Grade Data</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="class_name" class="form-label">Class Name</label>
                            <input type="text" class="form-control" id="class_name" v-model="class_name" placeholder="Class Name">
                        </div>

                        <div class="mb-3">
                            <label for="direction" class="form-label">Direction</label>
                            <input type="text" class="form-control" id="direction" v-model="direction" placeholder="Direction">
                        </div>

                        <div class="mb-3">
                            <label for="line" class="form-label">Line</label>
                            <input type="number" class="form-control" id="line" v-model="line" placeholder="Line">
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
    name: 'Grade_Page',

    data(){
        return {
            class_id: '',
            class_name: '',
            direction: '',
            line: '',
            grade_list : [],
        }
    },

    methods : {
        getGradeList : function(){
            this.axios.get('/grade')
            .then(response => {
                this.grade_list = response.data;
                console.log(response);
            });
        },

        Add: function() {
            this.class_id = ""
            this.class_name = ""
            this.direction = ""
            this.line = ""
            this.action = "insert"
        },

        Edit: function(gl){
            this.class_id = gl.class_id
            this.class_name = gl.class_name
            this.direction = gl.direction
            this.line = gl.line
            this.action = "update"
        },

        Save: function() {
            //mapping header token
            // let token = {
            //     headers : { 
            //         "Authorization" : "Bearer " + localStorage.getItem("Authorization")
            //     }
            // }

            //mapping data
            let form  = {
                'class_name': this.class_name,
                'direction': this.direction,
                'line': this.line
            }

            if(this.action === 'insert'){ //POST
                this.axios.post('/grade', form)
                .then( response => {
                   this.$swal({
                        title: 'Success!',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                    this.getGradeList()
                })
            }
            
            else { //PUT
                this.axios.put('/grade/' + this.class_id, form)
                .then( response => {
                    this.$swal({
                        title: 'Success!',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                    this.getGradeList()
                })
            }
        },

        Delete: function(class_id){
            //mapping header token
            // let token = {
            //     headers : { "Authorization" : "Bearer " + localStorage.getItem("Authorization")}
            // }

            this.$swal({
                title: 'Delete Data Grade',
                text: 'Are you sure you want to delete this data?',
                icon: 'warning',
                showDenyButton: true,
                showCancelbutton: false,
                confirmButtonText: 'Yes',
                denyButtonText: `No`,
            }).then((result) => {
                if (result.isConfirmed) {
                     this.axios.delete('/grade/' + class_id)
                    .then( response => {
                        this.$swal({
                            title: 'Success!',
                            text: response.data.message,
                            icon: 'success',
                            confirmButtonText: 'OK'
                        })
                        this.getGradeList()
                    })
                } else if (result.isDenied) {
                    this.$swal({
                        title: 'Cancel!',
                        text: 'Grade data is safe',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                    this.getGradeList()
                }
            })
        }
    },

    mounted(){
        this.getGradeList()
    }
}
</script>