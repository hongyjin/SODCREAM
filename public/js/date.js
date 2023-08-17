document.addEventListener('DOMContentLoaded', function () {
    const monthYearElement = document.querySelector('.month-year');
    const daysElement = document.querySelector('.days');
    
    const now = new Date();
    const currentYear = 2023; // 2023년
    const currentMonth = 7; // 8월 (0부터 시작하는 인덱스)
    const currentDate = now.getDate();

    const monthNames = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
    ];
  
  const dayNames = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

    monthYearElement.textContent = `${currentYear}년 ${monthNames[currentMonth]}월`;

    // 요일 이름을 추가합니다.
    for (let dayName of dayNames) {
        const dayNameElement = document.createElement('div');
        dayNameElement.classList.add('day-name');
        dayNameElement.textContent = dayName;
        daysElement.appendChild(dayNameElement);
    }

    const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // 8월 1일의 요일 (0부터 시작)

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = i;

        if (i === 1) {
            dayElement.style.gridColumnStart = firstDay + 1; // 시작 요일에 따라서 위치 조정
        }
      
      if (i === currentDate && currentMonth === now.getMonth()) {
            dayElement.classList.add('current');

            const todayMarker = document.createElement('div');
            todayMarker.classList.add('today-marker');
            dayElement.appendChild(todayMarker);
        }

        daysElement.appendChild(dayElement);
    }
});


// const date = new Date();

// const viewYear = date.getFullYear();
// const viewMonth = date.getMonth();

// document.querySelector('year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`;
// $('.year-month').textContent(viewYear + '.' + (viewtMonth + 1));

// const prevLast = new Date(viewYear, viewMonth, 0);
// const thisLast = new Date(viewYear, viewMonth + 1, 0);

// const PLDate = prevLast.getDate();
// const PLDay = prevLast.getDay();

// const TLDate = thisLast.getDate();
// const TLDay = thisLast.getDay();

// const prevDates = [];
// const thisDates = [...Array(TLDate + 1).keys()].slice(1);
// const nextDates = [];

// if (PLDate !== 0){
//     for (let i = 0; i <PLDay + 1; i++) {
//         prevDates.unshift(PLDate - i);
//     }
// }

// for(let i = 1; i <7 - TLDay; i++) {
//     nextDates.push(i);
// }

// const dates = prevDates.concat(thisDates, nextDates);

// dates.forEach((date, i) => {
//     dates[i] = `<div class="date">${date}</div>`;
// });

// document.querySelector(`dates`).innerHTML = dates.join(``);
