

export class Device{

  /*  //Tipo de dispositivo iphone ó smartphone
    private deviceType: string;
    //Plataforma ó sistema operativo
    private platform: string;
    //Fecha de Alta
    private dischargeDate: string;
    //Fecha de Última comprobación
    private dateLastCheck: string;*/

    constructor(  private deviceType: string,
                  private platform: string,
                  private dischargeDate: string,
                  private dateLastCheck: string){}


    getDeviceType():string{
        return this.deviceType || '';
    }

    getPlatform():string{
        return this.platform || '';
    }

    getDischargeDate():string{
        return this.dischargeDate || '';
    }

    getDateLastCheck():string{
        return this.dateLastCheck || '';
    }


}