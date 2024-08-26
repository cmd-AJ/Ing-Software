export class Month {
    name: string;
    year: number;
    day: number;
    numOfDays: number;
    monthNumber: number;
    initialDay: number;
    matrix: number[][];

    constructor(day: number, monthNumber: number, year: number) {
        this.day = day;
        this.monthNumber = monthNumber;
        this.year = year;
        this.name = this.getMonthName();
        this.numOfDays = this.calculateNumOfDays();
        this.initialDay = this.calculateInitialDay();
        this.matrix = this.getMonthMatrix();
    }

    private calculateNumOfDays(): number {
        switch (this.name) {
            case "Enero":
                return 31;
            case "Febrero":
                return (this.year % 400 === 0 || (this.year % 4 === 0 && this.year % 100 !== 0)) ? 29 : 28;
            case "Marzo":
                return 31;
            case "Abril":
                return 30;
            case "Mayo":
                return 31;
            case "Junio":
                return 30;
            case "Julio":
                return 31;
            case "Agosto":
                return 31;
            case "Septiembre":
                return 30;
            case "Octubre":
                return 31;
            case "Noviembre":
                return 30;
            default:
                return 31;
        }
    }

    private getMonthName(): string {
        switch (this.monthNumber) {
            case 0:
                return "Enero";
            case 1:
                return "Febrero";
            case 2:
                return "Marzo";
            case 3:
                return "Abril";
            case 4:
                return "Mayo";
            case 5:
                return "Junio";
            case 6:
                return "Julio";
            case 7:
                return "Agosto";
            case 8:
                return "Septiembre";
            case 9:
                return "Octubre";
            case 10:
                return "Noviembre";
            default:
                return "Diciembre";
        }
    }

    private calculateInitialDay(): number {
        const firstDay = new Date(this.year, this.monthNumber, 1);
        return firstDay.getDay();
    }

    private calculateNumOfDaysInPreviousMonth(): number {
        const previousMonth = this.monthNumber === 0 ? 11 : this.monthNumber - 1;
        const previousYear = this.monthNumber === 0 ? this.year - 1 : this.year;

        const daysInPreviousMonth = new Date(previousYear, previousMonth + 1, 0).getDate();
        return daysInPreviousMonth;
    }

    private getMonthMatrix(): number[][] {
        let dayCounter = 1;
        const firstDay = (this.initialDay + 6) % 7; // Ajusta el primer día para que 0 sea lunes
        const days = this.numOfDays;
        const daysInPreviousMonth = this.calculateNumOfDaysInPreviousMonth();
        let nextMonthDayCounter = 1; // Contador para los días del siguiente mes
        
        const month: number[][] = [];
    
        for (let i = 0; i < 6; i++) { // 6 filas máximo en un mes
            const week: number[] = [];
    
            for (let j = 0; j < 7; j++) { // 7 días en una semana
                if (i === 0 && j < firstDay) {
                    week.push(daysInPreviousMonth - (firstDay - j - 1)); // Días del mes anterior
                } else if (dayCounter <= days) {
                    week.push(dayCounter);
                    dayCounter++;
                } else {
                    week.push(nextMonthDayCounter++); // Días del siguiente mes
                }
            }
    
            month.push(week);
        }
    
        return month;
    }    
}
