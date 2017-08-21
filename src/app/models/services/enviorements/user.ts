
export class User{


    constructor(private code : string, //Código de usuario, que puede ser o no el documento identificativo
                private name : string, //Nombre
                private lastName : string,  //Apellido
                private documentID : string,//Documento identificativo, número del nif
                private persnum : string) //Número de persona
                {
    }

    getCode():string{
        return this.code || '';
    }

    getName():string{
        return this.name || '';
    }

    getLastName():string{
        return this.lastName || '';
    }

    getDocumentID():string{
        return this.documentID || '';
    }


    getPersNumb():string{
        return this.persnum || '';
    }
   


}