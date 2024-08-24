export class Month {
    name: string;
    year: number;
    numOfDays: number;
    monthNumber: number;
    initialDay: string;

    constructor(monthNumber: number, year: number) {
        this.monthNumber = monthNumber;
        this.name = this.getMonthName();
        this.year = year;
        this.numOfDays = this.calculateNumOfDays();
        this.initialDay = this.calculateInitialDay();
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
            case 1:
                return "Enero";
            case 2:
                return "Febrero";
            case 3:
                return "Marzo";
            case 4:
                return "Abril";
            case 5:
                return "Mayo";
            case 6:
                return "Junio";
            case 7:
                return "Julio";
            case 8:
                return "Agosto";
            case 9:
                return "Septiembre";
            case 10:
                return "Octubre";
            case 11:
                return "Noviembre";
            default:
                return "Diciembre";
        }
    }

    private calculateInitialDay(): string {
        const firstDay = new Date(this.year, this.monthNumber - 1, 1);
        return firstDay.toLocaleDateString('es-ES', { weekday: 'short' }).substring(0, 2).toUpperCase();
    }

    
}
