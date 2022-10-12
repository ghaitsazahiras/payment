<template>
    <div>
        <div class="card">
            <h5 class="card-header"><center>Payment List</center></h5>
                <button @click="Add()" data-bs-toggle="modal" data-bs-target="#payment_modal" class="btn btn-dark btn-sm float-end"><i class="fas fa-plus fa-fw"></i>Add Payment</button>
            <div class="table-responsive text-nowrap">
                <table class="table table-hover">
                    <caption class="ms-4">
                      List of Moklet's Payments
                    </caption>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>NISN - NIS</th>
                    <th>Line</th>
                    <th>Year</th>
                    <th>Nominal</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody class="table-border-bottom-0">
                    <tr v-for="(pl, index) in payment_list" :key="index">
                    <td><i class="fab fa-angular fa-lg text-danger me-3"></i> {{ index+1 }}</td>
                    <td v-for="sl in student_list" :key="sl" v-bind:value="sl.nisn">{{ pl.nisn }} - {{ sl.nis }}</td>
                    <td>{{ pl.line }}</td>
                    <td>{{ pl.year }}</td>
                    <td><span class="badge bg-label-danger me-1">{{ pl.nominal }}</span></td>
                    <td>
                        <button class="btn btn-sm btn-secondary" @click="Edit(pl)" data-bs-toggle="modal" data-bs-target="#payment_modal" ><i class="bx bx-edit-alt me-1"></i></button>&nbsp;
                        <button class="btn btn-sm btn-danger" @click="Delete(pl.payment_id)"><i class="bx bx-trash me-1"></i></button>
                    </td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="payment_modal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-md bg-primary">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Payment Data</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="nisn" class="form-label">NISN</label>
                            <select class="form-control" v-model="nisn">
                                <option value="" disabled>-- Choose NISN Student --</option>
                                <option v-for="sl in student_list" :key="sl" v-bind:value="sl.nisn">{{ sl.nisn }} - {{ sl.nis}} - {{ sl.student_name }}</option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label for="line" class="form-label">Line</label>
                            <input type="number" class="form-control" id="line" v-model="line" placeholder="Line">
                        </div>

                        <div class="mb-3">
                            <label for="year" class="form-label">Year</label>
                            <input type="number" class="form-control" id="year" v-model="year" placeholder="Year">
                        </div>

                        <div class="mb-3">
                            <label for="nominal" class="form-label">Nominal</label>
                            <input type="number" class="form-control" id="nominal" v-model="nominal" placeholder="Nominal">
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
    name : "Payment_page",

    data(){
        return {
            payment_id: '',
            nisn: '',
            line: '',
            year: '',
            nominal: '',
            payment_list : [],
            student_list : [],
        }
    },

    methods : {
        getPaymentList : function(){
            this.axios.get('/payment')
            .then(response => {
                this.payment_list = response.data;
                console.log(response);
            });
        },

        getStudent: function(){
            // let token = {
            //     headers : { "Authorization" : "Bearer " + localStorage.getItem("Authorization")}
            // }

            this.axios.get("/student")
            .then( response => {
                this.student_list = response.data;
            })
        },

        Add: function() {
            this.payment_id = ""
            this.nisn = ""
            this.line = ""
            this.year = ""
            this.nominal = ""
            this.action = "insert"
            this.getStudent()
        },

        Edit: function(pl){
            this.payment_id = pl.payment_id
            this.nisn = pl.nisn
            this.line = pl.line
            this.year = pl.year
            this.nominal = pl.nominal
            this.action = "update"
            this.getStudent()
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
                'nisn' : this.nisn,
                'line': this.line,
                'year': this.year,
                'nominal': this.nominal
            }

            if(this.action === 'insert'){ //POST
                this.axios.post('/payment', form)
                .then( response => {
                   this.$swal({
                        title: 'Success!',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                    this.getPaymentList()
                })
            }
            
            else { //PUT
                this.axios.put('/payment/' + this.payment_id, form)
                .then( response => {
                    this.$swal({
                        title: 'Success!',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                    this.getPaymentList()
                })
            }
        },

        Delete: function(payment_id){
            //mapping header token
            // let token = {
            //     headers : { "Authorization" : "Bearer " + localStorage.getItem("Authorization")}
            // }

            this.$swal({
                title: 'Delete Data Payment',
                text: 'Are you sure you want to delete this data?',
                icon: 'warning',
                showDenyButton: true,
                showCancelbutton: false,
                confirmButtonText: 'Yes',
                denyButtonText: `No`,
            }).then((result) => {
                if (result.isConfirmed) {
                     this.axios.delete('/payment/' + payment_id)
                    .then( response => {
                        this.$swal({
                            title: 'Success!',
                            text: response.data.message,
                            icon: 'success',
                            confirmButtonText: 'OK'
                        })
                        this.getPaymentList()
                    })
                } else if (result.isDenied) {
                    this.$swal({
                        title: 'Cancel!',
                        text: 'Payment data is safe',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                    this.getPaymentList()
                }
            })
        }
    },

    mounted(){
        this.getPaymentList()
    }
}
</script>
