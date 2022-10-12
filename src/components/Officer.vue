<template>
    <div>
        <div class="card">
            <h5 class="card-header"><center>Officer List</center></h5>
                <button @click="Add()" data-bs-toggle="modal" data-bs-target="#officer_modal" class="btn btn-dark btn-sm float-end"><i class="fas fa-plus fa-fw"></i>Add Officer</button>
            <div class="table-responsive text-nowrap">
                <table class="table table-hover">
                    <caption class="ms-4">
                      List of Moklet's Officers
                    </caption>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Officer Name</th>
                    <th>Status</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody class="table-border-bottom-0">
                    <tr v-for="(ol, index) in officer_list" :key="index">
                    <td><i class="fab fa-angular fa-lg text-danger me-3"></i> {{ index+1 }}</td>
                    <td>{{ ol.username }}</td>
                    <td>{{ ol.officer_name }}</td>
                    <td><span class="badge bg-label-danger me-1">{{ ol.status }}</span></td>
                    <td>
                        <button class="btn btn-sm btn-secondary" @click="Edit(ol)" data-bs-toggle="modal" data-bs-target="#officer_modal" ><i class="bx bx-edit-alt me-1"></i></button>&nbsp;
                        <button class="btn btn-sm btn-danger" @click="Delete(ol.officer_id)"><i class="bx bx-trash me-1"></i></button>
                    </td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="officer_modal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-md bg-primary">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Officer Data</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="username" v-model="username" placeholder="Username">
                        </div>

                        <div class="mb-3">
                            <label for="officer_name" class="form-label">Officer Name</label>
                            <input type="text" class="form-control" id="officer_name" v-model="officer_name" placeholder="Officer Name">
                        </div>

                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" v-model="password" placeholder="Password">
                        </div>

                        <div class="mb-3">
                            <label for="status" class="form-label">Status</label>
                            <select class="form-control" id="status" v-model="status">
                                <option value="" disabled>--- Choose Status---</option>
                                <option value="A">Admin</option>
                                <option value="S">Staff</option>
                            </select>
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
        name : "Officer_page",

        data(){
            return {
                officer_id : "",
                username : "",
                officer_name : "",
                password : "",
                status : "",
                officer_list : [],
            }
        },

        methods : {
            getOfficerList : function(){
                this.axios.get('/officer')
                .then(response => {
                    this.officer_list = response.data;
                    console.log(response);
                });
            },

            Add: function() {
                this.officer_id = ""
                this.username = ""
                this.officer_name = ""
                this.password = ""
                this.status = ""
                this.action = "insert"
            },

            Edit: function(ol){
                this.officer_id = ol.officer_id
                this.username = ol.username
                this.officer_name = ol.officer_name
                this.password = ol.password
                this.status = ol.status
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
                    'username': this.username,
                    'officer_name': this.officer_name,
                    'password': this.password,
                    'status': this.status,
                }

                if(this.action === 'insert'){ //POST
                    this.axios.post('/officer', form)
                    .then( response => {
                    this.$swal({
                            title: 'Success!',
                            text: response.data.message,
                            icon: 'success',
                            confirmButtonText: 'OK'
                        })
                        this.getOfficerList()
                    })
                }
                
                else { //PUT
                    this.axios.put('/officer/' + this.officer_id, form)
                    .then( response => {
                        this.$swal({
                            title: 'Success!',
                            text: response.data.message,
                            icon: 'success',
                            confirmButtonText: 'OK'
                        })
                        this.getOfficerList()
                    })
                }
            },

            Delete: function(officer_id){
                //mapping header token
                // let token = {
                //     headers : { "Authorization" : "Bearer " + localStorage.getItem("Authorization")}
                // }

                this.$swal({
                    title: 'Delete Data Officer?',
                    text: 'Are you sure you want to delete this data?',
                    icon: 'warning',
                    showDenyButton: true,
                    showCancelbutton: false,
                    confirmButtonText: 'Yes',
                    denyButtonText: `No`,
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.axios.delete('/officer/' + officer_id)
                        .then( response => {
                            this.$swal({
                                title: 'Success!',
                                text: response.data.message,
                                icon: 'success',
                                confirmButtonText: 'OK'
                            })
                            this.getOfficerList()
                        })
                    } else if (result.isDenied) {
                        this.$swal({
                            title: 'Cancel!',
                            text: 'Grade data is safe',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        })
                        this.getOfficerList()
                    }
                })
            },
        },

        mounted(){
            this.getOfficerList()
        }
    }
</script>