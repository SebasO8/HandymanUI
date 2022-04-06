export interface ServiceReportModel {
    id?:           String;
    technicianId: String;
    serviceId:    String;
    startDate:    String;
    finalDate:    String;
}

export interface ServiceReportUIModel {
    technicianId: String;
    serviceId:    String;
    startDate:    String;
    startHour:    String;
    finalDate:    String;
    finalHour:    String;
}

export interface DateModel {
    inicialYear:  String;
    inicialMonth: String;
    inicialDay:   String;
    hour:         String;
    min:          String;
}