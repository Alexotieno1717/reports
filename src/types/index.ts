export interface Welcome {
    status:  boolean;
    message: string;
    data:    Datum[];
}

export interface Datum {
    RequestID:      number;
    ClientID:       null | string;
    RequestType:    null | string;
    StartDate:      Date | null;
    EndDate:        Date | null;
    Status:         null | string;
    ResponseEmail:  null | string;
    IsRepeated:     null | string;
    RepeatInterval: null | string;
}
