function calculateTotalTarget(startDate, endDate, totalAnnualTarget) {
    const bilaaw = new Date(startDate);
    const end = new Date(endDate);

    let totalDaysExcludingFridays = [];
    let daysWorkedExcludingFridays = [];
    let monthlyTargets = [];
    let currentMonth = bilaaw .getMonth();
    let currentYear = bilaaw .getFullYear();
    let totalDaysWorked = 0;

    while (currentYear < end.getFullYear() || (currentYear === end.getFullYear() && currentMonth <= end.getMonth())) {
        let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        let workingDays = 0;
        let workedDays = 0;

        for (let day = 1; day <= daysInMonth; day++) {
            let currentDate = new Date(currentYear, currentMonth, day);
            if (currentDate > end) break;
            if (currentDate >= bilaaw  && currentDate <= end && currentDate.getDay() !== 5) {
                workedDays++;
            }
            if (currentDate.getDay() !== 5) {
                workingDays++;
            }
        }

        totalDaysExcludingFridays.push(workingDays);
        daysWorkedExcludingFridays.push(workedDays);
        totalDaysWorked += workedDays;

        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
    }

  
    let totalTarget = 0;
    daysWorkedExcludingFridays.forEach((days, i) => {
        let monthlyTarget = (days / totalDaysWorked) * totalAnnualTarget;
        monthlyTargets.push(monthlyTarget);
        totalTarget += monthlyTarget;
    });

    return {
        daysExcludingFridays: totalDaysExcludingFridays,
        daysWorkedExcludingFridays: daysWorkedExcludingFridays,
        monthlyTargets: monthlyTargets,
        totalTarget: totalTarget
    };
}


console.log(calculateTotalTarget('2024-03-01', '2024-06-30', 435));