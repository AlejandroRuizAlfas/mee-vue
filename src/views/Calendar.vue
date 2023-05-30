<script>
import { useStore } from '../stores/store.js';
import { mapState, mapActions } from 'pinia';
import axios from 'axios';
import Loading from '../components/Loading.vue';
export default {
    data() {
        return {
            date: new Date(),
            year: 0,
            month: 0,
            calendarDays: [],
        };
    },
    computed: {
        currentMonthYear() {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            return `${months[this.month]} ${this.year}`;
        },
    },
    mounted() {
        this.updateCalendar();
    },
    methods: {
        updateCalendar() {
            this.year = this.date.getFullYear();
            this.month = this.date.getMonth();

            const firstDay = new Date(this.year, this.month, 1).getDay();
            const lastDate = new Date(this.year, this.month + 1, 0).getDate();
            const lastDay = new Date(this.year, this.month, lastDate).getDay();
            const prevMonthLastDate = new Date(this.year, this.month, 0).getDate();

            const calendarDays = [];
            for (let i = firstDay; i > 0; i--) {
                calendarDays.push({
                    date: prevMonthLastDate - i + 1,
                    active: false,
                    isToday: false,
                });
            }
            for (let i = 1; i <= lastDate; i++) {
                const isToday = i === this.date.getDate() && this.month === new Date().getMonth() && this.year === new Date().getFullYear();
                calendarDays.push({
                    date: i,
                    active: true,
                    isToday: isToday,
                });
            }
            for (let i = lastDay; i < 6; i++) {
                calendarDays.push({
                    date: i - lastDay + 1,
                    active: false,
                    isToday: false,
                });
            }
            this.calendarDays = calendarDays;
        },
        navigate(direction) {
            this.month += direction;
            if (this.month < 0) {
                this.year--;
                this.month = 11;
            } else if (this.month > 11) {
                this.year++;
                this.month = 0;
            }
            this.date = new Date(this.year, this.month, new Date().getDate());
            this.updateCalendar();
        },
        handleClickDay(day) {
            console.log(day.date + '/' + (this.month + 1) + '/' + this.year);
            let lastLi = document.getElementsByClassName('active-li')[0];
            if (lastLi) {
                lastLi.classList.remove('active-li');
            }
            event.currentTarget.classList.add('active-li');
        },
    },
};
</script>

<template>
    <div class="wrapper">
        <div class="calendar-container">
            <header class="calendar-header">
                <p class="calendar-current-date">{{ currentMonthYear }}</p>
                <div class="calendar-navigation">
                    <span @click="navigate(-1)" class="bi bi-chevron-left"></span>
                    <span @click="navigate(1)" class="bi bi-chevron-right"></span>
                </div>
            </header>

            <div class="calendar-body">
                <ul class="calendar-weekdays">
                    <li>Sun</li>
                    <li>Mon</li>
                    <li>Tue</li>
                    <li>Wed</li>
                    <li>Thu</li>
                    <li>Fri</li>
                    <li>Sat</li>
                </ul>
                <ul class="calendar-dates">
                    <li v-for="(day, index) in calendarDays" :key="index" :class="{ inactive: !day.active, active: day.isToday }" @click="handleClickDay(day)">
                        <span class="dot"></span>
                        {{ day.date }}
                    </li>
                </ul>
            </div>
        </div>
        <div class="day-info mt-4 p-4">
            <h3>Events for today</h3>
        </div>
    </div>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
}

.wrapper {
    display: flex;
    background: #0b131e;
    min-height: 100vh;
    padding: 0 10px;
    align-items: center;
    justify-content: center;
}

.calendar-container {
    background: #fff;
    width: 450px;
    border-radius: 10px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
}

.calendar-container header {
    display: flex;
    align-items: center;
    padding: 25px 30px 10px;
    justify-content: space-between;
}

header .calendar-navigation {
    display: flex;
}

header .calendar-navigation span {
    height: 38px;
    width: 38px;
    margin: 0 1px;
    cursor: pointer;
    text-align: center;
    line-height: 38px;
    border-radius: 50%;
    user-select: none;
    color: #aeabab;
    font-size: 1.9rem;
}

.calendar-navigation span:last-child {
    margin-right: -10px;
}

header .calendar-navigation span:hover {
    background: #f2f2f2;
}

header .calendar-current-date {
    font-weight: 500;
    font-size: 1.45rem;
}

.calendar-body {
    padding: 20px;
}

.calendar-body ul {
    list-style: none;
    flex-wrap: wrap;
    display: flex;
    text-align: center;
}

.calendar-body .calendar-dates {
    margin-bottom: 20px;
}

.calendar-body li {
    width: calc(100% / 7);
    font-size: 1.07rem;
    color: #414141;
}

.calendar-body .calendar-weekdays li {
    cursor: default;
    font-weight: 500;
}

.calendar-body .calendar-dates li {
    margin-top: 30px;
    position: relative;
    z-index: 1;
    cursor: pointer;
}
.inactive {
    visibility: hidden;
}

.calendar-dates li.inactive {
    color: #aaa;
}

.calendar-dates li.active {
    color: #fff;
}

.calendar-dates li::before {
    position: absolute;
    content: '';
    z-index: -1;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
}

.calendar-dates li.active::before {
    background: #6332c5;
}

.calendar-body .calendar-dates li.active-li::before {
    background: rgb(112, 235, 112);
}

.calendar-dates li:not(.active):hover::before {
    background: #e4e1e1;
}
.day-info {
    background-color: white;
    width: 50%;
    height: 200px;
    border-radius: 20px;
}

.dot {
    position: absolute;
    top: -10px;
    right: 8px;
    width: 8px;
    height: 8px;
    background-color: green;
    border-radius: 50%;
}
</style>
