<template>
    <div id="dialog" class="dialog p-4">
        <div class="close-btn-container" style="height: 20px">
            <div class="row">
                <div class="col-8">
                    <h4 style="font-weight: bold">Create To-Do</h4>
                </div>
                <div class="col-4">
                    <button class="btn btn-sm btn-outline-secondary close-dialog" @click="handleClose">
                        <i class="bi bi-x"></i>
                    </button>
                </div>
            </div>
        </div>
        <hr class="hr" />
        <div class="dialog-content">
            <!-- <form> -->
            <div class="form-group my-2">
                <label for="name">Name</label>
                <input id="name" name="name" type="text" class="form-control" />
            </div>
            <div class="form-group my-2">
                <label for="desc">Description</label>
                <textarea id="desc" name="desc" cols="40" rows="5" class="form-control"></textarea>
            </div>
            <div class="form-group my-2">
                <div>
                    <div class="custom-controls-stacked">
                        <div class="custom-control">
                            <input id="alarmActivated" name="alarmActivated" type="checkbox" class="custom-control-input" value="alarmActivated" />
                            <label for="checkbox_0" class="custom-control-label mx-2">Notify with alarm?</label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-group my-2">
                <label for="limitDate">Expiration date: </label><br />
                <input type="datetime-local" id="limitDate" name="limitDate" />
            </div>

            <div class="form-group my-2">
                <label for="priority">Priority</label>
                <div>
                    <select id="priority" name="priority" class="form-control">
                        <option selected value="0">No priority</option>
                        <option value="1">Low priority</option>
                        <option value="2">Medium priority</option>
                        <option value="3">High priority</option>
                    </select>
                </div>
            </div>
            <div class="form-group my-2">
                <label for="earlyNotif">Notify earlier?</label>
                <div>
                    <select id="earlyNotif" name="earlyNotif" class="form-control">
                        <option selected value="0">Exact time</option>
                        <option value="10">10 minutes before</option>
                        <option value="30">30 minutes before</option>
                        <option value="60">1 hour before</option>
                    </select>
                </div>
            </div>
            <div class="form-group mt-4" style="float: right">
                <button name="submit" type="submit" class="btn btn-success" @click="handleFinishAdd">Create To-Do</button>
            </div>
            <!-- </form> -->
        </div>
    </div>
</template>

<script>
import { useStore } from '../stores/store.js';
import { mapState, mapActions } from 'pinia';
export default {
    props: {
        title: String,
        message: String,
    },
    data() {
        return {};
    },
    methods: {
        handleFinishAdd() {
            let todo = {
                name: document.getElementById('name').value,
                completed: 0,
                desc: document.getElementById('desc').value,
                alarmActivated: document.getElementById('alarmActivated').checked,
                notifActivated: 0,
                limitDate: new Date(document.getElementById('limitDate').value).toLocaleString().replaceAll('PM', ' ').replaceAll(' ', '').replace(',', ' ').replaceAll('/', '-'),
                priority: document.getElementById('priority').value,
                earlyNotif: document.getElementById('earlyNotif').value,
            };
            this.resetValues();
            this.$emit('finishAdd', todo);
        },
        handleClose() {
            this.$emit('closeDialog');
            this.resetValues();
        },
        resetValues() {
            document.getElementById('name').value = '';
            document.getElementById('desc').value = '';
            document.getElementById('alarmActivated').checked = false;
            document.getElementById('limitDate').value = '';
            document.getElementById('priority').value = '';
            document.getElementById('earlyNotif').value = '';
        },
    },
};
</script>

<style scoped>
.dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 4 0px;
    border-radius: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    z-index: 10;
    width: 512px;
    height: auto;
}

.close-dialog {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background-color: transparent;
    border: none;
    outline: none;
    padding: 0;
    font-size: 2rem;
    line-height: 1;
    color: #6c757d;
    border-radius: 20px;
}

.close-dialog:hover {
    color: white;
    border-radius: 20px;
    background-color: rgb(253, 99, 99);
}

.close-dialog:focus {
    box-shadow: none;
}

input[type='datetime-local'] {
    width: 100%;
    height: 40px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 16px;
}

label {
    font-size: 20px;
    padding-bottom: 5px;
}

@media only screen and (max-width: 550px) {
    .dialog {
        width: 90%;
    }
}
</style>
