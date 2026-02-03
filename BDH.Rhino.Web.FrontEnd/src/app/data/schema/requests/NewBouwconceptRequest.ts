
export interface NewBouwconceptRequest {
    [key: string]: any;

    name : string;
    catalogId : string;
    bvoPerUnit: number;
    m3PerUnit: number;
    woningenPerUnit: number;
    productieKostenPerUnit: number;
    isPrivate: boolean;
    width: number;
    depth: number;
    height: number;
}


export interface UpdateBouwconceptRequest extends NewBouwconceptRequest{
    id : string;
}