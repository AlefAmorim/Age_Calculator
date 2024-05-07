function testDay(day,month,year){
    if(day>=1 && day<=31){
        if(month==2){
            function leap_year(year){
                let date = new Date(year,1,29);
                let last_day=date.getDate()
                if(last_day != 29){
                    return false;
                } else{
                    return true;
                }
            }
            if(day>=1 && day<=29){ 
                if(day==29){
                    return leap_year(year)
                }else{
                    return true
                }
            }else{
                return false
            }
        }
        if(day===31){
            switch(month){
                case 1:return true;
                break
                case 3:return true;
                break
                case 5:return true;
                break
                case 7:return true;
                break
                case 8:return true;
                break
                case 10:return true;
                break
                case 12:return true;
                break
                default:return false;
                break
            }
        }else{
            return true;
        }
    }else{
        return false;
    }
}

function testMonth(monthBirthday){
    if(monthBirthday>=1 && monthBirthday<=12){
        return true;
    }else{
        return false;
    }
}

function testYear(yearBirthday,currentYear){
    if(yearBirthday>=1850 && yearBirthday<=currentYear){
        return true;
    }else{
        return false;
    }
}

function calculateAge(currentDay,currentMonth,currentYear,dayOfBirth,monthOfBirth,yearOfBirth){
    let birthday=[dayOfBirth,monthOfBirth,yearOfBirth],
    day=birthday[0],month=birthday[1],i=0,
    monthDaysOfAge=[0,0,0],
    pastYear=currentYear-1;
    if(birthday[1]<currentMonth || birthday[0]<currentDay){
        monthDaysOfAge[2]=currentYear-birthday[2];
        for(i;month<=currentMonth;i++){
            let date=new Date(currentYear,month,0);
            day++
            monthDaysOfAge[0]++
            if(day==birthday[0]){
                monthDaysOfAge[1]++
                monthDaysOfAge[0]=0
            }
            if(day==currentDay && month==currentMonth){
                break
            }else if(day==date.getDate()){
                month++
                day=0;
                i=0;
            }
        } 
    }else if(birthday[0]>=currentDay || birthday[1]>=currentMonth){
        for(i;pastYear<=currentYear;i++){
            if(pastYear==currentYear){
                month=1;
                for(i;month<=currentMonth;i++){
                    pastDate=new Date(pastYear,month,0)
                    day++
                    monthDaysOfAge[0]++
                    if(day==birthday[0]){
                        monthDaysOfAge[1]++
                        monthDaysOfAge[0]=0
                        if(monthDaysOfAge[1]==12){
                            monthDaysOfAge[2]=currentYear-birthday[2]
                            monthDaysOfAge[1]=0
                        }else{
                            monthDaysOfAge[2]=(pastYear-1)-birthday[2]
                        }
                    }
                    if(day==currentDay && month==currentMonth){
                        break
                    }else if(day==pastDate.getDate()){
                        month++
                        day=0;
                        i=0;
                    }
                }
                break
            }else{
                let pastDate=new Date(pastYear,month,0)
                for(i;month<=12;i++){
                    day++
                    monthDaysOfAge[0]++
                    if(day==birthday[0]){
                        monthDaysOfAge[1]++
                        monthDaysOfAge[0]=0
                    }
                    if(month===12){
                        pastYear=currentYear
                    }
                    if(day===pastDate.getDate()){
                        month++
                        day=0;
                        i=0;
                    }
                }
            }
        }
    }
    return monthDaysOfAge;
}

let arrow_button=document.querySelector("button.arrow_button").addEventListener('click',clicktest);


function clicktest(){
    let birthday=document.querySelectorAll("input");
    let date=new Date();
    let current_day=[date.getUTCDate(),date.getUTCMonth()+1,date.getUTCFullYear()];
    let print_age=document.querySelectorAll('span');
    if(birthday[0].value==="" && birthday[1].value==="" && birthday[2].value===""){
        birthday.forEach((birthday)=>{
            birthday.classList.add('invalid');
            birthday.previousElementSibling.classList.add('invalid');
            birthday.nextElementSibling.firstElementChild.textContent='This field is required';
        });
    }else{
        if(!testDay(birthday[0].value,birthday[1].value,birthday[2].value)){
            birthday[0].nextElementSibling.firstElementChild.textContent='Must be a valid day';
            birthday[0].classList.add('invalid');
            birthday[0].previousElementSibling.classList.add('invalid');
        }else{
        }
        if(!testMonth(birthday[1].value)){
            birthday[1].nextElementSibling.firstElementChild.textContent='Must be a valid month';
            birthday[1].classList.add('invalid');
            birthday[1].previousElementSibling.classList.add('invalid');
        }else{
        }
        if(!testYear(birthday[2].value,current_day[2])){
            birthday[2].nextElementSibling.firstElementChild.textContent='Must be a valid year';
            birthday[2].classList.add('invalid');
            birthday[2].previousElementSibling.classList.add('invalid');
        }else{
        }
        if(testDay(birthday[0].value,birthday[1].value,birthday[2].value) && testMonth(birthday[1].value) && testYear(birthday[2].value,current_day[2])){
            let age=(calculateAge(current_day[0],current_day[1],current_day[2],birthday[0].value,birthday[1].value,birthday[2].value))
            print_age[0].textContent=`${age[2]}`
            print_age[1].textContent=`${age[1]}`
            print_age[2].textContent=`${age[0]}`
        }
    }
    birthday.forEach((birthday)=>{
        birthday.onfocus= function (){
            birthday.classList.remove('invalid');
            birthday.previousElementSibling.classList.remove('invalid');
            birthday.nextElementSibling.firstElementChild.textContent='';
        }
    })
}