export class Employee{

    constructor(private code : string, //Código de empleado
                private name : string, //Nombre
                private rol : string,//Perfil
                private terminal : string, //Terminal
                private oficina : string) //Oficina
                {}

    getCode():string{
        return this.code || '';
    }

    getName():string{
        return this.name || '';
    }

    getRol():string{
        return this.rol || '';
    }

    getTerminal():string{
        return this.terminal || '';
    }

    getOficina():string{
        return this.oficina || '';
    }

    

static fromJson(json: any): Employee {
        return new Employee('', json.name, json.rol, json.terminal, json.oficina);
    }


}