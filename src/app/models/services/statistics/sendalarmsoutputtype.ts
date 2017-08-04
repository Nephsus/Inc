export class SendAlarmsOutputType{

constructor( public sendSms: number, public sendPush: number, public sendEmail:number){}


static fromJson(json: any): SendAlarmsOutputType {
        return new SendAlarmsOutputType(
            json.sendAlarmsOutputType.sendSms,  json.sendAlarmsOutputType.sendPush,  json.sendAlarmsOutputType.sendEmail  
        );
    }
}

