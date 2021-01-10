const MatchesFilter = {
    create() {
        let mainDiv = document.createElement('div');
        mainDiv.className = 'matches-filter';

        mainDiv.appendChild(this.statusFilter());
        mainDiv.appendChild(this.dayFilter());

        return mainDiv;
    },

    statusFilter() {
        let statusFilterDiv = document.createElement('div');
        statusFilterDiv.className = 'status-filter';

        let filtersUl = document.createElement('ul');
        filtersUl.appendChild(this.checkboxFilter('Scheduled', 'NOT_STARTED'));
        filtersUl.appendChild(this.checkboxFilter('Live', 'INPLAY'));
        filtersUl.appendChild(this.checkboxFilter('Finished', 'FINISHED'));

        statusFilterDiv.appendChild(filtersUl);
        return statusFilterDiv;
    },

    // TODO: change day dynamically
    dayFilter() {
        let dayFilterDiv = document.createElement('div');
        dayFilterDiv.className = 'day-filter';

        dayFilterDiv.appendChild(this.calendar());
        dayFilterDiv.appendChild(this.expandedCalendar());

        return dayFilterDiv;
    },

    checkboxFilter(name, status) {
        let li = document.createElement('li');

        li.innerHTML = `<label for="${status}">${name}</label>`

        let input = document.createElement('input');
        input.className = 'matches-checkbox';
        input.id = 'filter-' + status;
        input.type = 'checkbox';
        input.value = status;
        input.checked = true;
        input.addEventListener('change', () => {
            this.filterMatches(this.getCheckedStatuses());
        });

        li.appendChild(input)
        return li;
    },

    filterMatches(statuses) {
        json = JSON.stringify(statuses);
        fetch('/api/matches/filter/1/' + json)
            .then(response => response.json())
            .then(matches => {
                Match.hideAll();

                matches.forEach(match => {
                    Match.update(match);
                });
            })
            .catch(error => {
                console.log('Error occured during rendering matches:', error);
            });
    },

    getCheckedStatuses() {
        let checkboxes = document.getElementsByClassName('matches-checkbox');

        let statuses = []
        Array.prototype.forEach.call(checkboxes, checkbox => {
            if (checkbox.checked) {
                statuses.push(checkbox.value);
            }
        });

        return statuses;
    },

    calendar() {
        let calendarDiv = document.createElement('div');
        calendarDiv.className = 'calendar';

        calendarDiv.innerHTML = `
            <div class="calendar-wrapper">
                <img src="./images/calendar.png">
            </div>
            <div class="selected-day" id="selected-day">Day 18</div>
        `;

        calendarDiv.addEventListener('click', () => {
            let expanded = document.getElementById('expanded-calendar');

            if (expanded.style.display == 'none') {
                expanded.style.display = 'block';
            } else {
                expanded.style.display = 'none';
            }
        });

        return calendarDiv;
    },

    expandedCalendar() {
        let expandedCalendarDiv = document.createElement('div');
        expandedCalendarDiv.className = 'expanded-calendar';
        expandedCalendarDiv.id = 'expanded-calendar';

        expandedCalendarDiv.style.display = 'none';

        let daysUl = document.createElement('ul');
        for (let day = 1; day <= 60; day++) {
            let dayLi = document.createElement('li');
            dayLi.className = 'day';
            dayLi.innerHTML = 'Day ' + day;

            daysUl.appendChild(dayLi);
        }

        expandedCalendarDiv.appendChild(daysUl);
        return expandedCalendarDiv;
    }
}