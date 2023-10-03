import { IReceitas } from "../../../interfaces/IReceitas";

export interface IEditReceitasProps{
    receitaList: string;
    openDialog: boolean;
    closeDialog: any;
    item: IReceitas;
}