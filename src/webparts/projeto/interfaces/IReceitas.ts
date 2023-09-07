export interface IReceitas {
    ID: number;
    Title: string;
    TipoReceita?: string;
    Cara?: boolean;
    DataTentativa?: Date;
    DataTentativaString?: string;
    Anexo?: any;
}